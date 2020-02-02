import React from 'react'
import { Icon, Text, Avatar, Input } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native'

function EditProfileScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profilePic}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
          />
          <Button
            color="#118785"
            title="change"
            // onPress={() => props.navigation.navigate('Edit')}
          />
        </View>
        <View style={{ padding: 8 }}>
          <Input label="Name" inputContainerStyle={{ marginBottom: 16 }} />
          <Input label="Email" inputContainerStyle={{ marginBottom: 16 }} />
          <Input
            label="Phone Number"
            inputContainerStyle={{ marginBottom: 16 }}
          />
        </View>
        <Button title="submit" onPress={() => console.log('logout')} />
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
  profilePic: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 32,
  },
})
