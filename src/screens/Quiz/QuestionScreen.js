import React, { useState } from 'react'
import {
  Image,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ProgressViewIOS,
} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'

import { useGetQuizQuestions } from '../../hooks/dataSource'
import Loader from '../../components/Loader'

function QuestionScreen(props) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const userId = '5e208336bfef3597db86047f'
  const quizId = props.navigation.getParam('quizId')

  const { loading, error, data } = useGetQuizQuestions(userId, quizId)

  if (loading) return <Loader />
  if (error) return <Text>error...</Text>

  const { questions } = data

  const { options, question } = questions[questionIndex]

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 24 }}>
        <ProgressViewIOS
          progress={0.4}
          progressTintColor="#118785"
          style={{
            marginVertical: 24,
            transform: [{ scaleX: 1.0 }, { scaleY: 5 }],
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{`${questionIndex +
          1}. ${question}`}</Text>
        <View>
          {Array.from(Array(options.length / 2).keys()).map(rowIndex => (
            <View style={{ flexDirection: 'row' }} key={rowIndex.toString()}>
              {options
                .slice(rowIndex * 2, (rowIndex + 1) * 2)
                .map((option, index) => (
                  <TouchableScale style={styles.imageChoice} key={option}>
                    <Image
                      style={{ height: 140, width: 140, borderRadius: 24 }}
                      source={{
                        uri: option,
                      }}
                    />
                  </TouchableScale>
                ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default QuestionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#a3a3a3',
    borderRadius: 24,
    padding: 16,
    margin: 8,
  },
})
