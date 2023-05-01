import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const AddAddress = ({setModalVisible, updateUser,setAddressProfile}, ) => {
	const [newAddress, setNewAddress] = useState({
		alias: "",
		street: "",
		number: "",
		apartment: "",
		neighborhood: ""
	})

	const inputHandler = (e, campo, value) => {
		setNewAddress({
			...newAddress,
			[campo]: e || value
		})
	} 

	const dataUpdate = async () => {
		let verification = Object.values(newAddress).some((prop) => prop === "" || !prop)
		if(verification) return console.log("LLENA LOS CAMPOS")
		try{
			let response = await updateUser({ action: 'addAddress', newAddress})
			console.log(response.success)
			if(!response.success) throw new Error()
			setAddressProfile(response.userData.addresses)
			setModalVisible(false)
		}catch(e){
			console.log(e)
		}
		
	}

	const confirm = () => {
		let verification = Object.values(newAddress).some((prop) => prop !== "")
		if(verification) console.log("tenes cambios, frenar a la persona aca y preguntar si esta seguro")
		setModalVisible(false)
	}

    return (
			<View style={styles.container}>
				<View style={styles.container}>
					<View style={styles.containerClose}>
						<Pressable style={styles.containerCloseImage} onPress={confirm}>
							<MaterialIcons name="cancel" size={33} color="white" />
						</Pressable>
					</View>
					<TextInput 
						placeholder="Alias"
						placeholderTextColor="#333333"
						color="black"
						style={styles.inputNewAddress}
						onChangeText={(e) => inputHandler(e, "alias")}
						/>
						<TextInput 
						placeholder="Calle"
						placeholderTextColor="#333333"
						color="black"
						style={styles.inputNewAddress}
						onChangeText={(e) => inputHandler(e, "street")}
						/>
						<TextInput 
						placeholder="Numeración"
						placeholderTextColor="#333333"
						color="black"
						style={styles.inputNewAddress}
						onChangeText={(e) => inputHandler(e, "number")}
						/>
						<TextInput 
						placeholder="Departamento"
						placeholderTextColor="#333333"
						color="black"
						style={styles.inputNewAddress}
						onChangeText={(e) => inputHandler(e, "apartment")}
						/>
						<TextInput 
						placeholder="Barrio / Partido / Localidad"
						placeholderTextColor="#333333"
						color="black"
						style={styles.inputNewAddress}
						onChangeText={(e) => inputHandler(e, "neighborhood")}
						/>
						<View style={styles.containerButton}>
							<Pressable style={styles.button} onPress={dataUpdate}>
								<Text style={{ textAlign: 'center', color: 'white', fontSize: 19 }}>Agregar Dirreción</Text>
							</Pressable>
						</View>
				</View>	
			</View>
    )
}


export default AddAddress

const styles = StyleSheet.create({
    container: {
        width:"100%",
    },
	inputNewAddress:{
		backgroundColor: 'white',
		width: '100%',
		height: "11%",
		borderRadius: 10,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		marginBottom: 20,
		fontSize: 19,
		shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
	},
	containerClose:{
		width: "100%",
		alignItems: "flex-end",
	},
	containerCloseImage:{
		width: 50,
		height: 50,
	},
	imageClose:{
		height: "100%",
		width: "100%",
		overflow: "hidden",
		borderRadius: 30,
	},
	containerButton:{
		width: "100%",
		alignItems: "center"
	},
	button: {
		backgroundColor: "#fe6849",
		width: "50%",
		borderRadius: 10,
		padding: 1,
		shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
	}
})