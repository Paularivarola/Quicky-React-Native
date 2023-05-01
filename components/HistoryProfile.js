import { FlatList } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import orderActions from '../redux/actions/orderActions'

const OrderCard = ({ order }) => {
  console.log(order)
  const [address, setAddress] = useState('')
  const { street, number, apartment } = order?.deliveryAddress
  useEffect(() => {
    setAddress(`${street} ${number} ${apartment}`)
  }, [])
  let deliveryTime = order?.deliveryTime.split(' ').slice(4, 5)[0]
  deliveryTime = deliveryTime?.split(':').slice(0, 2).join(':')
  return (
    <View style={styles.containerCard}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Estado de pedido</Text>
      </View>
      <View style={styles.containerCardBody}>
        <View style={styles.containerImage}>
          {order?.status === 'Pendiente' && <ImageBackground style={styles.imageCard} style={{ backgroundImage: 'url("https://i.postimg.cc/Ls7XBvbv/pendiente.png")' }}></ImageBackground>}
          {order?.status === 'En preparación' && <ImageBackground style={styles.imageCard} style={{ backgroundImage: 'url("https://i.postimg.cc/KcH4B8tN/preparacion.gif")' }}></ImageBackground>}
          {order?.status === 'En camino' && <ImageBackground style={styles.imageCard} style={{ backgroundImage: 'url("https://i.postimg.cc/rsg8yc5K/moto.png")' }}></ImageBackground>}
          {order?.status === 'Entregado' && <ImageBackground style={styles.imageCard} style={{ backgroundImage: 'url("https://i.postimg.cc/tJtPC0mf/entregado.gif")' }}></ImageBackground>}
          {order?.status === 'Cancelado' && <ImageBackground style={styles.imageCard} style={{ backgroundImage: 'url("https://i.postimg.cc/L5D1mLxP/cancelado.gif")' }}></ImageBackground>}
        </View>
        <View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Estado: </Text>
            <Text>{order?.status}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>N°: </Text>
            <Text>{order?._id}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Precio: </Text>
            <Text>{order?.purchased?.reduce((acc, item) => acc + item.totalPrice, 0)}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Punto de entrega: </Text>
            <Text>{address}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Hora estimada: </Text>
            <Text>{deliveryTime}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const HistoryProfile = ({ userData, orders, getOrders }) => {
  //   useEffect(() => {
  //     getOrdersById()
  //   }, [])
  //   const getOrdersById = async () => {
  //     try {
  //       let response = await getOrders(userData)
  //       console.log(response)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  console.log(orders)
  return (
    <View style={styles.containerAll}>
      <FlatList data={orders} keyExtractor={(item) => item._id} renderItem={({ item, index }) => <OrderCard order={item} />} />
    </View>
  )
}

const mapDispachToProps = {
  getOrders: orderActions.getUserOders,
}
const mapStateToProps = (state) => {
  return {
    orders: state.users.orders,
  }
}

export default connect(mapStateToProps, mapDispachToProps)(HistoryProfile)

const styles = StyleSheet.create({
  containerAll: {
    width: '100%',
    padding: 10,
  },
  title: {
    width: '100%',
    padding: 5,
    textAlign: 'center',
    color: '#fe6849',
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerCard: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(252, 252, 252, 1)',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 0.2,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    marginTop: '5%',
  },
  containerCardBody: {
    width: '98%',
    height: '78%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'tomato',
  },
  containerImage: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 100,
  },
  imageCard: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  containerText: {
    flexDirection: 'row',
  },
  text: {
    color: '#fe6849',
    fontWeight: 'bold',
  },
})
