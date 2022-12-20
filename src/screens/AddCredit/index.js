// Add tags for a specifique route and operator.


import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'

import dayjs from 'dayjs'

import { API } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'
import { GetDataContext } from '../../contexts/GetDataProvider'

import ErrorModalView from '../../components/Modal/ErrorModalView'
import LightBlueButton from '../../components/Buttons/LightBlueButton'
import NetworkErrorModal from '../../components/Modal/NetworkErrorModal'


export default function AddCredit({ route }) {

  const navigation = useNavigation()

  const { operatorData } = route.params
  const { sectors, tagsInfo } = useContext(GetDataContext)
  const { userTags, fetchUserTags } = useContext(UserPreferencesContext)

  const [sectorSelected, setSectorSelected] = useState('Select')
  const [sectorSelectedName, setSectorSelectedName] = useState('')
  const [isFocusOnSector, setIsFocusOnSector] = useState(false)

  const [tagsSelected, setTagsSelected] = useState('Select')
  const [numberOfTags, setNumberOfTags] = useState('')
  const [price, setPrice] = useState('')
  const [durationToExpiryInDays, setDurationToExpiryInDays] = useState('')
  const [isFocusOnTags, setIsFocusOnTags] = useState(false)

  const [hasPressed, setHasPressed] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    if (userTags[0]?.numberOfTags > 0) setModalVisible(true)
  }, [])

  const filteredData = tagsInfo.filter((_info) => {
    if (_info?.sectorsValidity?.includes(sectorSelected)) return true
    else return false
  })

  // Manage expiry date and time
  const dt = dayjs()
  let expiryDate = dt.add(parseInt(durationToExpiryInDays), "day").format("DD-MM-YY")
  let fullDate = new Date()
  const expiryTime = fullDate.toLocaleTimeString({ hour: 'numeric', hour12: false, minute: 'numeric' })

  const onBuyTags = async () => {
    const data = {
      id: userTags[0].id,
      numberOfTags: numberOfTags + userTags[0]?.numberOfTags,
      expiryDate: expiryDate,
      expiryTime: expiryTime,
      operatorID: operatorData.operatorID,
      sectorID: sectorSelected,
    }
    setHasPressed(true)
    if (userTags[0]?.numberOfTags > 0) {
      setModalVisible(true)
      setHasPressed(false)
    }
    else {
      await API.graphql({ query: mutations.updateUserTags, variables: { input: data } })
        .then(() => {
          fetchUserTags()
          setHasPressed(true)
          navigation.navigate('ManageCredit', { operatorData })
        })
        .catch(err => {
          setHasPressed(true)
          const output = Object.assign({}, ...err.errors)

          if (output.message == 'Network Error') {
            setHasPressed(false)
            setNetworkError(true)
          }
        })
    }
  }

  if (networkError === true) {
    return (<NetworkErrorModal />)
  }

  return (
    <View style={styles.addCreditContainer}>

      <ErrorModalView modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={styles.boxContainer}>
        <View>

          <View style={{ width: '100%', height: 20 }} />

          <Text style={{ color: '#1f2432', fontSize: 14, alignSelf: 'center' }}>
            *This will be applied to {operatorData.operatorName} only.
          </Text>

          <View style={{ width: '100%', height: 30 }} />

          <View style={[styles.dropdownContainer, {
            borderColor: (isFocusOnSector || sectorSelected !== 'Select')
              ? '#1f2432' : '#ccc'
          }]} >
            <Text style={[styles.dropdownLabel, {
              color: (isFocusOnSector || sectorSelected !== 'Select')
                ? '#1f2432' : '#ccc'
            }]}> Sectors </Text>
            <SelectDropdown
              data={sectors}

              onFocus={() => setIsFocusOnSector(true)}
              onBlur={() => setIsFocusOnSector(false)}

              defaultButtonText={sectorSelected}
              buttonStyle={styles.selectDropdown}

              renderDropdownIcon={() => <MaterialIcons
                name='arrow-drop-down'
                color={"#1f2432"}
                size={30} />}
              dropdownIconPosition='right'

              buttonTextStyle={{
                textAlign: 'left', color: isFocusOnSector ? '#ccc' : '#1f2432'
              }}
              selectedRowTextStyle={styles.selectedRowTextStyle}
              rowTextStyle={styles.rowTextStyle}
              rowTextForSelection={(selectedItem, index) =>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Sector {selectedItem.sectorName}</Text>
                </View>}

              buttonTextAfterSelection={(selectedItem, index) =>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>Sector {selectedItem.sectorName}</Text>
                </View>}
              onSelect={(selectedItem) => {
                setSectorSelected(selectedItem?.id)
                setSectorSelectedName(selectedItem?.sectorName)
              }} />
          </View>

          <View style={{ width: '100%', height: 30 }} />

          <View style={[styles.dropdownContainer, {
            borderColor: (isFocusOnTags || tagsSelected !== 'Select') ? '#1f2432' : '#ccc'
          }]} >
            <Text style={[styles.dropdownLabel, {
              color: (isFocusOnTags || tagsSelected !== 'Select') ? '#1f2432' : '#ccc'
            }]}> Number Of Tags </Text>
            <SelectDropdown
              disabled={filteredData.length === 0 ? true : false}
              data={tagsInfo}

              onFocus={() => setIsFocusOnTags(true)}
              onBlur={() => setIsFocusOnTags(false)}

              defaultButtonText={tagsSelected}
              buttonStyle={styles.selectDropdown}

              renderDropdownIcon={() => <MaterialIcons
                name='arrow-drop-down'
                color={"#1f2432"}
                size={30} />}
              dropdownIconPosition='right'

              buttonTextStyle={{
                textAlign: 'left',
                color: (isFocusOnTags || filteredData.length !== 0) ? '#1f2432' : '#ccc'
              }}
              selectedRowTextStyle={styles.selectedRowTextStyle}
              rowTextStyle={styles.rowTextStyle}
              rowTextForSelection={(selectedItem, index) =>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>{selectedItem.numberOfTags} Tags</Text>
                  <Text style={{ color: '#000' }}> - </Text>
                  <Text style={{ color: '#000' }}>{selectedItem.durationToExpiryInDays === 1
                    ? `24 Hours` : `${selectedItem.durationToExpiryInDays} Days`}</Text>
                  <Text style={{ color: '#000' }}> - </Text>
                  <Text style={{ color: '#000' }}>R {selectedItem.price}</Text>
                </View>}

              buttonTextAfterSelection={(selectedItem, index) =>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000' }}>{selectedItem.numberOfTags} Tags</Text>
                  <Text style={{ color: '#000' }}> - </Text>
                  <Text style={{ color: '#000' }}>{selectedItem.durationToExpiryInDays === 1
                    ? `24 Hours` : `${selectedItem.durationToExpiryInDays} Days`}</Text>
                  <Text style={{ color: '#000' }}> - </Text>
                  <Text style={{ color: '#000' }}>R {selectedItem.price}</Text>
                </View>}
              onSelect={(selectedItem) => {
                setNumberOfTags(selectedItem?.numberOfTags)
                setPrice(selectedItem?.price)
                setDurationToExpiryInDays(selectedItem?.durationToExpiryInDays)
                setTagsSelected(selectedItem?.id)
              }} />
          </View>

          <View style={{ width: '100%', height: 30 }} />
          {tagsSelected !== 'Select' ?
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                Details
              </Text>
              <View style={{ width: '100%', height: 10 }} />

              <Text style={{ color: '#000', fontSize: 15, fontWeight: 'normal' }}>
                Sector: <Text style={{ color: '#000', fontWeight: 'bold' }}>
                  {sectorSelectedName}</Text>
              </Text>
              <View style={{ width: '100%', height: 10 }} />

              <Text style={{ color: '#000', fontSize: 15, fontWeight: 'normal' }}>
                Number of tags: <Text style={{ color: '#000', fontWeight: 'bold' }}>
                  {numberOfTags}</Text>
              </Text>
              <View style={{ width: '100%', height: 10 }} />

              <Text style={{ color: '#000', fontSize: 15, fontWeight: 'normal' }}>
                Expire in <Text style={{ color: '#000', fontWeight: 'bold' }}>
                  {durationToExpiryInDays === 1 ? "24 Hours" : `${durationToExpiryInDays} Days`}</Text>
              </Text>
              <View style={{ width: '100%', height: 10 }} />

              <Text style={{ color: '#000', fontSize: 15, fontWeight: 'normal' }}>
                Price: <Text style={{ color: '#000', fontWeight: 'bold' }}>R {price}</Text>
              </Text>
            </View> : []
          }
        </View>
        {tagsSelected !== 'Select' ?
          <LightBlueButton
            handleOnPress={onBuyTags}
            hasPressed={hasPressed}
            label='Buy' />
          : []}
        <View style={{ width: '100%', height: 50 }} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  addCreditContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  hr: {
    marginTop: 'auto',
    marginBottom: 'auto',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  boxContainer: {
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    justifyContent: 'space-between',
  },

  dropdownContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
  },
  dropdownLabel: {
    fontSize: 12,
    color: '#000',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 43,
    left: 5
  },
  selectDropdown: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    width: '100%',
    borderColor: 'transparent',
  },
  selectedRowTextStyle: {
    color: '#1f2432',
  },
  rowTextStyle: {
    color: '#242124',
    textAlign: 'left',
    paddingLeft: 10,
  }
})