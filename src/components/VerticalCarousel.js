import React, { useRef, useState, useEffect } from 'react'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel'
import { Button, Divider, Icon } from 'react-native-elements'
import YouTube from 'react-native-youtube'
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native'
import { BlurView, VibrancyView } from '@react-native-community/blur'
import { useTheme } from '@react-navigation/native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function CarouselItem(props) {
  const { item, index } = props
  const blurRef = useRef(null)
  const actionBlurRef = useRef(null)
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={{ flex: 1, position: 'relative', margin: 16 }}
    >
      <Image
        style={{
          // flex: 1,
          height: screenHeight - 274,
          width: screenWidth - 32,
          borderRadius: 24,
        }}
        source={{
          uri: item.thumbnail,
        }}
      />
      <BlurView
        style={styles.actionBlur}
        viewRef={actionBlurRef}
        blurType="regular"
        blurAmount={20}
      >
        <Icon
          type="simple-line-icon"
          name="paper-plane"
          color={colors.text}
          size={24}
        />
      </BlurView>
      <BlurView
        style={{ ...styles.actionBlur, top: 76 }}
        viewRef={actionBlurRef}
        blurType="regular"
        blurAmount={20}
      >
        <Icon
          type="simple-line-icon"
          name="cloud-download"
          color={colors.text}
          size={24}
        />
      </BlurView>
      <BlurView
        style={styles.descriptionBlur}
        viewRef={blurRef}
        blurType="regular"
        blurAmount={20}
      >
        <Image
          style={{ height: 50, width: 50, borderRadius: 8 }}
          source={{
            uri: item.thumbnail,
          }}
        />
        <View style={{ flexDirection: 'column', paddingHorizontal: 16 }}>
          <Text style={{ color: colors.text, fontSize: 18 }}>{item.name}</Text>
          <Text
            style={{ color: colors.text, width: screenWidth * 0.7 }}
            numberOfLines={1}
          >
            {item.description}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  )
}

function VerticalCarousel(props) {
  const { items, type } = props
  const [currentVideo, setCurrentVideo] = useState(items[0])
  const carouselRef = useRef(null)

  const goForward = () => {
    carouselRef.current.snapToNext()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        ref={carouselRef}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        itemHeight={screenHeight - 240}
        data={items}
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} />
        )}
        vertical
      />
    </SafeAreaView>
  )
}

export default VerticalCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: screenHeight - 120,
  },
  actionBlur: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionBlur: {
    borderRadius: 24,
    height: 80,
    width: screenWidth - 32,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
})
