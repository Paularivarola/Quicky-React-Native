import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
const Hero = (props) => {
  return (
    <ImageBackground source={{ uri: 'https://i.postimg.cc/C5T0P2YM/hamburguesa.png' }} style={styles.imageHero}>
      <StatusBar backgroundColor='#E6A07C' barStyle='light-content' />
      <View style={styles.contenedorHero}>
        <ImageBackground style={styles.logo} source={{ uri: 'https://i.postimg.cc/zv3pNmMr/loguito-2.png' }}></ImageBackground>
        <View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={styles.button}>
            <Text style={{ color: 'white', fontSize: 22, textAlign: 'center', fontFamily: 'LatoRegular' }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Hero

const styles = StyleSheet.create({
  contenedorHero: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height - 50,
  },
  imageHero: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  titulo: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: Dimensions.get('window').width - 200,
    height: Dimensions.get('window').width - 350,
    resizeMode: 'contain',
  },
  button: {
    paddingTop: 8,
    backgroundColor: 'transparent',
    borderColor: 'whitesmoke',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    // paddingTop: 10,
    width: '100%',
  },
})
