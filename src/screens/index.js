import React from 'react'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import HomeStack from './Home'
import AppStack from './Apps'
import VideoStack from './Videos'
import Quiz from './Quiz'
import Profile from './Profile'
import { useTheme } from '@react-navigation/native'

import { BOTTOM_PANEL_ITEMS } from '../resources/constants'

const PANEL_ITEMS = [
  {
    name: 'Home',
    component: HomeStack,
    label: 'होम',
    icon: 'home',
  },
  {
    name: 'Apps',
    component: AppStack,
    label: 'एपस्',
    icon: 'screen-tablet',
  },
  {
    name: 'Videos',
    component: VideoStack,
    label: 'वीडियो',
    icon: 'film',
  },
  {
    name: 'Quiz',
    component: Quiz,
    label: 'टॉप व्किज़',
    icon: 'bulb',
  },
  {
    name: 'Profile',
    component: Profile,
    label: 'प्रोफाइल',
    icon: 'user',
  },
]

const Tab = createBottomTabNavigator()

function Navigator(props) {
  const scheme = useColorScheme()
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: scheme === 'dark' ? '#FCBC6E' : '#118785',
        labelPosition: 'below-icon',
        style: {
          height: 96,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabStyle: {
          justifyContent: 'center',
        },
      }}
    >
      {PANEL_ITEMS.map(item => (
        <Tab.Screen
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: item.label,
            tabBarIcon: ({ color, size }) => (
              <Icon
                type="simple-line-icon"
                name={item.icon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default Navigator
