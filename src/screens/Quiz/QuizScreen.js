import React from 'react'
import { Text, Divider, AirbnbRating, Rating } from 'react-native-elements'
import {
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import Loader from '../../components/Loader'
import TouchableScale from 'react-native-touchable-scale'

import { useGetQuizCategories, useGetQuizzes } from '../../hooks/dataSource'
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

function ProgressItem({ title, level, correctAnswers, percent, total }) {
  return (
    <View style={styles.progressItem}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.dots} />
        <Text style={{ padding: 4, fontSize: 18 }}>{title}</Text>
      </View>
      <View style={styles.lines}>
        <Text
          style={{ fontSize: 18, marginBottom: 8 }}
        >{`Total Questions: ${total}`}</Text>
        <Text
          style={{ fontSize: 18, marginBottom: 8 }}
        >{`Correct Answers: ${correctAnswers}`}</Text>
        <View style={{ alignItems: 'flex-start' }}>
          <Rating imageSize={16} readonly ratingColor="#FCBC6E" type="custom" />
        </View>
      </View>
    </View>
  )
}

function Journey(props) {
  const { categoryId, navigate } = props
  const userId = '5e208336bfef3597db86047f'
  const { loading, error, data, refetch } = useGetQuizzes(categoryId, userId, 1)

  if (loading) return <Loader />
  if (error) return <Text>error...</Text>

  const { journey } = data
  console.log(JSON.stringify(journey))

  return (
    <FlatList
      style={{ flex: 1 }}
      data={journey}
      renderItem={({ item, index }) => (
        <ProgressItem
          title={`Level ${index + 1}`}
          correctAnswers={item.correctAnswers}
          percent={item.percentCompleted}
          total={item.totalQuestions}
          level={index + 1}
        />
      )}
      keyExtractor={item => item.id}
    />
  )
}

function Item({ id, title, thumbnail, navigate }) {
  return (
    <TouchableScale
      style={styles.item}
      onPress={() => navigate('Quiz', { categoryId: id })}
      tension={250}
      activeScale={0.98}
      friction={20}
    >
      <Image
        loadingIndicatorSource={<ActivityIndicator />}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
        }}
        source={{
          uri: thumbnail,
        }}
      />
      <Text
        style={{ marginTop: 4, width: 60, textAlign: 'center' }}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableScale>
  )
}

function QuizScreen(props) {
  const { loading, error, data, refetch } = useGetQuizCategories()

  if (loading) return <Loader />
  if (error) return <Text>error...</Text>

  const { categories } = data
  const categoryId = props.navigation.getParam('categoryId') || categories[0].id

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.name}
              thumbnail={item.thumbnail}
              navigate={props.navigation.navigate}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Divider style={styles.divider} />
      <Journey categoryId={categoryId} navigate={props.navigation.navigate} />
    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  progressItem: {
    // marginVertical: 8,
    marginHorizontal: 8,
    height: 160,
    paddingHorizontal: 16,
    // height: screenWidth / 3,
  },
  divider: {
    backgroundColor: '#eaeaea',
    marginTop: 4,
    marginBottom: 4,
  },
  dots: {
    height: 32,
    width: 32,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: '#98D2DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lines: {
    padding: 16,
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#98D2DA',
    // backgroundColor: '#98D2DA',
    marginLeft: 16,
  },
})
