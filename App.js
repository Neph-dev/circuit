import 'react-native-gesture-handler'

import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import NetInfo from "@react-native-community/netinfo"
import { NavigationContainer } from '@react-navigation/native'

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.configure(awsconfig)

import { UserDataProvider } from './src/contexts/UserDataProvider'
// import { RoutesDataProvider } from './src/contexts/RoutesDataProvider'
import { UserPreferencesDataProvider } from './src/contexts/UserPreferencesDataProvider'
import { GetDataProvider } from './src/contexts/GetDataProvider'

import Router from './src/routers'
import NetworkErrorModal from './src/components/Modal/NetworkErrorModal'


export default function App() {
  const [isConnected, setIsConnected] = useState()

  useEffect(() => {
    NetInfo.fetch().then(state => setIsConnected(state.isConnected))
  })

  if (isConnected === false) {
    return (<NetworkErrorModal />)
  }

  return (
    <NavigationContainer>
      <UserDataProvider>
        <GetDataProvider>
          <UserPreferencesDataProvider>
            <View style={styles.container}>
              <Router />
            </View>
          </UserPreferencesDataProvider>
        </GetDataProvider>
      </UserDataProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEAEA',
    flex: 1,
  }
})