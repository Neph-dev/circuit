import { StyleSheet, Pressable, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useNavigation, StackActions } from '@react-navigation/native'

import { Auth } from 'aws-amplify'

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Feather from 'react-native-vector-icons/dist/Feather'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'
import { UserContext } from '../../contexts/UserDataProvider'
import { GetDataContext } from '../../contexts/GetDataProvider'

import PopUpAnimation from '../../components/PopUpAnimation'
import LightBlueButton from '../../components/Buttons/LightBlueButton'


export default function SignIn() {

  const navigation = useNavigation()

  const passwordRef = useRef()

  const { setRefreshUser, setFirstSigningIn } = useContext(UserContext)

  const {
    setRefreshWeatherData,
    setRefreshUserTags,
    setRefreshUserSettings,
    setRefreshDefaultOperator,
    setRefreshFavoriteRoutes,
    setRefreshUserScanHistory,
  } = useContext(UserPreferencesContext)
  const {
    setRefreshOperators,
    setRefreshSectors,
  } = useContext(GetDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorSignin, setErrorSignin] = useState(false)
  const [errorAutomaticSignin, setErrorAutomaticSignin] = useState(false)
  const [errorEmptyInputs, setErrorEmptyInputs] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const [signinError, setSigninError] = useState(false)

  const [focusEmail, setFocusEmail] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const fetchCurrentUser = async () => {
    // If the user is already signed in navigate to the default scrren
    await Auth.currentAuthenticatedUser()
      .then(() => {
        setFirstSigningIn(true)

        setRefreshUser(true)

        setRefreshOperators(true)
        setRefreshSectors(true)
        setRefreshUserScanHistory(true)
        setRefreshUserSettings(true)
        setRefreshWeatherData(true)
        setRefreshUserTags(true)
        setRefreshDefaultOperator(true)
        setRefreshFavoriteRoutes(true)
        navigation.dispatch(StackActions.replace('DefaultScreen'))
      })
      .catch((err) => {
        // this means there is no current authenticated user
        console.log('error signing in', err)
        setErrorAutomaticSignin(true)
        SplashScreen.hide()
      })
  }

  useEffect(() => {
    setFirstSigningIn(false)
    if (errorAutomaticSignin) {
      navigation.dispatch(StackActions.replace('SignIn'))
    }
    fetchCurrentUser()
  }, [])

  const onSignIn = async () => {
    setSigningIn(true)
    if (email !== '' && password !== '' && errorSignin !== true) {
      await Auth.signIn(email, password).then(() => {
        setFirstSigningIn(true)
        setSigningIn(false)

        setRefreshUser(true)

        setRefreshOperators(true)
        setRefreshSectors(true)
        setRefreshUserScanHistory(true)
        setRefreshUserSettings(true)
        setRefreshWeatherData(true)
        setRefreshUserTags(true)
        setRefreshDefaultOperator(true)
        setRefreshFavoriteRoutes(true)

        navigation.dispatch(StackActions.replace('DefaultScreen'))
      })
        .catch(error => {
          setSigninError(error.message)
          setErrorSignin(true)
          setSigningIn(false)
        })

    }
    else {
      setErrorEmptyInputs(true)
      setSigningIn(false)
    }
  }

  if (errorSignin === true) {
    setTimeout(() => { setErrorSignin(false) }, 2000)
  }

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }
  const goToSignUp = () => {
    navigation.navigate('SignUp')
  }

  const onShowPassword = () => setShowPassword(!showPassword)

  return (
    <View style={styles.Container}>

      {errorSignin && <PopUpAnimation message={signinError} />}

      <View style={styles.FormContainer}>
        <Text style={styles.signInText}>Let's sign you in.</Text>
        <Text style={styles.signInTextMd}>Welcome back.</Text>
        <Text style={styles.signInTextMd}>You have been missed!</Text>

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <View
            style={[styles.inputContainer, {
              borderBottomColor: focusEmail === true ? '#5FB3CE' : (errorSignin == true) ?
                'red' : 'green'
            }
            ]}>
            <FontAwesome5
              name="user"
              color={'#333333'}
              size={20}
              style={styles.inputIcon} />
            <TextInput
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="Enter your email"
              placeholderTextColor="#ccc" //D1D6D7
              style={styles.input}
              value={email}
              maxLength={100}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => {
                setErrorEmptyInputs(false)
                setEmail(text.trim().toLowerCase())
                setErrorSignin(false)
              }} />
          </View>
          {errorEmptyInputs && email === '' && (
            <Text style={styles.errorText}>
              This field cannot be empty.
            </Text>
          )}

          <View
            style={[styles.inputContainer, {
              borderBottomColor: focusPassword === true ? '#5FB3CE' : (errorSignin == true) ?
                'red' : 'green'
            }
            ]}>
            <Feather
              name="lock"
              color={'#333333'}
              size={20}
              style={styles.inputIcon} />
            <TextInput
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={onSignIn}
              blurOnSubmit={true}
              placeholder="Password"
              placeholderTextColor="#ccc"//D1D6D7
              style={styles.input}
              name="password"
              value={password}
              maxLength={50}
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
              secureTextEntry={showPassword === false ? true : false}
              autoCapitalize='none'
              onChangeText={(text) => {
                setErrorEmptyInputs(false)
                setPassword(text.trim())
                setErrorSignin(false)
              }} />
            <Feather
              onPress={onShowPassword}
              name={showPassword === true ? "eye" : "eye-off"}
              color={'#333333'}
              size={25}
              style={styles.inputIcon} />
          </View>
          {errorEmptyInputs && password === '' && (
            <Text style={styles.errorText}>
              This field cannot be empty.
            </Text>
          )}

          {/* <View style={styles.error}>
            {errorSignin && (
              <Text style={styles.errorText}>
                Incorrect email or password
              </Text>
            )}
          </View> */}
        </View>

        <Pressable onPress={goToForgotPassword}>
          <Text
            style={styles.label}>
            Password forgotten ?
          </Text>
        </Pressable>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
          <Text style={{ marginRight: 10, fontSize: 16, color: '#ccc' }}>
            Don't have an account?
          </Text>
          <Pressable onPress={goToSignUp}>
            <Text style={{ fontSize: 16, color: '#fff' }}>
              Register
            </Text>
          </Pressable>
        </View>

        <LightBlueButton
          hasPressed={signingIn}
          handleOnPress={onSignIn} label='Sign In' />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#1f2432',
    margin: 'auto',
    justifyContent: 'center',
  },
  FormContainer: {
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  signInText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    marginBottom: 10,
  },
  signInTextMd: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',

    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    height: 50,
  },
  inputIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 10,
    marginLeft: 3,
  },
  input: {
    color: '#000',
    fontSize: 18,
    width: '80%',
  },
  error: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  whitePressable: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },

  label: {
    fontSize: 16,
    color: '#00b9fb',
    marginLeft: 25,
    marginTop: 5
  },
})