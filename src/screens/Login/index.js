import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreen'
import PhoneNumberScreen from './PhoneNumberScreen'
import OtpScreen from './OtpScreen'

export default createStackNavigator(
  { Login: LoginScreen, Phone: PhoneNumberScreen, Otp: OtpScreen },
  { headerMode: 'none' }
)
