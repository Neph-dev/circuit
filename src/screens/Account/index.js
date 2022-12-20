// Read, and update personal information. 

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
  Image,
} from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { UserContext } from '../../contexts/UserDataProvider'


const Account = () => {

  const navigation = useNavigation()
  const {
    currentName,
    currentFamilyName,
    currentEmail,
    currentUserProvince,
    currentUserCity } = useContext(UserContext)

  const [edit, setEdit] = useState(false)

  const handlePressDone = () => {
    setEdit(false)
    navigation.navigate('Profile')
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.topPressableContainer}>
        {/* <Pressable
          onPress={() => setEdit(true)}
          disabled={edit ? true : false}
          style={styles.topPressable}>
          <Text style={edit ? styles.topPressableLabelDisabled : styles.topPressableLabel}>
            Edit
          </Text>
        </Pressable> */}
        <Pressable
          onPress={handlePressDone}
          style={styles.topPressable}>
          <Text style={styles.topPressableLabel}>
            Done
          </Text>
        </Pressable>
      </View>

      <View style={styles.profilePicture}>
        <Text style={{ fontSize: 22, color: '#000', margin: 'auto', textAlign: 'center', fontWeight: 'bold' }}>
          {currentName.charAt(0)} {currentFamilyName.charAt(0)}
        </Text>
      </View>

      {/* <Pressable style={styles.profilePicturePressable}>
        <Text style={styles.profilePictureLabel}>Change Profile Picture</Text>
      </Pressable> */}

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#D1D6D7"
            style={styles.input}
            value={`${currentName} ${currentFamilyName}`}
            autoCapitalize='none'
            editable={false} selectTextOnFocus={false} />
        </View>

        <View style={styles.inputContainer}>
          <Pressable
            onPressIn={() => setViewProvinceModal(true)}
            style={styles.pickerContainer} disabled={true}>
            <Text style={{ fontSize: 18, color: '#555555' }}>
              {currentUserProvince}
            </Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Pressable
            onPressIn={() => setViewCityModal(true)}
            style={styles.pickerContainer} disabled={true}>
            <Text style={{ fontSize: 18, color: '#555555' }}>
              {currentUserCity}
            </Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#D1D6D7"
            style={styles.input}
            maxLength={100}
            value={currentEmail}
            autoCapitalize='none'
            selectTextOnFocus={edit ? true : false} />
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#D1D6D7"
            style={styles.input}
            maxLength={50}
            secureTextEntry={true}
            autoCapitalize='none' />
        </View> */}
      </View >

    </ScrollView >
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    zIndex: 10
  },
  profilePicture: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 90,
    marginTop: 20,
    width: 100,
    height: 100,
  },
  profilePicturePressable: {
    marginTop: 10,
    marginBottom: 20,
  },
  profilePictureLabel: {
    color: '#0087bd',
    fontSize: 18,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'column',
    paddingRight: 25,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 15,
    width: '90%',
    paddingLeft: 10,
    height: 70,
    justifyContent: 'center'
  },
  inputLabel: {
    fontSize: 16,
    paddingBottom: 70,
    paddingLeft: 10,
    position: 'absolute',
    alignItems: 'center',
    color: '#c5c5c5',
  },
  input: {
    color: '#000000',
    fontSize: 18,
    width: '100%',
  },
  topPressableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 25,
    marginLeft: 25,
    marginTop: 10,
  },
  topPressable: {
  },
  topPressableLabel: {
    color: '#0087bd',
    fontWeight: 'bold',
    fontSize: 20,
    fontWeight: 'normal',
  },
  topPressableLabelDisabled: {
    color: '#ccc',
    fontSize: 22,
    fontWeight: 'normal',
  }
})