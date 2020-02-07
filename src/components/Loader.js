import React from 'react'
import { useTheme } from '@react-navigation/native'

import { View, StyleSheet, ActivityIndicator } from 'react-native'

function Loader(props) {
  const { colors } = useTheme()
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ActivityIndicator />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
})
