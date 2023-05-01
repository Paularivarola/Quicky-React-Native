import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const PaymentProfile = (props) => {
    const [view, setView] = useState(true)
    return (
        <View style={styles.container}>
			<Text style={styles.title}>ESTO ES PAYMENT</Text>
        </View>
    )
}

export default PaymentProfile

const styles = StyleSheet.create({
    container: {
        width:"100%",
        marginBottom: 20,
        marginHorizontal: 'auto',

    },
    title: {
        width: '100%',
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 15,
        fontWeight: "700",
        color: "#fe6849",
    }
})