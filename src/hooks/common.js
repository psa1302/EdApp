import React, { useState, useEffect, useRef } from 'react'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin'
import { firebase } from '@react-native-firebase/auth'

export function usePhoneLogin() {
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState(null)

  const getOtp = async phoneNumber => {
    setLoading(true)
    const confirmation = await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
    setLoading(false)
    return confirmation
  }

  const confirmOtp = async (otp, confirmation) => {
    setLoading(true)
    await confirmation.confirm(otp)
    setLoading(false)
  }

  return [getOtp, confirmOtp, { loading }]
}

export function useGetVideoId() {
  const getVideoId = url => {
    let params = new URLSearchParams(url.split('?')[1])
    const videoId = params.get('v')
    return videoId
  }
  return [getVideoId]
}

export function useFacebookLogin() {
  const [loading, setLoading] = useState(false)

  const facebookLogin = async () => {
    setLoading(true)
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ])
    if (result.isCancelled) {
      setLoading(false)
      return
      // throw new Error('User cancelled request')
    }
    const data = await AccessToken.getCurrentAccessToken()
    // if (!data) {
    //   throw new Error('Something went wrong obtaining the users access token')
    // }
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken
    )

    const currentUser = await firebase.auth().signInWithCredential(credential)
    setLoading(false)
  }

  return [facebookLogin, { loading }]
}

export function useGoogleLogin() {
  const [loading, setLoading] = useState(false)

  const googleLogin = async () => {
    try {
      setLoading(true)
      await GoogleSignin.configure()

      const data = await GoogleSignin.signIn()

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      )
      const currentUser = await firebase.auth().signInWithCredential(credential)
      setLoading(false)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoading(false)
      } else {
        throw error
      }
    }
  }

  return [googleLogin, { loading }]
}
