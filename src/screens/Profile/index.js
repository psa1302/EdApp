import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PrivacyScreen from './PrivacyScreen'
import TermsScreen from './TermsScreen'
import UserProfileScreen from './UserProfileScreen'
import EditProfileScreen from './EditProfileScreen'

const Stack = createStackNavigator()

function ProfileStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={UserProfileScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Edit" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack
