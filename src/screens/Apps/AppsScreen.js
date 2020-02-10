import React, { useState } from 'react'
import { Text, Button, Divider, Icon } from 'react-native-elements'
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import Loader from '../../components/Loader'
import { useGetApps } from '../../hooks/dataSource'
import YouTube from 'react-native-youtube'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

import VerticalCarousel from '../../components/VerticalCarousel'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const SAMPLE_APPS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Beautiful and dramatic',
    subtitle: 'Lorem ipsum dolor sit amet ',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb29ba',
    title: 'Earlier this morning',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    id: 'bd8acbea-c1b1-46c2-aed5-3ad53abb29ba',
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    id: 'bd8acbea-c2b1-46c2-aed5-3ad53abb29ba',
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet ',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    id: 'bd8acbea-c2b2-46c2-aed5-3ad53abb29ba',
    title: 'The lone tree',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    id: 'bd8acbea-c2b2-56c2-aed5-3ad53abb29ba',
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
]

const APPS_LIMIT = 10

function Item({ title, subtitle, thumbnail, navigate, id }) {
  const { colors } = useTheme()

  return (
    <TouchableScale
      onPress={() => navigate('Apps', { id })}
      tension={250}
      activeScale={0.98}
      friction={20}
      style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 24,
      }}
    >
      <View style={{ marginRight: 16 }}>
        <Image
          loadingIndicatorSource={<ActivityIndicator />}
          style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
          }}
          source={{
            uri: thumbnail,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: colors.text }}>{title}</Text>
        <Text numberOfLines={1} style={{ color: colors.text }}>
          CSF-Top Parent
        </Text>
      </View>
    </TouchableScale>
  )
}

function AppsScreen(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { loading, error, data, fetchMore, refetch } = useGetApps({
    limit: APPS_LIMIT,
    offset: 0,
  })

  if (loading) return <Loader />
  if (error) return <Text>error...</Text>

  const appId = route.params?.id

  const { apps } = data

  apps.sort((a, b) => a.order - b.order)

  const bannerApp = appId ? apps.find(app => app.id === appId) : apps[0]
  const otherApps = apps.filter(app => app.id !== bannerApp.id)

  const { name, description, youtubeUrl, url, thumbnail } = bannerApp

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <VerticalCarousel items={apps} />
      {/*   <YouTube */}
      {/*     videoId={youtubeUrl.split('v=')[1]} // The YouTube video ID */}
      {/*     // play // control playback of video with true/false */}
      {/*     // fullscreen // control whether the video should play in fullscreen or inline */}
      {/*     // loop // control whether the video should loop when ended */}
      {/*     // onReady={e => this.setState({ isReady: true })} */}
      {/*     // onChangeState={e => this.setState({ status: e.state })} */}
      {/*     // onChangeQuality={e => this.setState({ quality: e.quality })} */}
      {/*     // onError={e => this.setState({ error: e.error })} */}
      {/*     style={{ */}
      {/*       alignSelf: 'stretch', */}
      {/*       height: screenHeight * 0.25, */}
      {/*     }} */}
      {/*   /> */}
      {/*   <View> */}
      {/*     <View */}
      {/*       style={{ */}
      {/*         // paddingTop: 16, */}
      {/*         paddingLeft: 16, */}
      {/*         paddingRight: 16, */}
      {/*       }} */}
      {/*     > */}
      {/*       <View */}
      {/*         style={{ */}
      {/*           flexDirection: 'row', */}
      {/*           justifyContent: 'space-between', */}
      {/*           marginTop: 16, */}
      {/*         }} */}
      {/*       > */}
      {/*         <Text */}
      {/*           style={{ */}
      {/*             fontSize: 20, */}
      {/*             width: screenWidth / 1.5, */}
      {/*             color: colors.text, */}
      {/*           }} */}
      {/*         > */}
      {/*           {name} */}
      {/*         </Text> */}
      {/*         <Icon */}
      {/*           type="simple-line-icon" */}
      {/*           name="cloud-download" */}
      {/*           color="#118785" */}
      {/*           size={26} */}
      {/*         /> */}
      {/*       </View> */}
      {/*       <Text style={{ color: colors.text }}>{description}</Text> */}
      {/*     </View> */}
      {/*   </View> */}
      {/*   <Divider style={{ ...styles.divider, backgroundColor: colors.border }} /> */}
      {/*   <FlatList */}
      {/*     style={{ */}
      {/*       padding: 16, */}
      {/*     }} */}
      {/*     data={otherApps} */}
      {/*     renderItem={({ item, index }) => ( */}
      {/*       <> */}
      {/*         <Item */}
      {/*           title={item.name} */}
      {/*           subtitle={item.name} */}
      {/*           thumbnail={item.thumbnail} */}
      {/*           navigate={navigation.navigate} */}
      {/*           id={item.id} */}
      {/*         /> */}
      {/*       </> */}
      {/*     )} */}
      {/*     keyExtractor={item => item.id} */}
      {/*   /> */}
    </SafeAreaView>
  )
}

export default AppsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
})
