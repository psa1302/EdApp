import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import PhoneNumberScreen from './PhoneNumberScreen'
import OtpScreen from './OtpScreen'

const Stack = createStackNavigator()

function LoginStack(props) {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Phone" component={PhoneNumberScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack
