import AsyncStorage from '@react-native-async-storage/async-storage'

let initialState = {
  token: null,
  user: null,
  userData: null,
  cart: [],
  orders: [],
  activeAddress: {},
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      let { token, userData, user } = action.payload

      return {
        ...state,
        token: token,
        user: user,
        userData: userData,
        cart: userData.cart,
        orders: userData.ordersId,
      }
    case 'SET_ACTIVE_ADDRESS':
      return {
        ...state,
        activeAddress: action.payload,
      }
    case 'CREATE_ORDER':
      let { newOrder } = action.payload
      return {
        ...state,
        orders: [...state.orders, newOrder],
        userData: action.payload.userData,
      }
    case 'CANCEL_ORDER':
      let { orderCancelled } = action.payload
      const cancell = (orders) => {
        return orders.map((order) => {
          return order._id === orderCancelled._id ? orderCancelled : order
        })
      }
      return {
        ...state,
        orders: cancell(state.orders),
        userData: {
          ...state.userData,
          ordersId: cancell(state.userData.ordersId),
        },
      }
    case 'UPDATE_PHOTO':
      return {
        ...state,
        userData: { ...state.userData, data: { ...state.userData.data, src: action.payload.userData.data.src } },
      }
    case 'HANDLE_CART':
      AsyncStorage.setItem('cart', JSON.stringify(action.payload.cart))
      return {
        ...state,
        userData: action.payload,
        cart: action.payload.cart,
      }
    case 'RESET_CART':
      AsyncStorage.setItem('cart', JSON.stringify([]))
      return { ...state, cart: [] }
    case 'LOG_OUT':
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('socket')
      AsyncStorage.setItem('cart', JSON.stringify([]))
      AsyncStorage.setItem('orders', JSON.stringify([]))
      return initialState

    default:
      return state
  }
}

export default userReducer
