import 'react-native-gesture-handler'

import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import PushNotification from 'react-native-push-notification'

import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.configure(awsconfig)

import { UserDataProvider } from './src/contexts/UserDataProvider'
// import { RoutesDataProvider } from './src/contexts/RoutesDataProvider'
import { UserPreferencesDataProvider } from './src/contexts/UserPreferencesDataProvider'
import { GetDataProvider } from './src/contexts/GetDataProvider'
import { CreateProvider } from './src/contexts/CreateProvider'
import { DeleteProvider } from './src/contexts/DeleteProvider'

import Router from './src/routers'
import NetworkErrorModal from './src/components/Modal/NetworkErrorModal'


export default function App() {
  const [isConnected, setIsConnected] = useState()

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'saved-route',
      channelName: 'Saved Route',
      playSound: true,
    })
  }

  useEffect(() => {
    NetInfo.fetch().then(state => setIsConnected(state.isConnected))
  })
  useEffect(() => {
    createChannel()
  }, [])

  if (isConnected === false) {
    return (<NetworkErrorModal />)
  }

  return (
    <NavigationContainer>
      <CreateProvider>
        <DeleteProvider>
          <UserDataProvider>
            <GetDataProvider>
              <UserPreferencesDataProvider>
                <View style={styles.container}>
                  <Router />
                </View>
              </UserPreferencesDataProvider>
            </GetDataProvider>
          </UserDataProvider>
        </DeleteProvider>
      </CreateProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEAEA',
    flex: 1,
  }
})