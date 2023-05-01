// App.ts
import React, { useEffect } from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import { CardField } from '@stripe/stripe-react-native'
import { Alert, Dimensions } from 'react-native'
import orderActions from '../redux/actions/orderActions'
import { connect } from 'react-redux'
import { View } from 'native-base'
import userActions from '../redux/actions/userActions'
import { useConfirmPayment } from '@stripe/stripe-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreditCard = ({ pay, payAction, ...props }) => {
  return (
    <StripeProvider publishableKey='pk_test_51JiHmiD8MtlvyDMXOy1Xz9IRz7S6hXvSX3YorvlFJSNbByoEHqgmIhvVuOuYgA3PiOR9hxBM0QzQcf6OlJs4VYgI00pB5OSjXZ' merchantIdentifier='merchant.identifier'>
      <PaymentScreen pay={pay} payAction={payAction} {...props} />
    </StripeProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
    activeAddress: state.users.activeAddress,
  }
}
const mapDispatchToProps = {
  createOrder: orderActions.createOrder,
  payAction: userActions.pay,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreditCard)

const PaymentScreen = ({ pay, payAction, ...props }) => {
  const { confirmPayment, loading } = useConfirmPayment()
  const paymentHandler = async () => {
    const cart = JSON.parse(await AsyncStorage.getItem('cart'))
    let client_secret = await payAction(cart)
    const { error, paymentIntent } = await confirmPayment(client_secret, {
      type: 'Card',
      billingDetails: { addressCity: 'Alicia Moreu' },
    })
    if (error) {
      Alert.alert('Algo salió mal!')
    } else if (paymentIntent) {
      Alert.alert('Pago exitoso')
      const order = {
        purchased: cart,
        customerId: paymentIntent.id,
        metadata: paymentIntent,
        userId: props?.userData._id,
        paymentMethod: null,
        deliveryAddress: { street: 'San Luis', number: '1231', apartment: '3 A' },
      } //props?.activeAddress
      props.createOrder(props, order)
    }
  }

  useEffect(() => {
    if (pay) {
      paymentHandler()
    }
  }, [pay])

  return (
    <>
      <View style={{ width: Dimensions.get('window').width - 100 }}>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
        />
      </View>
    </>
  )
}
