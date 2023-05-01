import React from "react"
import { Text, View, StyleSheet,ImageBackground } from "react-native"
import Carousel from "react-native-snap-carousel"


const MyCarousel = () => {
  const items = [
    {
      src: 'https://www.hola.com/imagenes/cocina/noticiaslibros/20210528190401/dia-internacional-hamburguesa-recetas-2021/0-957-455/adobe-burger-1-a.jpg',
      nombre: 'VACA',
      id: '1'
    },
    {
      src: 'https://www.hola.com/imagenes/cocina/noticiaslibros/20210528190401/dia-internacional-hamburguesa-recetas-2021/0-957-454/dia-hamburguesa-m.jpg',
      nombre: 'VACA',
      id: '2'
    },
    {
      src: 'https://www.hola.com/imagenes/cocina/noticiaslibros/20210528190401/dia-internacional-hamburguesa-recetas-2021/0-957-455/adobe-burger-1-a.jpg',
      nombre: 'VACA',
      id: '3'
    },
    {
      src: 'https://www.hola.com/imagenes/cocina/noticiaslibros/20210528190401/dia-internacional-hamburguesa-recetas-2021/0-957-454/dia-hamburguesa-m.jpg',
      nombre: 'VACA',
      id: '4'
    },
  ]

 const  _renderItem = ({item}) => {
    return (
        <View style={styles.containerImage}>
            <View key={item.id} style={styles.slide}>
                <ImageBackground source={{uri : item.src}} style={styles.image}>
                    <Text style={styles.imageTitle}>{ item.nombre }</Text>
                </ImageBackground>
                
            </View>
        </View>
    );
}

  return(
    <Carousel
              data={items}
              renderItem={_renderItem}
              sliderWidth={200}
              itemWidth={200}
              layout={'default'} 
              loop={true}
              autoplay={true}
            /> 
  )

}

export default MyCarousel

const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    alignItems: "center",
    alignSelf: "center",
    height: "100%",
    width: "100%",
    borderRadius: 30,
  },
  containerImage: {
    width: "100%",
	height: "50%",
  },
  imageTitle:{
    width: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    textAlign: "center",
    padding: 10,
    fontSize: 15,
  },
})
