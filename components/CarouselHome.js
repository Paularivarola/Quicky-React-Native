import React from "react"
import { Text, View, StyleSheet, ImageBackground, Dimensions, Image } from "react-native"
import Carousel from "react-native-snap-carousel"


const CarouselHome = () => {
  const items = [
    {
      src: 'https://i.postimg.cc/X7ZmvnB6/store-10608-1620046217068.png',
      id: '1'
    },
    {
      src: 'https://i.postimg.cc/85PngGg3/store-11021-1630008502782-1.png',
      id: '2'
    },
    {
      src: 'https://i.postimg.cc/rmnZ8H8p/store-9788-1620854217584.png',
      id: '3'
    },
    {
      src: 'https://i.postimg.cc/nhG6y0QX/store-10917-1628522313813.png',
      id: '4'
    },
  ]
  const sliderWidth = Dimensions.get('screen').width
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.containerImage} key={item.id} >
        <ImageBackground source={{ uri: item.src }} style={styles.image} resizeMode='cover'></ImageBackground>
      </View>
    );
  }

  return (
    <Carousel
      data={items}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={sliderWidth} git a
      layout={'default'}
      loop={true}
      autoplay={true}
    />
  )

}

export default CarouselHome

const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
  containerImage: {
    width: "100%",
    height: "100%",
  },
  slide: {
    height: "100%",
    width: "100%",
    backgroundColor: "red"
  }
})