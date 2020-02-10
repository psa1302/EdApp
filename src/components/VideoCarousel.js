import React, { useRef, useState } from 'react'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel'
import { useTheme } from '@react-navigation/native'
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function CarouselItem(props) {
  const { item, index } = props
  return (
    <Image
      style={{
        height: screenHeight / 4,
        width: screenWidth / 3 - 16,
        borderRadius: 8,
      }}
      source={{
        uri: item.thumbnail,
      }}
    />
  )
}

function VideoCarousel(props) {
  const { items, type } = props
  const carouselRef = useRef(null)

  const goForward = () => {
    carouselRef.current.snapToNext()
  }
  return (
    <Carousel
      ref={carouselRef}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      sliderWidth={screenWidth}
      // sliderHeight={screenWidth}
      itemWidth={screenWidth / 3}
      // itemHeight={}
      data={items}
      renderItem={({ item, index }) => (
        <CarouselItem item={item} index={index} />
      )}
    />
  )
}

export default VideoCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
