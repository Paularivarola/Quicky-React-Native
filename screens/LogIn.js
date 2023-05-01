import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useToast, Box } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'

const LogIn = (props) => {
  const toast = useToast()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

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
      try {
        let response = await props.logUser(user)
        if (response.success) {
          message = 'Bienvenido!'
        } else {
          message = 'Correo y/o contraseña incorrecto.'
        }
      } catch (error) {
        message = 'Ocurrió un problema. Intente más tarde.'
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
              <Text style={styles.title}>Bienvenido!</Text>
              <Text style={styles.subtitle}>Ingresá para encontrar tus platos favoritos</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  Keyboard.dismiss()
                }}
              >
                <>
                  <Input
                    style={styles.input}
                    leftIcon={<Icon name='at' size={24} color='white' />}
                    name='email'
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
                    name='password'
                    type='password'
                    placeholder='Contraseña'
                    onChangeText={(e) => inputHandler(e, 'password')}
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
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.boxTextLogueo}>
                <Text style={styles.textLogueo}>¿No tenes cuenta?</Text>
                <TouchableHighlight style={styles.botonAction}>
                  <Text
                    style={styles.textAction}
                    onPress={() => {
                      props.navigation.navigate('Signup')
                    }}
                  >
                    Crear cuenta
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
  logUser: userActions.logUser,
}

export default connect(null, mapDispatchToProps)(LogIn)

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
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: '10%',
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
    width: '40%',
    padding: 6,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: '4%',
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
