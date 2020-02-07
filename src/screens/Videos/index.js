import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import VideosScreen from './VideosScreen'

const Stack = createStackNavigator()

function VideoStack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Videos" component={VideosScreen} />
    </Stack.Navigator>
  )
}

export default VideoStack
