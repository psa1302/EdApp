import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { Image, View } from 'react-native'
import { Icon } from 'react-native-elements'

import PrivacyScreen from './PrivacyScreen'
import TermsScreen from './TermsScreen'
import UserProfileScreen from './UserProfileScreen'
import EditProfileScreen from './EditProfileScreen'

export default createStackNavigator(
  {
    Profile: UserProfileScreen,
    Terms: TermsScreen,
    Privacy: PrivacyScreen,
    Edit: EditProfileScreen,
  },
  {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      title: (
        <Image
          source={require('../../../assets/logo.png')}
          style={{ height: 36, width: 36 }}
        />
      ),
      headerBackTitle: 'प्रोफाइल',
    },
  }
)
