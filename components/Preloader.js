import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'


const Preloader = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.preloaderImage} source={{ uri: 'https://quickly-food.herokuapp.com/assets/preloader.gif' }} />
            <Text style={styles.text}>{props.message}</Text>
        </View>
    )
}

export default Preloader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    preloaderImage: {
        width: 350,
        height: 350
    },
    text: {
        color: '#fe6849',
        fontSize: 25,
        fontWeight: '600'
    }
})