import { createStackNavigator } from 'react-navigation-stack'
import VideosScreen from './VideosScreen'

export default createStackNavigator(
  { Videos: VideosScreen },
  { headerMode: 'none' }
)
