import axios from 'axios'
const HOST = 'https://quickly-food.herokuapp.com'
import AsyncStorage from '@react-native-async-storage/async-storage'

const userActions = {
  createUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await axios.post(`${HOST}/api/user/signUp`, user)
        if (res.data.success) {
          const { user, userData, token } = res.data
          await AsyncStorage.setItem('token', token)
          dispatch({
            type: 'LOG_IN',
            payload: { user, userData, token },
          })
        }
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  logUser: (user, props) => {
    return async (dispatch) => {
      try {
        let res = await axios.post(`${HOST}/api/user/logIn`, { ...user })
        if (res.data.success) {
          const { user, userData, token } = res.data
          await AsyncStorage.setItem('token', token)
          dispatch({
            type: 'LOG_IN',
            payload: { user, userData, token },
          })
        }
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  logOut: () => {
    return async (dispatch) => {
      await AsyncStorage.clear()
      return dispatch({ type: 'LOG_OUT' })
    }
  },
  uploadPhoto: (img, _id) => {
    return async (dispatch) => {
      let res = await axios.post(`http://localhost:4000/api/mob/userimg`, { img, _id })
      console.log(res)
      return dispatch({ type: 'UPDATE_PHOTO', payload: res.data })
    }
  },
  verifyToken: (token) => {
    return async (dispatch) => {
      try {
        let response = await axios.get(`${HOST}/api/user/token`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        dispatch({
          type: 'LOG_IN',
          payload: { ...response.data, token },
        })
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
  pay: (cart) => {
    return async () => {
      try {
        let res = await axios.post(`${HOST}/api/create-payment-intent`, { cart })
        const { client_secret } = res.data.paymentIntent
        return client_secret
      } catch (err) {
        console.log(err.message)
      }
    }
  },

  selectActiveAddress: (address) => {
    return (dispatch) => {
      dispatch({ type: 'SET_ACTIVE_ADDRESS', payload: address })
    }
  },
  manageCart: (body) => {
    return async (dispatch) => {
      let token = AsyncStorage.getItem('token')
      if (!token) {
        let cart = JSON.parse(AsyncStorage.getItem('cart'))
        AsyncStorage.setItem('cart', cart ? JSON.stringify([...cart, body.cartItem]) : JSON.stringify([body.cartItem]))
      } else {
        try {
          let response = await axios.put(`${HOST}/api/products`, body)
          if (!response?.data?.success) throw new Error('Algo salió mal')
          // console.log(response.data)
          dispatch({
            type: 'HANDLE_CART',
            payload: response.data.userData,
          })
          return response.data
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  favHandler: (body) => {
    return async (dispatch) => {
      let token = AsyncStorage.getItem('token')
      try {
        let response = await axios.put(`${HOST}/api/products/favs`, body, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        if (!response?.data?.success) throw new Error('Algo salió mal')
        dispatch({
          type: 'GET_PRODUCTS',
          payload: response.data.response,
        })
        return response?.data?.success
      } catch (error) {
        console.log(error)
      }
    }
  },
  updateUser: ({ action, userData, fileImg, currentPassword, password, newPaymentCard, paymentCardId, newAddress, addressId }) => {
    return async (dispatch) => {
      let token = await AsyncStorage.getItem('token')
      let body = fileImg || {
        action,
        userData,
        currentPassword,
        password,
        newPaymentCard,
        paymentCardId,
        newAddress,
        addressId,
      }
      try {
        let res = await axios.put(`${HOST}/api/user`, body, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        dispatch({
          type: 'LOG_IN',
          payload: { ...res.data, token, keep: true },
        })
        return res.data
      } catch (error) {
        console.log(error)
        // return dispatch({ type: 'LOG_OUT' })
      }
    }
  },
}

export default userActions
