import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import CreditCard from './Card'

const CheckOut = (props) => {
  const [pay, setPay] = useState(false)
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>Tu pedido</Text>
        </View>
        <View style={styles.boxCard}>
          <View style={styles.containAddress}>
            <Text style={styles.addressTitle}>Dirección de entrega</Text>
            <Text style={styles.address}>Av. Rivadavia 1194, Caba. Argentina</Text>
          </View>
          <Text style={styles.btnText}>Cambiar</Text>
        </View>
        <View style={styles.boxCard2}>
          <View style={styles.cardContainer2}>
            <View style={styles.cardContainer}>
              <ImageBackground
                style={styles.imageBox}
                resizeMode='cover'
                source={{ uri: 'https://d1uz88p17r663j.cloudfront.net/original/f10d69e7fede5cd6200a8ddd41b3cb68_hamburguesa-parrillera.jpg' }}
              ></ImageBackground>
              <View style={styles.boxMenu}>
                <View style={styles.menu}>
                  <Text style={styles.text}>1</Text>
                  <Text style={styles.productName}>Nombre Producto</Text>
                </View>
                <Text style={styles.text}>$ 0000</Text>
              </View>
            </View>
            <View style={styles.line}></View>
          </View>
          <View style={styles.cardContainer2}>
            <View style={styles.cardContainer}>
              <ImageBackground
                style={styles.imageBox}
                resizeMode='cover'
                source={{ uri: 'https://d1uz88p17r663j.cloudfront.net/original/f10d69e7fede5cd6200a8ddd41b3cb68_hamburguesa-parrillera.jpg' }}
              ></ImageBackground>
              <View style={styles.boxMenu}>
                <View style={styles.menu}>
                  <Text style={styles.text}>1</Text>
                  <Text style={styles.productName}>Nombre Producto</Text>
                </View>
                <Text style={styles.text}>$ 0000</Text>
              </View>
            </View>
            <View style={styles.line}></View>
          </View>
        </View>
        <View style={styles.boxCard}>
          <View style={styles.box}>
            <View style={styles.paymentBox}>
              <Text style={styles.paymentTitle}>Método de pago</Text>
              <Text style={styles.btnText}>Cambiar</Text>
            </View>
            <View style={styles.cardLine}>
              <View style={styles.paymentMethod}>
                {/* <Icon name='credit-card-alt' size={20} color='tomato' /> */}
                {/* <Text style={styles.method}>Aca el metodo</Text> */}
                <CreditCard pay={pay} {...props} />
              </View>
              <View style={styles.line}></View>
            </View>
          </View>
        </View>
        <View style={styles.boxImage}>
          <Text style={styles.phrase}>¡Ya casi!</Text>
          <ImageBackground style={styles.imageBtn} resizeMode='cover' source={{ uri: 'https://i.postimg.cc/xCRgB988/yacasi-Burguer.png' }}></ImageBackground>
        </View>
        <Pressable onPress={() => setPay(true)} style={styles.buttonPayment}>
          <View style={styles.accept}>
            <Icon name='check-circle' size={20} color='white' marginLeft='5%' />
            <Text style={styles.button}>Hacer pedido</Text>
          </View>
          <Text style={styles.buttonPrice}>$ {props?.cart?.reduce((acc, item) => acc + item.totalPrice, 0)}</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    cart: state.users.cart,
  }
}

const mapDispatchToProps = {
  manageCart: userActions.manageCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '4%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'tomato',
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
  boxCard2: {
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
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  cardContainer2: {
    width: '100%',
    marginTop: '4%',
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
  text: {
    fontSize: 16,
    marginRight: '3%',
  },
  imageBox: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  boxMenu: {
    paddingHorizontal: '5%',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  box: {
    width: '100%',
  },
  paymentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
  },
  method: {
    fontSize: 16,
    marginLeft: '5%',
  },
  buttonPayment: {
    backgroundColor: 'tomato',
    width: '90%',
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
    marginTop: '3%',
    marginBottom: '3%',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: '5%',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'tomato',
    marginTop: '5%',
  },
  imageBtn: {
    width: 150,
    height: 100,
  },
  boxImage: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
  },
  phrase: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 24,
  },
  accept: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '45%',
  },
  cardLine: {
    marginTop: '4%',
  },
})
