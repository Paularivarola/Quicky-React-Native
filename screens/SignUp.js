import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ImageBackground, Dimensions, Pressable } from 'react-native'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useToast, Box, ScrollView, Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'

const SignUp = (props) => {
  const toast = useToast()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    src: 'https://quickly-food.herokuapp.com/assets/user.png',
    google: false,
    action: 'sign',
  })
  const [repPass, setRepPass] = useState('')

  const inputHandler = (e, campo, value) => {
    setUser({
      ...user,
      [campo]: e || value,
    })
  }

  const submit = async () => {
    let inputs = Object.values(user).some((input) => input === '')
    let message
    if (!inputs) {
      let verification = user.password === repPass ? true : false
      try {
        if (!verification) throw new Error('Las contaseñas deben coincidir')
        let response = await props.createUser(user)
        if (response.error) {
          return response.error.map((error) => console.log(error))
        } else if (response.success) {
          message = 'Usuario creado exitosamente'
        }
      } catch (error) {
        message = error.message
      }
    } else {
      message = 'Todos los campos son obligatorios.'
    }
    toast.show({
      placement: 'top',
      render: () => {
        return (
          <Box bg='warning.600' px='4' py='15' rounded='sm' mb={5}>
            {message}
          </Box>
        )
      },
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={{ uri: 'https://i.postimg.cc/BvCyVC9f/fondosign-3.png' }} style={[styles.background, styles.mainContainer]}>
          <View style={styles.mainForm} action='/users/signup' method='POST'>
            <View style={styles.form}>
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss()
                }}
              >
                <>
                  <Input
                    style={styles.input}
                    leftIcon={<Icon name='user' size={24} color='white' />}
                    name='nombre'
                    type='text'
                    placeholder='Nombre'
                    onChangeText={(e) => inputHandler(e, 'firstName')}
                    errorStyle={{ color: 'transparent' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                    color='white'
                    placeholderTextColor='white'
                  />
                  <Input
                    style={styles.input}
                    leftIcon={<Icon name='user' size={24} color='white' />}
                    name='lastName'
                    type='text'
                    placeholder='Apellido'
                    onChangeText={(e) => inputHandler(e, 'lastName')}
                    errorStyle={{ color: 'transparent' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                    color='white'
                    placeholderTextColor='white'
                  />
                  <Input
                    style={styles.input}
                    leftIcon={<Icon name='at' size={24} color='white' />}
                    name='email'
                    keyboardType='email-address'
                    type='email'
                    placeholder='Email'
                    onChangeText={(e) => inputHandler(e, 'email')}
                    errorStyle={{ color: 'transparent' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                    color='white'
                    placeholderTextColor='white'
                  />
                  <Input
                    style={styles.input}
                    leftIcon={<Icon name='lock' size={24} color='white' />}
                    secureTextEntry={true}
                    password={true}
                    name='password'
                    type='password'
                    placeholder='Contraseña'
                    onChangeText={(e) => inputHandler(e, 'password')}
                    errorStyle={{ color: 'transparent' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                    color='white'
                    placeholderTextColor='white'
                  />
                  <Input
                    style={styles.input}
                    leftIcon={<Icon name='lock' size={24} color='white' />}
                    secureTextEntry={true}
                    password={true}
                    name='password'
                    type='password'
                    placeholder='Repite contraseña'
                    onChangeText={(e) => setRepPass(e)}
                    errorStyle={{ color: 'transparent' }}
                    errorMessage='ENTER A VALID ERROR HERE'
                    color='white'
                    placeholderTextColor='white'
                  />
                </>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.botonera}>
              <TouchableOpacity>
                <View style={styles.boxButton}>
                  <Text style={styles.button} onPress={submit}>
                    Crear Cuenta
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.boxTextLogueo}>
                <Text style={styles.textLogueo}>¿Tenes cuenta?</Text>
                <TouchableHighlight>
                  <Text
                    style={styles.textAction}
                    onPress={() => {
                      props.navigation.navigate('Login')
                    }}
                  >
                    Ingresar
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}
const mapDispatchToProps = {
  createUser: userActions.createUser,
}

export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  mainForm: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  background: {
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginLeft: '5%',
    width: '100%',
  },
  botonera: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxButton: {
    backgroundColor: 'white',
    width: '60%',
    padding: 6,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    marginTop: '2%',
  },
  button: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: 'tomato',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  boxTextLogueo: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogueo: {
    color: 'white',
    fontSize: 16,
    marginTop: '6%',
  },
  textAction: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})
