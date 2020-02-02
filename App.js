import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Main from './src/Main'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
