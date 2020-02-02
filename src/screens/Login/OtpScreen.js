import React, { useState, useRef, useEffect } from 'react'
import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { usePhoneLogin } from '../../hooks/common'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function OtpScreen(props) {
  const [getOtp, confirmOtp, { loading }] = usePhoneLogin()
  console.log(JSON.stringify(props.navigation.getParam('confirmation')))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={{ marginTop: 16, fontSize: 24 }}>Enter OTP</Text>
      </View>
      <View style={styles.otpContainer}>
        <OTPInputView
          style={{ width: screenWidth * 0.8, height: 200 }}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={async code =>
            await confirmOtp(code, props.navigation.getParam('confirmation'))
          }
        />
        {loading && <ActivityIndicator />}
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  otpContainer: {
    flex: 2,
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    marginBottom: 24,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
})
