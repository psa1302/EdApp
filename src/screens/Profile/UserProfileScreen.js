import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import { Icon, Text, Avatar, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import { firebase } from '@react-native-firebase/auth'
import {
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native'

const list = [
  {
    name: 'अक्सर पूछे जाने वाले प्रश्न',
    icon: 'bubbles',
    subtitle: 'सामान्य प्रश्न और उनके उत्तर',
    iconColor: '#118785',
  },
  {
    name: 'अपनी कहानी शेयर करें',
    icon: 'action-redo',
    subtitle: 'अपनी कहानी शेयर करें',
    iconColor: '#FCBC6E',
  },
  {
    name: 'सुझाव & सलाह',
    icon: 'speech',
    subtitle: 'सुझाव & सलाह',
    iconColor: '#98D2DA',
  },
]

const legal = [
  {
    name: 'नियम और शर्तें',
    icon: 'doc',
    subtitle: 'नियम और शर्तें',
    iconColor: '#FCBC6E',
    navigateTo: 'Terms',
  },
  {
    name: 'गोपनीयता नीति',
    icon: 'people',
    subtitle: 'गोपनीयता नीति',
    iconColor: '#98D2DA',
    navigateTo: 'Privacy',
  },
]

function UserProfileScreen(props) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const { currentUser } = firebase.auth()
    setUser(currentUser)
  }, [])

  if (!user) return <Loader />

  const { email, photoURL, displayName } = user

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => await firebase.auth().signOut(),
        style: 'destructive',
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.details}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: photoURL,
            }}
          />
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.contact}>{email}</Text>
          {/* <Text style={styles.contact}>9988098592</Text> */}
          <Button
            color="#118785"
            title="संपादित करें"
            onPress={() => props.navigation.navigate('Edit')}
          />
        </View>
        <View style={styles.legal}>
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 16 }}
          >
            फीडबैक
          </Text>
          {list.map((l, i) => (
            <TouchableOpacity activeOpacity={0.6}>
              <ListItem
                key={i}
                leftIcon={
                  <Icon
                    type="simple-line-icon"
                    name={l.icon}
                    color="#118785"
                    size={16}
                  />
                }
                title={l.name}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.legal}>
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', marginHorizontal: 16 }}
          >
            कानूनी शर्तें
          </Text>
          {legal.map((l, i) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => props.navigation.navigate(l.navigateTo)}
            >
              <ListItem
                key={i}
                leftIcon={
                  <Icon
                    size={16}
                    type="simple-line-icon"
                    name={l.icon}
                    color="red"
                    color="#118785"
                  />
                }
                title={l.name}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: 16, height: 120 }}>
          <Button color="red" title="लॉग आउट" onPress={() => handleLogout()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listIcon: {
    borderRadius: 8,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    flex: 1,
    // padding: 16,
  },
  details: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  contact: {
    color: '#a3a3a3',
  },
  edit: {
    color: '#118785',
    marginTop: 8,
  },
  legal: {
    marginTop: 36,
  },
})
