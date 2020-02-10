import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppsScreen from './AppsScreen'
import AppDescriptionScreen from './AppDescriptionScreen'

const Stack = createStackNavigator()

function AppStack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Apps" component={AppsScreen} />
      <Stack.Screen name="AppDescription" component={AppDescriptionScreen} />
    </Stack.Navigator>
  )
}

export default AppStack
