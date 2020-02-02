import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Text, Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import Home from './Home'
import Apps from './Apps'
import Videos from './Videos'
import Quiz from './Quiz'
import Profile from './Profile'

import { BOTTOM_PANEL_ITEMS } from '../resources/constants'

const Navigator = createBottomTabNavigator(
  {
    Home,
    Apps,
    Videos,
    Quiz,
    Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        const iconName = BOTTOM_PANEL_ITEMS[`${routeName}`]['icon']
        const label = BOTTOM_PANEL_ITEMS[`${routeName}`]['label']
        return (
          <Icon type="simple-line-icon" name={iconName} color={tintColor} />
        )
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        const label = BOTTOM_PANEL_ITEMS[`${routeName}`]['label']
        return (
          <Text
            style={{
              color: tintColor,
              ...styles.tabLabel,
            }}
          >
            {label}
          </Text>
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: '#118785',
      inactiveTintColor: '#a3a3a3',
      style: {
        paddingTop: 4,
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#FCBC6E',
      },
    },
  }
)

export default Navigator

const styles = StyleSheet.create({
  tabLabel: {
    fontWeight: 'bold',
  },
})
