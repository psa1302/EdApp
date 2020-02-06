import React, { useEffect, useState } from 'react'
import { Icon, Text, Avatar, Input } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import ImagePicker from 'react-native-image-picker'
import { firebase } from '@react-native-firebase/auth'
import {
  ActionSheetIOS,
  Button,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import Loader from '../../components/Loader'

var BUTTONS = ['Take Photo', 'Choose Photo', 'Cancel']
var CANCEL_INDEX = 2

function EditProfileScreen(props) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const {
      currentUser: { phoneNumber, email, displayName, photoURL },
    } = firebase.auth()
    setCurrentUser({ phoneNumber, email, displayName, photoURL })
  }, [])

  const showActionSheet = () => {
    const options = { noData: true, mediaType: 'photo' }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.launchCamera(options, response => {
              console.log({ response })
            })
            break
          case 1:
            ImagePicker.launchImageLibrary(options, response => {
              console.log({ response })
            })
            break
          default:
            console.log('user cancelled')
        }
      }
    )
  }

  if (!currentUser) return <Loader />

  const { phoneNumber, email, displayName, photoURL } = currentUser

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profilePic}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: photoURL,
            }}
          />
          <Button
            color="#118785"
            title="change"
            onPress={() => showActionSheet()}
          />
        </View>
        <View style={{ padding: 16 }}>
          <View style={styles.detailArea}>
            <Icon
              type="simple-line-icon"
              name="user"
              color="#118785"
              size={16}
            />
            <TextInput
              onChangeText={value => {
                setCurrentUser({ ...currentUser, displayName: value })
              }}
              style={styles.detailInput}
              placeholder="Name"
              autoCompleteType="name"
              defaultValue={displayName}
              editable
              clearButtonMode="while-editing"
              maxLength={40}
            />
          </View>
          <View style={styles.detailArea}>
            <Icon
              type="simple-line-icon"
              name="envelope-open"
              color="#118785"
              size={16}
            />
            <TextInput
              onChangeText={value => {
                setCurrentUser({ ...currentUser, email: value })
              }}
              style={styles.detailInput}
              placeholder="Email"
              autoCompleteType="email"
              clearButtonMode
              clearButtonMode="while-editing"
              defaultValue={email}
              editable
              maxLength={40}
            />
          </View>
          <View style={styles.detailArea}>
            <Icon
              type="simple-line-icon"
              name="phone"
              color="#118785"
              size={16}
            />
            <TextInput
              onChangeText={value => {
                setCurrentUser({ ...currentUser, phoneNumber: value })
              }}
              style={styles.detailInput}
              placeholder="Phone No."
              autoCompleteType="tel"
              clearButtonMode="while-editing"
              defaultValue={phoneNumber}
              clearButtonMode
              editable
              maxLength={40}
            />
          </View>
        </View>
        <Button
          title="submit"
          onPress={() =>
            firebase
              .auth()
              .currentUser.updateProfile(currentUser)
              .then(() => console.log('success'))
              .catch(error => console.log(error))
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailArea: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailInput: {
    flex: 1,
    margin: 8,
    fontSize: 18,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  profilePic: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 32,
  },
})
