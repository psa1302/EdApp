import React from 'react'
import { Text, Button, Divider, Icon } from 'react-native-elements'
import {
  SafeAreaView,
  ScrollView,
  Share,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import Loader from '../../components/Loader'
import { useGetVideos } from '../../hooks/dataSource'
import YouTube from 'react-native-youtube'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import VideoCarousel from '../../components/VideoCarousel'

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
      onPress={() => navigate('Videos', { id })}
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
          }}
          source={{
            uri: thumbnail,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: 16, color: colors.text }}>
          {title}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.text }}>
          CSF-Top Parent
        </Text>
      </View>
    </TouchableScale>
  )
}

function VideosScreen(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { loading, error, data, fetchMore, refetch } = useGetVideos({
    limit: APPS_LIMIT,
    offset: 0,
  })

  const getRows = items => {
    const rows = items.map(item => {
      return {
        id: item.videoId,
        name: item.title,
        description: '',
        thumbnail: `https://img.youtube.com/vi/${item.videoId}/0.jpg`,
      }
    })
    return rows
  }

  const onShare = async title => {
    try {
      const result = await Share.share({
        message: title,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) return <Loader />
  if (error) return <Text>error...</Text>

  const videoId = route.params?.id

  let { videos } = data
  const currentVideoId = videoId || videos[0].url.split('v=')[1]
  const currentVideo =
    videos.find(video => video.videoId === currentVideoId) || {}
  const currentVideoTitle = currentVideo.title || ''

  videos = videos.filter(video => video.videoId !== currentVideoId)

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <YouTube
        videoId={currentVideoId} // The YouTube video ID
        // play // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        // loop // control whether the video should loop when ended
        // onReady={e => this.setState({ isReady: true })}
        // onChangeState={e => this.setState({ status: e.state })}
        // onChangeQuality={e => this.setState({ quality: e.quality })}
        // onError={e => this.setState({ error: e.error })}
        style={{
          alignSelf: 'stretch',
          height: screenHeight * 0.25,
        }}
      />
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              width: screenWidth / 1.5,
              color: colors.text,
            }}
          >
            {currentVideo.title}
          </Text>
          <Icon
            type="simple-line-icon"
            name="share"
            color="#118785"
            size={26}
            onPress={() => onShare(currentVideo.title)}
          />
        </View>
      </View>
      <Divider style={{ ...styles.divider, backgroundColor: colors.border }} />
      <ScrollView>
        <Text
          style={{ color: colors.text, fontSize: 18, marginHorizontal: 16 }}
        >
          Top Rated
        </Text>
        <VideoCarousel items={getRows(videos)} />
        <Text
          style={{ color: colors.text, fontSize: 18, marginHorizontal: 16 }}
        >
          Recently Added
        </Text>
        <VideoCarousel items={getRows(videos)} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default VideosScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
})
