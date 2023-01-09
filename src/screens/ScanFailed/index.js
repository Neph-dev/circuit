import { StyleSheet, Text, View, } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/dist/Entypo'

import LightBlueButton from '../../components/Buttons/LightBlueButton'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


export default function ScanFailed({ route }) {

  const navigation = useNavigation()
  const { operatorData, failureReason } = route.params
  const { fetchUserTags, userTags } = useContext(UserPreferencesContext)

  useEffect(() => { fetchUserTags() }, [])

  const onPressToHomeScreen = () => navigation.navigate('Home', { operatorData })

  const date_and_hours = new Date().toLocaleString()

  return (
    <View style={styles.scanFailed}>

      <View style={styles.headerElementContainer} >
        <Text style={styles.headerElement}>{userTags[0].sectorName}</Text>
      </View>

      <View style={{ alignSelf: 'center' }}>
        <Entypo
          name="cross"
          color={'red'}
          size={150} />
      </View>

      <View>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
          <Text style={styles.elementTitle}>Trip Information</Text>
        </View>

        <View style={styles.elementContainer}>
          <Text style={styles.elementTitle}>Operator: </Text>
          <Text style={styles.element}>{operatorData.operatorName}</Text>
        </View>

        <View style={styles.elementContainer}>
          <Text style={styles.elementTitle}>Date and time: </Text>
          <Text style={styles.element}>{date_and_hours}</Text>
        </View>

        <View style={styles.elementContainer}>
          <Text style={styles.elementTitle}>Tip left: </Text>
          <Text style={styles.element}>{userTags[0].numberOfTags}</Text>
        </View>

        {(failureReason !== '') &&
          <View style={styles.elementContainer}>
            <Text style={styles.elementTitle}>Reason: </Text>
            <Text style={styles.element}>{failureReason}</Text>
          </View>
        }
        <LightBlueButton label='Done' handleOnPress={onPressToHomeScreen} />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scanFailed: {
    flex: 1,
    justifyContent: 'space-between'
  },
  headerElementContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerElement: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  elementContainer: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    marginTop: 10
  },
  elementTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  element: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'normal',
  },
})