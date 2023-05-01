import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
const ProductCard = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.picture} source={{ uri: `https://quickly-food.herokuapp.com${props.product.img}` }}></ImageBackground>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    picture: {
        width: 200,
        height: 200,
    }
})