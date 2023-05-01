import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, Pressable, Modal, TextInput } from 'react-native'
import { connect } from 'react-redux'
import AddAddress from '../components/AddAddress'
import userActions from '../redux/actions/userActions'
import CardAddress from './CardAddress'
import { AntDesign } from '@expo/vector-icons';
const DataProfile = ({ userData, updateUser }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [addressProfile, setAddressProfile] = useState(userData?.addresses)
  const [updateData, setUpdateData] = useState({
    firstName: userData?.data.firstName,
    lastName: userData?.data.lastName,
  })

  useEffect(() => {
    setUpdateData({
      firstName: userData?.data.firstName,
      lastName: userData?.data.lastName,
    })
    setAddressProfile(userData?.addresses)
  }, [userData])

  const inputHandler = (e, campo, value) => {
    setUpdateData({
      ...updateData,
      [campo]: e || value,
    })
  }

  const cancelUpadte = () => {
    setUpdateData({
      firstName: userData?.data.firstName,
      lastName: userData?.data.lastName,
    })
  }

  const dataUpdate = async () => {
    let verification = Object.values(updateData).some((prop) => prop === '' || !prop)
    if (verification) return console.log('no podes modificar esto sin nada')
    console.log(updateData)
    try {
      let response = await updateUser({ action: 'updateData', userData: updateData })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <View style={styles.containAll}>
      <Text style={styles.title}>Actualizar datos personales</Text>
      <View style={styles.containInputs}>
        <Text style={styles.textTitleInputs}>Nombre</Text>
        <TextInput
          placeholder='Nombre'
          placeholderTextColor='#333333'
          color='black'
          defaultValue={updateData.firstName}
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'firstName')}
        />
        <Text style={styles.textTitleInputs}>Apellido</Text>
        <TextInput
          placeholder='Apellido'
          placeholderTextColor='#333333'
          color='black'
          defaultValue={updateData.lastName}
          style={styles.inputSignUp}
          onChangeText={(e) => inputHandler(e, 'lastName')}
        />
        <Text style={styles.textTitleInputs}>Email</Text>
        <TextInput placeholder='Email' defaultValue={userData?.data.email} placeholderTextColor='#333333' color='black' style={styles.inputSignUp} />
        <View style={styles.containerButtons}>
          <Pressable style={styles.button} onPress={cancelUpadte}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={dataUpdate}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>Cambiar</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.containerTitleAddress}>
        <Text style={styles.titleAddress}>Mis Direcciones</Text>
      </View>
      <View style={styles.containerAddress}>
        <View style={styles.cardAddress}>
          {addressProfile.length !== 0 ? (
            addressProfile.map((address) => {
              return <CardAddress updateUser={updateUser} setAddressProfile={setAddressProfile} address={address} />
            })
          ) : (
            <View style={styles.containerAddressText}>
              <Text style={styles.textAddress}>No tenes Direcciones</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.containerAddAddress}>
        <Pressable style={styles.buttonAdd} onPress={() => setModalVisible(!modalVisible)}>
          <AntDesign name="pluscircle" size={50} color="tomato" />
        </Pressable>
      </View>
      <View style={styles.centeredView}>
        <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
          <ImageBackground resizeMode='cover' style={styles.centeredView} source={{ uri: 'https://i.postimg.cc/3JsnjLSx/adress.png' }}>
            <View style={styles.modalView}>{<AddAddress updateUser={updateUser} setAddressProfile={setAddressProfile} setModalVisible={setModalVisible} />}</View>
          </ImageBackground>
        </Modal>
      </View>
    </View>
  )
}
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}
export default connect(null, mapDispatchToProps)(DataProfile)

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontFamily: 'LatoRegular',
    fontSize: 24,
    padding: '8%'
  },
  containAll: {
    width: '100%',
    height: 600,
    alignItems: 'center',
    // paddingTop: '2%',
  },
  containInputs: {
    width: '95%',
    height: '85%',
    paddingTop: 25,
    alignItems: 'flex-start',
  },
  inputSignUp: {
    backgroundColor: 'white',
    width: '95%',
    height: '13%',
    borderRadius: 10,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  textTitleInputs: {
    fontWeight: '600',
    fontSize: 18,
    color: 'grey',
    marginBottom: 10,
  },
  containerButtons: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fe6849',
    width: '50%',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    margin: 5,
  },
  containerAddAddress: {
    width: '100%',
    minHeight: 90,
    justifyContent: 'center',
  },
  imageAdd: {
    height: 65,
    width: 65,
  },
  buttonAdd: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    margin: 20,
    borderRadius: 11,
    padding: 35,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerTitleAddress: {
    width: '100%',
    alignItems: 'center',
  },
  titleAddress: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    fontSize: 26
  },
  boxCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '5%',
    width: '90%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    marginVertical: '2%',
  },
  addressTitle: {
    fontSize: 16,
    marginBottom: '2%',
  },
  address: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  containAddress: {
    width: '80%',
  },
  btnText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  containerAddressText: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAddress: {
    color: '#fe6849',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
})
