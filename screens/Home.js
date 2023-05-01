import React from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'

const Home = (props) => {
  return (
    <ScrollView>
      <View style={styles.containHeader}>
        <ImageBackground style={styles.logo} resizeMode='contain' source={{ uri: 'https://i.postimg.cc/k4DZHwVH/loguito.png' }}></ImageBackground>
        <View style={styles.containerCard}>
          <View style={styles.boxCard}>
            <View style={styles.cardHome}>
              <ImageBackground resizeMode='contain' source={{ uri: 'https://i.postimg.cc/pr9w1gTY/hamburguesas.webp' }} style={styles.imageCard}></ImageBackground>
              <Text style={styles.category}>Hamburguesas</Text>
            </View>
            <View style={styles.cardHome}>
              <ImageBackground resizeMode='contain' source={{ uri: 'https://i.postimg.cc/13zjWkjg/pizza.webp' }} style={styles.imageCard}></ImageBackground>
              <Text style={styles.category}>Pizzas</Text>
            </View>
          </View>
          <View style={styles.boxCard}>
            <View style={styles.cardHome}>
              <ImageBackground resizeMode='contain' source={{ uri: 'https://i.postimg.cc/wTwWsWj9/saludable.webp' }} style={styles.imageCard}></ImageBackground>
              <Text style={styles.category}>Ensaladas</Text>
            </View>
            <View style={styles.cardHome}>
              <ImageBackground resizeMode='contain' source={{ uri: 'https://i.postimg.cc/HsdnRzHD/milanesas.webp' }} style={styles.imageCard}></ImageBackground>
              <Text style={styles.category}>Milanesas</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.push('menu', { bool: true })}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>Ver mas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    height: 200,
    width: '100%',
  },
  containHeader: {
    // paddingBottom: 15,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  containerCard: {
    height: 350,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCard: {
    height: '40%',
    width: '90%',
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHome: {
    height: '100%',
    width: '45%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  imageCard: {
    height: '100%',
    width: '100%',
    padding: '5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fe6849',
    width: '50%',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    marginTop: '10%',
  },
  containerCarouselBody: {
    height: 200,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  category: {
    textAlign: 'center',
    padding: '1%',
    color: 'tomato',
    fontSize: 20,
  },
})
