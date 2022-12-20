// Using the QRCodeScanner library to read and
// validate the QR Code information.

// The QR Code information must represent the Id 
// of an existing Sector.

// If conditions are met update the amount of 
// tags and redirect to success screen.

// Otherwise redirect to the error screen.


import { AppRegistry, StyleSheet, Platform, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'

import { API } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'
import { GetDataContext } from '../../contexts/GetDataProvider'


export default function Camera({ route }) {

  const navigation = useNavigation()
  const { operatorData } = route.params
  const {
    fetchUserSettings, userTags, fetchUserTags, userSettings,
  } = useContext(UserPreferencesContext)
  const { sectors } = useContext(GetDataContext)

  const [sectorId, setSectorId] = useState()
  const [scannedQR, setScannedQR] = useState('')

  const filterToFindAllSector = () => {
    sectors.filter((_item) => {
      if (_item.sectorName === "All") {
        setSectorId(_item.id)
      }
    })
  }
  useEffect(() => { filterToFindAllSector() })

  const onScan = async (e) => {

    const updateData = {
      id: userTags[0].id,
      numberOfTags: (Number(userTags[0].numberOfTags) - 1),
      expiryDate: userTags[0].expiryDate,
      expiryTime: userTags[0].expiryTime,
      operatorID: userTags[0].operatorID,
      sectorID: userTags[0].sectorID,
    }

    const updateUserSettingsData = {
      id: userSettings.id,
      totalPointsEarned: Number(userSettings.totalPointsEarned) + 2,
      totalTrips: Number(userSettings.totalTrips) + 1,
      userCategory: userSettings.totalPointsEarned + 2 <= 1999 ? 'Blue'
        : userSettings.totalPointsEarned + 2 >= 2000 && userSettings.totalPointsEarned <= 9999
          ? 'Gold' : 'Platinum'
    }

    let fullDate = new Date()
    let currentDate = new Date().toLocaleDateString()

    let currentTime = fullDate.toLocaleTimeString({ hour: 'numeric', hour12: false, minute: 'numeric' })

    if (userTags[0].numberOfTags > 0 &&
      (userTags[0].sectorID === e.data || userTags[0].sectorID === sectorId)) {

      await API.graphql({ query: mutations.updateUserTags, variables: { input: updateData } })
        .then(async (response) => {

          const userScanHistoryDataSuccess = {
            dateScanned: String(currentDate),
            timeScanned: String(currentTime),
            idScanned: e.data,
            status: 'success',
            numberOfTagsDebited: 1,
          }

          await API.graphql({ query: mutations.updateUserSettings, variables: { input: updateUserSettingsData } })
            .then(() => {
              API.graphql({ query: mutations.createUserScanHistory, variables: { input: userScanHistoryDataSuccess } })

              fetchUserTags()
              fetchUserSettings()
            })


          setScannedQR('succeed')
          navigation.navigate('ScanSucceed', { operatorData })

        }).catch((error) => console.log(error))
    }
    else {

      const userScanHistoryDataFailed = {
        dateScanned: String(currentDate),
        timeScanned: String(currentTime),
        idScanned: e.data,
        status: 'failed',
        numberOfTagsDebited: 0,
      }
      API.graphql({ query: mutations.createUserScanHistory, variables: { input: userScanHistoryDataFailed } })

      setScannedQR('failed')
      navigation.navigate('ScanFailed', { operatorData })
    }
  }

  let checkAndroidPermission = true
  if (Platform.OS === 'android' && Platform.Version < 23) checkAndroidPermission = false

  return (
    <View style={styles.qrScreenContainer}>
      <QRCodeScanner
        onRead={onScan}
        reactivateTimeout={6000}
        reactivate={true}
        cameraTimeout={0}
        checkAndroid6Permissions={checkAndroidPermission}
        cameraProps={{ captureAudio: false }}
        showMarker={true}
        markerStyle={{
          borderColor: scannedQR === 'succeed' ? '#9acd32'
            : scannedQR === 'failed' ? 'red' : 'white'
        }}
        cameraType={'back'} />
    </View>
  )
}

const styles = StyleSheet.create({
  qrScreenContainer: {
    flex: 1,
  }
})

AppRegistry.registerComponent('default', () => Camera)