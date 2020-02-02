import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Navigator from './screens'
import Loader from './components/Loader'
import LoginScreen from './screens/Login'
import AuthLoading from './screens/AuthLoading'

const AppStack = createStackNavigator(
  { Home: Navigator },
  { headerMode: 'none' }
)
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const Main = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      App: AppStack,
      Auth: LoginScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)

export default Main
