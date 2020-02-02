import React, { useEffect, useState, useRef } from 'react'
import { useGoogleLogin, useFacebookLogin } from '../../hooks/common'
import { Icon, Text, SocialIcon, Divider } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import { BlurView, VibrancyView } from '@react-native-community/blur'
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function LoginScreen(props) {
  const [facebookLogin, { loading: facebookLoginLoading }] = useFacebookLogin()
  const [googleLogin, { loading: googleLoginLoading }] = useGoogleLogin()

  const blurRef = useRef(null)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer} ref={blurRef}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.appName}>टॉप पेरेंट</Text>
        <Text style={styles.appSubtitle}>सीखने सिखाने के नए तरीके</Text>
      </View>
      <View style={styles.socialContainer}>
        <SocialIcon
          title="Sign In With Phone"
          button
          type="phone"
          style={{ backgroundColor: '#00444a' }}
          onPress={() => props.navigation.navigate('Phone')}
          // onPress={() => facebookLogin()}
        />
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={() => facebookLogin()}
        />
        <SocialIcon
          title="Sign In With Google"
          button
          type="google"
          onPress={() => googleLogin()}
        />
      </View>
      {(facebookLoginLoading || googleLoginLoading) && (
        <>
          <BlurView
            style={styles.absolute}
            viewRef={blurRef}
            blurType="light"
            blurAmount={10}
          />
          <ActivityIndicator style={styles.blurLoader} />
        </>
      )}
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  blurLoader: {
    position: 'absolute',
    left: screenWidth * 0.5,
    top: screenHeight * 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    marginBottom: 24,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#118785',
  },
  appSubtitle: {
    fontSize: 18,
    color: '#118785',
  },
  divider: {
    backgroundColor: '#eaeaea',
    marginTop: 8,
    marginBottom: 8,
  },
  socialContainer: {
    flex: 1,
    padding: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
