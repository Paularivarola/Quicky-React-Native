import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const cardAddress = ({address, setAddressProfile, updateUser}) => {
	const deleteAddress = async (addressId) => {
        try{
            let response = await updateUser({ action: 'deleteAddress', addressId })
            if(!response.success) throw new Error()
            setAddressProfile(response.userData.addresses)
        }catch(e){
            console.log(e)
        }
        
	}
    return (
		<View style={styles.boxCard}>
			<View style={styles.containAddress}>
				<Text style={styles.addressTitle}>Dirección de entrega</Text>
				<Text style={styles.address}>{address.street} {address.number}, {address.neighborhood}.</Text>
			</View>
			<Pressable onPress={() => deleteAddress(address._id)} style={styles.button}> 
				<Text style={styles.btnText}>Borrar</Text>
			</Pressable>
		</View>
    )
}

export default cardAddress

const styles = StyleSheet.create({
	boxCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '5%',
        width: '100%',
        borderRadius: 10,
        shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
        marginVertical: '2%'
    },
    addressTitle: {
        fontSize: 16,
        marginBottom: '2%'
    },
    address: {
        fontWeight: 'bold',
        fontSize: 16
    },
    containAddress: {
        width: '80%'
    },
    btnText: {
        color: 'tomato',
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: 'rgba(5, 5, 5, 0.1)',
        padding: 5,
        borderRadius: 8,
    }
})