import React, { useEffect } from 'react'

import Loader from '../../components/Loader'
import { firebase } from '@react-native-firebase/auth'

function AuthLoading(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'App' : 'Auth')
    })
  }, [])

  return <Loader />
}

export default AuthLoading
