import React from 'react'
import { Icon, Text } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native'
import HomeCarousel from '../../components/HomeCarousel'
import Loader from '../../components/Loader'
import { useGetHomePage } from '../../hooks/dataSource'
import { useTheme } from '@react-navigation/native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const SAMPLE_APPS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Beautiful and dramatic',
    subtitle: 'Lorem ipsum dolor sit amet ',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb29ba',
    title: 'Earlier this morning',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    id: 'bd8acbea-c1b1-46c2-aed5-3ad53abb29ba',
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    id: 'bd8acbea-c2b1-46c2-aed5-3ad53abb29ba',
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet ',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    id: 'bd8acbea-c2b2-46c2-aed5-3ad53abb29ba',
    title: 'The lone tree',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    id: 'bd8acbea-c2b2-56c2-aed5-3ad53abb29ba',
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
]

function Item(props) {
  const { colors } = useTheme()
  const { title, subtitle, thumbnail, id, navigate, isLast } = props
  return (
    <TouchableScale
      onPress={() => navigate('Apps', { id })}
      tension={250}
      activeScale={0.98}
      friction={20}
      style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: !isLast ? 24 : 0,
      }}
    >
      <View style={{ marginRight: 16 }}>
        <Image
          loadingIndicatorSource={<ActivityIndicator />}
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
          source={{
            uri: thumbnail,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: colors.text }}>{title}</Text>
        <Text style={{ color: colors.text }}>{subtitle}</Text>
      </View>
    </TouchableScale>
  )
}

function HomeScreen(props) {
  const { colors } = useTheme()
  const { loading, error, data, refetch } = useGetHomePage(
    '5e208336bfef3597db86047f'
  )

  if (loading) return <Loader />
  if (error) return <Text>error...</Text>

  const { apps, carousel } = data
  const { banners } = carousel[0]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={{ marginTop: 16 }}>
          <HomeCarousel items={banners} />
        </View>
        <View style={{ marginTop: 24, padding: 16 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>
            माता पिता के लिए
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 8 }}>
            <TouchableScale
              tension={250}
              activeScale={0.98}
              friction={20}
              style={{
                marginRight: 8,
                ...styles.sectionCard,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <Icon
                name="bulb"
                type="simple-line-icon"
                size={48}
                color="#118785"
              />
              <Text style={{ fontSize: 18, marginTop: 4, color: '#118785' }}>
                टॉप व्किज़
              </Text>
            </TouchableScale>
            <TouchableScale
              tension={250}
              activeScale={0.98}
              friction={20}
              style={{
                marginLeft: 8,
                ...styles.sectionCard,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <Icon
                name="trophy"
                size={48}
                type="simple-line-icon"
                color="#FCBC6E"
              />
              <Text style={{ fontSize: 18, marginTop: 4, color: '#FCBC6E' }}>
                स्कोरबोर्ड
              </Text>
            </TouchableScale>
          </View>
        </View>
        <View
          style={{
            padding: 16,
            marginTop: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: colors.text,
              }}
            >
              बच्चों के पढ़ाई के एपस्
            </Text>
            <TouchableScale
              onPress={() => props.navigation.navigate('Apps')}
              tension={250}
              activeScale={0.98}
              friction={20}
            >
              <Text style={{ marginTop: 8, color: colors.text }}>See All</Text>
            </TouchableScale>
          </View>
          <FlatList
            nestedScrollEnabled
            style={{ padding: 16 }}
            data={apps.slice(0, 3)}
            renderItem={({ item, index }) => (
              <Item
                navigate={props.navigation.navigate}
                title={item.name}
                subtitle={item.shortDescription}
                thumbnail={item.thumbnail}
                id={item.id}
                isLast={index + 1 === apps.slice(0, 3).length}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  forParentsSection: {
    margin: 16,
    width: screenWidth - 32,
  },
  appName: {
    fontSize: 24,
    marginLeft: 8,
    color: '#118785',
    fontWeight: '500',
  },
  forKidsSection: {
    margin: 16,
  },
  sectionLabel: {
    marginBottom: 8,
  },
  sectionCard: {
    borderWidth: 1,
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  footer: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#FCBC6E',
    // borderTopWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
    marginTop: 8,
    // justifyContent: 'center',
  },
})
