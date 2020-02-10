import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Main from './src/Main'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'

const client = new ApolloClient({
  uri: 'http://10.5.48.10:4000/graphql',
})

export default function App() {
  const scheme = useColorScheme()

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Main />
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  )
}
