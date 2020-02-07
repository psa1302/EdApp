import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppsScreen from './AppsScreen'

const Stack = createStackNavigator()

function AppStack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Apps" component={AppsScreen} />
    </Stack.Navigator>
  )
}

export default AppStack
