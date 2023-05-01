import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'

const FloatingButton = ({ func }) => {
  return (
    <Pressable onPress={func} style={styles.floating}>
      <Text style={styles.text}>Carrito</Text>
    </Pressable>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    bottom: 10,
    left: -18,
    height: 50,
    width: 200,
    backgroundColor: 'tomato',
    borderRadius: 30,
  },
  text: { fontFamily: 'LatoRegular', fontSize: 30, color: 'whitesmoke', textAlign: 'center', paddingTop: 8 },
})
