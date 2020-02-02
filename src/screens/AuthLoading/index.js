import { createStackNavigator } from 'react-navigation-stack'
import AuthLoadingScreen from './AuthLoadingScreen'

export default createStackNavigator(
  { AuthLoading: AuthLoadingScreen },
  { headerMode: 'none' }
)
