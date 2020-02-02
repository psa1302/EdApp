import { createStackNavigator } from 'react-navigation-stack'
import AppsScreen from './AppsScreen'

export default createStackNavigator(
  { Apps: AppsScreen },
  { headerMode: 'none' }
)
