import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native'
import PhoneInput from 'react-native-phone-input'
import { usePhoneLogin } from '../../hooks/common'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function PhoneNumberScreen(props) {
  const [countryCode, setCountryCode] = useState('in')
  const [confirmationResult, setConfirmation] = useState(null)
  const [getOtp, confirmOtp, { loading }] = usePhoneLogin()
  const phoneRef = useRef(null)

  useEffect(() => {
    if (phoneRef) {
      phoneRef.current.selectCountry(countryCode)
      console.log(phoneRef.current.getCountryCode(countryCode))
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={{ marginTop: 16, fontSize: 24 }}>Enter Phone Number</Text>
      </View>
      <View style={styles.phoneContainer}>
        <PhoneInput
          style={styles.phoneInput}
          ref={phoneRef}
          onSelectCountry={code => setCountryCode(code)}
        />
        <Button
          disabled={loading}
          color="#00444a"
          title="Send OTP"
          onPress={async () => {
            if (phoneRef.current.isValidNumber()) {
              const confirmation = await getOtp(phoneRef.current.getValue())
              props.navigation.navigate('Otp', { confirmation })
            }
          }}
        />
        <Button
          disabled={loading}
          color="red"
          title="Cancel"
          onPress={() => props.navigation.goBack()}
        />
        {loading && <ActivityIndicator />}
      </View>
    </SafeAreaView>
  )
}

export default PhoneNumberScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    flex: 2,
    alignItems: 'center',
  },
  phoneInput: {
    width: screenWidth * 0.5,
    height: 40,
    textAlign: 'center',
    borderBottomColor: '#00444a',
    borderBottomWidth: 1,
    fontSize: 24,
    marginBottom: 16,
  },
  logo: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    marginBottom: 24,
  },
})
