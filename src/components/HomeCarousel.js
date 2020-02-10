import React, { useRef, useState } from 'react'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel'
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@react-navigation/native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

function CarouselPagination(props) {
  const { activeIndex, count } = props
  const { colors } = useTheme()

  return (
    <Pagination
      dotsLength={count}
      activeDotIndex={activeIndex}
      dotColor={colors.text}
      inactiveDotColor={colors.text}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  )
}

function HomeCarousel(props) {
  const { items } = props
  const carouselRef = useRef(null)
  const [activeItem, setItemIndex] = useState(0)

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
        onSnapToItem={index => setItemIndex(index)}
      />
      <CarouselPagination activeIndex={activeItem} count={items.length} />
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
