import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { Image } from 'react-native'
import HomeScreen from './HomeScreen'

const Stack = createStackNavigator()

function HomeStack(props) {
  const { colors } = useTheme()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: (
            <Image
              source={require('../../../assets/logo.png')}
              style={{ height: 36, width: 36 }}
            />
          ),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
