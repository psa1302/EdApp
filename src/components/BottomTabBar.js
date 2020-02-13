import React, { useRef, useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { BlurView, VibrancyView } from '@react-native-community/blur'
import { Icon } from 'react-native-elements'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { firebase } from '@react-native-firebase/auth'

const PANEL_ITEMS = [
  {
    name: 'Home',
    label: 'होम',
    icon: 'home',
  },
  {
    name: 'Apps',
    label: 'एपस्',
    icon: 'screen-tablet',
  },
  {
    name: 'Videos',
    label: 'वीडियो',
    icon: 'film',
  },
  {
    name: 'Quiz',
    label: 'टॉप व्किज़',
    icon: 'bulb',
  },
  {
    name: 'Profile',
    label: 'प्रोफाइल',
    icon: 'user',
  },
]

function BottomTabBar(props) {
  const { route, routeIndex, navigateTo } = props
  const { colors } = useTheme()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { currentUser } = firebase.auth()
    setUser(currentUser)
  }, [])

  return (
    <BlurView
      style={{ ...styles.tabBar, borderColor: colors.border }}
      blurType="regular"
      blurAmount={20}
    >
      {PANEL_ITEMS.map((item, index) => (
        <TouchableOpacity
          onPress={() => navigateTo(item.name)}
          activeOpacity={0.8}
          style={styles.tab}
        >
          {item.name !== 'Profile' ? (
            <Icon
              type="simple-line-icon"
              name={item.icon}
              color={routeIndex === index ? colors.primary : colors.text}
              size={24}
            />
          ) : (
            <Image
              style={{
                ...styles.profileImg,
                borderColor:
                  routeIndex === index ? colors.primary : colors.text,
              }}
              source={{
                uri: user?.photoURL,
              }}
            />
          )}
        </TouchableOpacity>
      ))}
    </BlurView>
  )
}

export default BottomTabBar

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 32,
    margin: 16,
    borderRadius: 24,
    maxWidth: 420,
    alignSelf: 'center',
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 2,
  },
})
