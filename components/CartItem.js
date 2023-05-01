import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CartItem = ({ cartItem }) => {
  return (
    <View style={styles.slide}>
      {/* <View style={styles.infoContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.containerPrice}>
                    <Text style={styles.textPrice}>${item.price}</Text>
                    <Pressable style={styles.button}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }} onPress={() => props.navigation.navigate('Menu')}>+</Text>
                    </Pressable>
                </View>
            </View> */}
      <View style={{ width: '15%' }}>
        <Text>{cartItem?.totalAmount}x</Text>
      </View>
      <View style={{ width: '65%' }}>
        <Text>{cartItem?.productId?.name}</Text>
        <Text>${cartItem?.productId?.price}</Text>
      </View>
      <View style={{ width: '20%', alignItems: 'flex-end' }}>
        <Text>${cartItem?.unitaryPrice}</Text>
      </View>
    </View>
  )
}
export default CartItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  slide: {
    width: '100%',
    // height: 160,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  background: {
    width: 120,
    height: 120,
    borderRadius: 10,
    // borderTopStartRadius: 10,
    // borderBottomStartRadius: 10,
    marginRight: 5,
    overflow: 'hidden',
  },
  infoContainer: {
    height: 120,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    width: '100%',
    color: '#fe6849',
    textAlign: 'center',
    padding: 5,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#fe6849',
    width: '18%',
    borderRadius: 5,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  productIngredients: {
    textAlign: 'center',
    paddingBottom: 5,
  },
  containerPrice: {
    flexDirection: 'row',
    width: '70%',
    paddingTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.4,
  },
  textPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
