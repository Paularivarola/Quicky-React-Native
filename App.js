import React, { useEffect } from 'react'
import Navigator from './navigation/MainNavDrawer'
import { NavigationContainer } from '@react-navigation/native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
import { initStripe } from '@stripe/stripe-react-native'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from 'react-native'

import buyConfirmation from './components/Confirmation'
import { useFonts } from 'expo-font'
import Preloader from './components/Preloader'
LogBox.ignoreAllLogs(true)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fe6849',
    accent: 'black',
  },
}

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  useEffect(() => {
    initStripe({
      publishableKey: 'pk_test_51JiHmiD8MtlvyDMXOy1Xz9IRz7S6hXvSX3YorvlFJSNbByoEHqgmIhvVuOuYgA3PiOR9hxBM0QzQcf6OlJs4VYgI00pB5OSjXZ',
    })
  }, [])

  const [loaded] = useFonts({
    Lato: require('./assets/Lato-Light.ttf'),
    LatoRegular: require('./assets/Lato-Regular.ttf'),
  })
  if (!loaded) {
    return <Preloader />
  }

  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...'])
  // Ignore all log notifications
  LogBox.ignoreAllLogs()

  return (
    <NavigationContainer>
      <Provider store={globalStore}>
        <PaperProvider theme={theme}>
          <NativeBaseProvider>
            <Navigator />
          </NativeBaseProvider>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  )
}
