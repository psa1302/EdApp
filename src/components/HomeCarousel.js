import React, { useRef } from 'react'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

export const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
]

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function HomeCarousel(props) {
  const { items } = props
  const carouselRef = useRef(null)

  const goForward = () => {
    carouselRef.current.snapToNext()
  }

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={items}
        renderItem={_renderItem}
        hasParallaxImages={true}
      />
    </View>
  )
}

export default HomeCarousel

const styles = StyleSheet.create({
  container: {
    // shadowColor: '#FCBC6E',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // elevation: 10,
  },
  item: {
    width: screenWidth - 16,
    height: screenHeight * 0.35,
  },
  imageContainer: {
    marginLeft: 16,
    flex: 1,
    // marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 24,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})
