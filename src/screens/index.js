import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import HomeStack from './Home'
import AppStack from './Apps'
import VideoStack from './Videos'
import Quiz from './Quiz'
import Profile from './Profile'
import { useTheme } from '@react-navigation/native'
import { BlurView, VibrancyView } from '@react-native-community/blur'

import BottomTabBar from '../components/BottomTabBar'

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
      tabBar={router => (
        <BottomTabBar
          route={props.navigation.state.routeName}
          navigateTo={routeName => router.navigation.navigate(routeName)}
          routeIndex={router.state.index}
        />
      )}
    >
      {PANEL_ITEMS.map(item => (
        <Tab.Screen name={item.name} component={item.component} />
      ))}
    </Tab.Navigator>
  )
}

export default Navigator
