import React from 'react'

import { View, StyleSheet, ActivityIndicator } from 'react-native'

function Loader(props) {
  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff',
  },
})
