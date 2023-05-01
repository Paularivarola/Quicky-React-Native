import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import Home from '../screens/Home'
import LogIn from '../screens/LogIn'
import Profile from '../screens/Profile'
import SignUp from '../screens/SignUp'
import Menu from '../screens/Menu'
import Card from '../screens/Card.js'
import CheckOut from '../screens/CheckOut'

const Bottom = createBottomTabNavigator()

const Navigator = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name='Card' component={Card} />
      <Bottom.Screen name='Home' component={Home} />
      <Bottom.Screen name='Menu' component={Menu} />
      <Bottom.Screen name='Product' component={Product} />
      <Bottom.Screen name='Profile' component={Profile} />
      <Bottom.Screen name='CheckOut' component={CheckOut} />
      <Bottom.Screen name='SignUp' component={SignUp} />
      <Bottom.Screen name='LogIn' component={Cart} />
    </Bottom.Navigator>
  )
}

export default Navigator
