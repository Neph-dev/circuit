// Read, and update personal information. 

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
  ActivityIndicator
} from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Auth } from 'aws-amplify'

import Entypo from 'react-native-vector-icons/dist/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/dist/Feather'

import { UserContext } from '../../contexts/UserDataProvider'


const Account = () => {

  const navigation = useNavigation()
  const {
    currentName,
    currentFamilyName,
    currentEmail,
    fetchUserInfo,
    isEmailVerified,
    setIsEmailVerified
  } = useContext(UserContext)

  const [isSending, setIsSending] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [email, setEmail] = useState(currentEmail)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState(undefined)
  const [passwordMessage, setPasswordMessage] = useState(undefined)
  const [verificationCode, setVerificationCode] = useState(undefined)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const fecthUser = async () => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(response => {
        setIsSending(false)
        setIsEmailVerified(response.attributes.email_verified)
      }).catch(err => {
        setIsSending(false)
        console.log(err)
      })
  }

  const onSendCode = async () => {
    setIsSending(true)
    const user = await Auth.currentAuthenticatedUser()
    await Auth.updateUserAttributes(user, { email: email })
      .then(() => {
        fetchUserInfo()
        fecthUser()
        setMessage('A verification code is sent')
        setTimeout(() => {
          setMessage(undefined)
        }, 5000)

      })
      .catch((error) => {
        setIsSending(false)
        console.log(error)
      })
  }

  const onVerifyUserEmail = async () => {
    if (isEmailVerified === false && verificationCode.length !== 0) {
      setIsVerifyingCode(true)
      await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode)
        .then(() => {
          fetchUserInfo()
          fecthUser()
          setIsVerifyingCode(false)
          setMessage('Email successfully verified')
          setTimeout(() => {
            setMessage(undefined)
          }, 4000)
        })
        .catch((e) => {
          setIsVerifyingCode(false)
          console.log('failed with error', e)
        })
    }
    if (isEmailVerified === true) {
      navigation.navigate('Profile')
    }
  }

  const onChangePassword = async () => {
    setIsChangingPassword(true)
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then(() => {
        setIsChangingPassword(false)
        setPasswordMessage('Password successsully changed!')

        setOldPassword('')
        setNewPassword('')

        setTimeout(() => {
          setPasswordMessage(undefined)
        }, 4000)
      })
      .catch((err) => {
        console.log(err)
        setIsChangingPassword(false)
      })
  }

  const onShowNewPassword = () => setShowNewPassword(!showNewPassword)
  const onShowOldPassword = () => setShowOldPassword(!showOldPassword)

  return (
    <ScrollView style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={styles.profilePicture}>
          <Text style={{ fontSize: 22, color: '#000', margin: 'auto', textAlign: 'center', fontWeight: 'bold' }}>
            {currentName.charAt(0)} {currentFamilyName.charAt(0)}
          </Text>
        </View>
        <View>
          <View style={styles.userDetails} >
            <View>
              <Text style={styles.userName}>
                {currentName} {currentFamilyName}
              </Text>
              <Text style={styles.smText}>
                {currentEmail}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.hr} />

      <View style={{ alignItems: 'center' }}>
        <View style={styles.inputContainer}>
          <Entypo
            name='email'
            size={25}
            color={'#D1D6D7'} />
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#D1D6D7"
            style={styles.input}
            maxLength={100}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize='none'
            keyboardType='email-address'
            selectTextOnFocus={true} />
        </View>

        {currentEmail !== email && (
          <View style={{ width: '100%' }}>
            <Pressable
              disabled={isSending === true ? true : false}
              onPress={onSendCode}
              style={styles.sendCodePressable}>
              {isSending === true ?
                <View style={styles.sendCodePressableLabel}>
                  <ActivityIndicator color={"#fff"} size="small" />
                </View>
                :
                <Text style={styles.sendCodePressableLabel}>Send code</Text>}
            </Pressable>
          </View>
        )}

        {(message !== undefined && (isVerifyingCode === false || isSending === false)) && (
          <View style={styles.codeMessageContainer}>
            <MaterialCommunityIcons
              name='check-decagram'
              color='green'
              size={25}
            />
            <Text style={styles.codeMessageText}>
              {message}
            </Text>
          </View>
        )}
        {isEmailVerified === false && (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name='form-textbox-password'
              size={25}
              color={'#D1D6D7'} />
            <TextInput
              placeholder="Enter verification code"
              placeholderTextColor="#D1D6D7"
              style={styles.input}
              maxLength={100}
              value={verificationCode}
              onChangeText={(text) => setVerificationCode(text)}
              autoCapitalize='none'
              selectTextOnFocus={true} />
          </View>
        )}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name='form-textbox-password'
            size={25}
            color={'#D1D6D7'} />
          <TextInput
            placeholder="Old Password"
            placeholderTextColor="#D1D6D7"
            style={styles.input}
            maxLength={100}
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            autoCapitalize='none'
            selectTextOnFocus={true}
            secureTextEntry={showOldPassword === false ? true : false} />
          <Feather
            onPress={onShowOldPassword}
            name={showOldPassword === true ? "eye" : "eye-off"}
            color={'#333333'}
            size={25}
            style={styles.inputIcon} />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name='form-textbox-password'
            size={25}
            color={'#D1D6D7'} />
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#D1D6D7"
            style={styles.input}
            maxLength={100}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            autoCapitalize='none'
            selectTextOnFocus={true}
            secureTextEntry={showNewPassword === false ? true : false} />
          <Feather
            onPress={onShowNewPassword}
            name={showNewPassword === true ? "eye" : "eye-off"}
            color={'#333333'}
            size={25}
            style={styles.inputIcon} />
        </View>

        {(oldPassword.length > 6 && newPassword.length > 6) && (
          <View style={{ width: '100%' }}>
            <Pressable
              disabled={isChangingPassword === true ? true : false}
              onPress={onChangePassword}
              style={[styles.sendCodePressable, { width: '50%' }]}>
              {isChangingPassword === true ?
                <View style={styles.sendCodePressableLabel}>
                  <ActivityIndicator color={"#fff"} size="small" />
                </View>
                :
                <Text style={styles.sendCodePressableLabel}>Change password</Text>}
            </Pressable>
          </View>
        )}
        {(passwordMessage !== undefined) && (
          <View style={styles.codeMessageContainer}>
            <MaterialCommunityIcons
              name='check-decagram'
              color='green'
              size={25}
            />
            <Text style={styles.codeMessageText}>
              {passwordMessage}
            </Text>
          </View>
        )}
      </View >

      <Pressable
        disabled={false}
        onPress={onVerifyUserEmail}
        style={styles.pressable}>
        {isVerifyingCode === true ?
          <View style={styles.pressableLabel}>
            <ActivityIndicator color={"#fff"} size="large" />
          </View>
          :
          <Text style={styles.pressableLabel}>Done</Text>
        }
      </Pressable>

      <Pressable
        disabled={false}
        style={styles.pressableDelete}>
        <MaterialCommunityIcons
          name='delete'
          size={25}
          color={'#868B8E'} />
        <Text style={styles.pressableDeleteLabel}>Delete Account</Text>
      </Pressable>

    </ScrollView >
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userDetails: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  userName: {
    color: '#060D0D',
    fontSize: 22,
    fontWeight: 'bold',
  },
  smText: {
    marginTop: 5,
    fontSize: 18,
    color: '#060D0D',
  },
  hr: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 20,
    marginBottom: 40
  },
  profilePicture: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 100,
    margin: 'auto',
    marginRight: 20,
    marginLeft: 20,
    width: 60,
    height: 60,
  },
  inputContainer: {
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#c5c5c5',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 25,
    width: '90%',
  },
  input: {
    color: '#060D0D',
    fontSize: 18,
    width: '90%'
  },

  codeMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 40,
    marginTop: 10,
    width: '100%',
  },
  codeMessageText: {
    color: 'green',
    fontSize: 18,
  },

  pressable: {
    alignItems: 'center',
    backgroundColor: '#060D0D',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: '80%',
  },
  pressableLabel: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  sendCodePressable: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 15,
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    width: '30%',
  },
  sendCodePressableLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
  },

  pressableDelete: {
    bottom: 0,
    flexDirection: 'row',
    marginTop: '80%',
    marginLeft: 20,
  },
  pressableDeleteLabel: {
    color: '#868B8E',
    fontSize: 16,
  },
})