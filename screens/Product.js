import React, { useEffect, useState } from 'react'
import Back from 'react-native-vector-icons/Entypo'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { RadioButton, Checkbox, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { ScrollView } from 'native-base'
import FloatingButton from './FloatingButton'

const Product = (props) => {
  const chosen = props.route.params.chosen
  const edit = false
  const friesSizes = [
    { size: 'Chicas', cost: 0 },
    { size: 'Medianas', cost: 30 },
    { size: 'Grandes', cost: 50 },
  ]
  const extrasChoices = [
    { type: 'Carne', cost: 100 },
    { type: 'Queso', cost: 50 },
    { type: 'Cebolla', cost: 30 },
  ]
  const drinkChoices = [
    { type: 'Sin bebida', cost: 0 },
    { type: 'Coca-Cola (500cc)', cost: 100 },
    { type: 'Sprite (500cc)', cost: 100 },
    { type: 'Fanta (500cc)', cost: 100 },
  ]
  // const [chosen, setChosen] = useState({
  //     _id: "6161fd027018fe35545892a1",
  //     category: "Lomos",
  //     description: "Increible sabor",
  //     extras: true,
  //     favs: Array [
  //         "615f7629bc3b2e7315f0088f"
  //     ],
  //     fries: true,
  //     img: "/assets/products/6161fd027018fe35545892a1.jpg",
  //     ingredients: Array [
  //         "cerdo, lechuga, huevo, queso, jamon, tomate"
  //     ],
  //     multipleDrinks: false,
  //     name: "Lomo de Cerdo Completo",
  //     price: 680,
  //     score: 3.7,
  //     stock: 5
  // })
  const initialCartItem = {
    productId: chosen._id,
    clarifications: '',
    fries: friesSizes[0],
    extras: [],
    drink: drinkChoices[0],
    unitaryPrice: chosen.price,
    totalAmount: 1,
    totalPrice: chosen.price,
  }
  const [cartItem, setCartItem] = useState(edit ? props.editItem : initialCartItem)

  const addExtras = (extra, e) => {
    if (e === 'checked') {
      setCartItem({ ...cartItem, extras: [...cartItem.extras, extra] })
    } else {
      setCartItem({
        ...cartItem,
        extras: cartItem.extras.filter((e) => e.type !== extra.type),
      })
    }
  }

  useEffect(() => {
    const { fries, extras, drink, totalAmount } = cartItem
    let extrasCost = extras.reduce((acc, extra) => acc + extra.cost, 0)
    setCartItem({
      ...cartItem,
      unitaryPrice: chosen.price + fries.cost + extrasCost + (chosen.multipleDrinks ? drink.cost : 0),
      totalPrice: chosen.multipleDrinks ? (chosen.price + fries.cost + extrasCost + drink.cost) * totalAmount : (chosen.price + fries.cost + extrasCost) * totalAmount + drink.cost,
    })
  }, [cartItem.fries, cartItem.extras, cartItem.drink])

  const amount = (operation) => {
    const { totalAmount, unitaryPrice } = cartItem
    if (operation === 'sum') {
      if (totalAmount < chosen.stock) {
        setCartItem({
          ...cartItem,
          totalAmount: totalAmount + 1,
          totalPrice: unitaryPrice * (totalAmount + 1),
        })
      } else {
        alert('ha llegado al límite de este producto')
      }
    } else {
      if (totalAmount > 1) {
        setCartItem({
          ...cartItem,
          totalAmount: totalAmount - 1,
          totalPrice: unitaryPrice * (totalAmount - 1),
        })
      }
    }
  }

  const addToCart = async () => {
    try {
      let response = await props.manageCart({
        cartItem,
        action: edit ? 'editCartItem' : 'add',
        _id: props.userData?._id,
        dif: edit ? props.editItem.totalAmount - cartItem.totalAmount : null,
      })
      if (!response.success) throw new Error()
      props.navigation.push('cart')
      //sacarr del componente
    } catch (e) {
      console.log(e)
    }

    //SACARRR DEL COMPONENTEEE!
  }

  return (
    <ScrollView>
      <View style={styles.card}>
        <View>
          <Text style={styles.h1}>{chosen.name}</Text>
        </View>
        <View style={styles.image}>
          <ImageBackground source={{ uri: `https://quickly-food.herokuapp.com${chosen.img}` }} style={styles.img}></ImageBackground>
        </View>
        <View style={styles.description}>
          <Text style={styles.h3}>Descripción:</Text>
          <Text style={styles.text}>{chosen.description}</Text>
        </View>
        <View style={styles.choices}>
          {chosen.fries && (
            <View style={styles.column_1}>
              <Text style={styles.h3}>Tamaño Papas:</Text>
              <View>
                {friesSizes.map((option, index) => (
                  <View key={index} style={styles.option}>
                    <RadioButton
                      color='#fe6849'
                      value={option.size}
                      status={cartItem.fries.size === option.size ? 'checked' : 'unchecked'}
                      onPress={() => setCartItem({ ...cartItem, fries: option })}
                    />
                    <Text style={styles.text}>
                      {option.size} {option.cost !== 0 && `$${option.cost}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={chosen.fries || chosen.extras ? styles.column_2 : styles.no_column}>
            <Text style={styles.h3}>Gaseosa:</Text>
            <View>
              {drinkChoices.map((option, index) => (
                <View key={index} style={styles.option}>
                  <RadioButton color='#fe6849' value={option.type} status={cartItem.drink.type === option.type ? 'checked' : 'unchecked'} onPress={() => setCartItem({ ...cartItem, drink: option })} />
                  <Text style={styles.text}>
                    {option.type} {option.cost !== 0 && `$${option.cost}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {chosen.extras && (
            <View style={styles.column_1}>
              <Text style={styles.h3}>Extras:</Text>
              <View>
                {extrasChoices.map((option, index) => (
                  <View key={index} style={styles.option}>
                    <Checkbox
                      color='#fe6849'
                      value={option.type}
                      status={cartItem.extras.find((o) => o.type === option.type) ? 'checked' : 'unchecked'}
                      onPress={() => addExtras(option, !cartItem.extras.find((o) => o.type === option.type) ? 'checked' : 'unchecked')}
                    />
                    <Text style={styles.text}>
                      {option.type} {option.cost !== 0 && `$${option.cost}`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          <View style={chosen.fries || chosen.extras ? styles.column_2 : styles.no_column}>
            <TextInput
              mode='outlined'
              multiline={true}
              numberOfLines={5}
              label='Aclaraciones'
              value={cartItem.clarifications}
              onChangeText={(clarifications) => setCartItem({ ...cartItem, clarifications })}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.addToCart}>
          <View style={styles.order}>
            <View style={styles.amount}>
              <View style={styles.sign}>
                <Text style={styles.price} onPress={() => amount('res')}>
                  -
                </Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numer}>{cartItem.totalAmount}</Text>
              </View>
              <View style={styles.sign}>
                <Text style={styles.price} onPress={() => amount('sum')}>
                  +
                </Text>
              </View>
            </View>
            {/* <Text style={styles.text}
                        onPress={addToCart}>
                            {edit ? "Guardar edición" : "Agregar a mi orden"}
                        </Text> */}
          </View>
          <View style={styles.order}>
            <Text style={styles.price2}>Unidad: ${cartItem.unitaryPrice}</Text>
            <Text style={styles.price2}>Total: ${cartItem.totalPrice}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.addProduct} onPress={() => addToCart()}>
            {edit ? 'Guardar edición' : 'Agregar a mi orden'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}

const mapDispatchToProps = {
  manageCart: userActions.manageCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width,
    minHeight: 850,
    flex: 1,
    alignItems: 'center',
    // justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  back: {
    alignSelf: 'flex-start',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fe6849',
  },
  image: {
    width: '90%',
    height: '25%',
    marginVertical: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  description: {
    width: '90%',
    marginBottom: 20,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fe6849',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
  choices: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column_1: {
    width: '40%',
  },
  column_2: {
    width: '55%',
  },
  no_column: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
  },
  addToCart: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  order: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '3%',
    marginTop: '-13%',
  },
  amount: {
    width: '50%',
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  addProduct: {
    backgroundColor: '#fe6849',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  sign: {
    width: '30%',
    height: '100%',
    backgroundColor: 'tomato',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price2: {
    color: 'grey',
    fontWeight: 'bold',
  },
})
