import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Menu from '../screens/Menu'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import Profile from '../screens/Profile'
import Product from '../screens/Product'
import PaymentScreen from '../screens/Card'
import Cart from '../screens/Cart'
import { Pressable } from 'react-native'
import { View } from 'native-base'
import CheckOut from '../screens/CheckOut'
import Confirmation from '../components/Confirmation'

const Stack = createNativeStackNavigator()

// const Navigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='homeStack' component={Home} />
//       <Stack.Screen name='MenuStack' component={Menu} />
//       <Stack.Screen name='ProfileStack' component={Profile} />
//       <Stack.Screen name='SignUpStack' component={SignUp} />
//       <Stack.Screen name='LogInStack' component={LogIn} />
//       <Stack.Screen name='Producto' component={Product} />
//     </Stack.Navigator>
//   )
// }

export const HomeStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={Home} />
      <Stack.Screen name='menu' component={MenuStack} initialParams={props?.route?.params} />
    </Stack.Navigator>
  )
}

export const MenuStack = (props) => {
  useEffect(() => {
    props?.route?.params?.bool && props?.navigation?.getParent()?.setOptions({ headerShown: false })
    return () => props?.route?.params?.bool && props?.navigation?.getParent()?.setOptions({ headerShown: true })
  }, [])
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: props?.route?.params?.bool,
        headerTitleStyle: {
          fontSize: 40,
        },
        headerStyle: {
          height: 80,
          backgroundColor: 'whitesmoke',
        },
      }}
      screenOptions={{}}
    >
      <Stack.Screen
        name='menuStack'
        component={Menu}
        options={({ navigation, route }) => {
          return {
            headerTitleStyle: { fontSize: 25 },
            title: 'Menu',
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <AntDesign name='back' size={24} color='black' />
                </View>
              </Pressable>
            ),
          }
        }}
      />
      <Stack.Screen
        name='product'
        component={Product}
        options={({ navigation, route }) => {
          return {
            headerTitleStyle: { fontSize: 25 },
            title: route.params.chosen.name,
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <AntDesign name='back' size={24} color='black' />
                </View>
              </Pressable>
            ),
          }
        }}
      />
      <Stack.Screen
        name='cart'
        component={Cart}
        options={({ navigation, route }) => {
          return {
            headerTitleStyle: { fontSize: 25 },
            title: 'Carrito',
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <AntDesign name='back' size={24} color='black' />
                </View>
              </Pressable>
            ),
          }
        }}
      />
      <Stack.Screen
        name='checkout'
        component={CheckOut}
        options={({ navigation, route }) => {
          return {
            headerTitleStyle: { fontSize: 25 },
            title: 'Check Out',
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  navigation.goBack()
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <AntDesign name='back' size={24} color='black' />
                </View>
              </Pressable>
            ),
          }
        }}
      />
      <Stack.Screen name='confirmation' component={Confirmation} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile' component={Profile} />
    </Stack.Navigator>
  )
}

// export const ProductStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name='producto' component={Product} />
//     </Stack.Navigator>
//   )
// }
