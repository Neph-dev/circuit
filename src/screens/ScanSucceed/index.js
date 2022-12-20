import { StyleSheet, Text, View, } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import LightBlueButton from '../../components/Buttons/LightBlueButton'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


export default function ScanSucceed({ route }) {

  const navigation = useNavigation()
  const { operatorData } = route.params
  const { fetchUserTags, userTags } = useContext(UserPreferencesContext)

  useEffect(() => { fetchUserTags() }, [])

  const onPressToHomeScreen = () => navigation.navigate('Home', { operatorData })

  const date_and_hours = new Date().toLocaleString()

  return (
    <View style={styles.scanSucceed}>

      <View style={styles.headerElementContainer} >
        <Text style={styles.headerElement}>{userTags[0]?.sectorName}</Text>
      </View>

      <View style={{ alignSelf: 'center' }}>
        <AntDesign
          name="checkcircle"
          color={'green'}
          size={150} />
      </View>

      <View>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
          <Text style={styles.elementTitle}>Trip Information</Text>
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.elementTitle}>Operator: </Text>
          <Text style={styles.element}>{operatorData.operatorName}</Text>
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginTop: 5 }}>
          <Text style={styles.elementTitle}>Date and time: </Text>
          <Text style={styles.element}>{date_and_hours}</Text>
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginTop: 5 }}>
          <Text style={styles.elementTitle}>Tip left: </Text>
          <Text style={styles.element}>{userTags[0].numberOfTags}</Text>
        </View>

        <LightBlueButton label='Done' handleOnPress={onPressToHomeScreen} />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scanSucceed: {
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
    flexDirection: 'row',
    marginTop: 14,
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