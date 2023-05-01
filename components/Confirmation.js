import React, { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const Confirmation = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Gracias</Text>
        <Text style={styles.subtitle}> por tu compra!</Text>
        <Text style={styles.text}>pronto recibiras un mail con la confirmación y detalle de compra</Text>

        <Image source={require('../assets/confirmation.png')} style={styles.imagen} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textHome}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Confirmation

const styles = StyleSheet.create({
  title: {
    color: '#FE6849',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#FE6849',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  text: {
    color: '#525252',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '8%',
  },

  imagen: {
    width: '100%',
    height: 350,
  },

  textHome: {
    color: '#fff',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#FE6849',
    width: '30%',
    borderRadius: 20,
    padding: 10,
  },
})
