import { createStackNavigator } from 'react-navigation-stack'
import QuizScreen from './QuizScreen'
import QuestionScreen from './QuestionScreen'

export default createStackNavigator({
  Quiz: QuizScreen,
  Question: QuestionScreen,
})
