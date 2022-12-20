import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Auth, API } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'
import { RoutesContext } from '../../contexts/RoutesDataProvider'
import { UserContext } from '../../contexts/UserDataProvider'
import { GetDataContext } from '../../contexts/GetDataProvider'

import ConfirmationCode from '../../components/ConfirmationCode'


const SignUpConfirmationCode = ({ route }) => {

  const { emailInput, passwordInput } = route.params

  const { setRefreshUser, setFirstSigningIn } = useContext(UserContext)

  const { setRefreshRoutes, setRefreshRouteDetails } = useContext(RoutesContext)
  const {
    setRefreshWeatherData,
    setRefreshUserTags,
    setRefreshUserSettings,
    setRefreshDefaultOperator,
  } = useContext(UserPreferencesContext)
  const {
    setRefreshOperators,
    setRefreshSectors,
  } = useContext(GetDataContext)

  const email = emailInput
  const password = passwordInput

  const navigation = useNavigation()

  const [code, setCode] = useState('')
  const [errorConfirmSignUpCode, setErrorConfirmSignUpCode] = useState(false)

  const [nextClick, setNextClick] = useState(false)

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const confirmSignUp = async () => {
    setNextClick(true)
    try {
      if (code.length !== '' && nextClick === true) {
        setHasSubmitted(true)
        //Confirm Sign in
        await Auth.confirmSignUp(emailInput, code).then(async () => {
          //SignIn
          await Auth.signIn(email, password).then(async () => {
            // Create user settings
            const createUserSettings = {
              totalPointsEarned: 0,
              totalTrips: 0,
              userCategory: "Blue",
            }
            await API.graphql({
              query: mutations.createUserSettings,
              variables: { input: createUserSettings }
            }).then(() => {
              setHasSubmitted(false)

              setRefreshOperators(true)
              setRefreshSectors(true)

              setRefreshUser(true)

              setRefreshUserSettings(true)
              setRefreshWeatherData(true)
              setRefreshUserTags(true)
              setRefreshDefaultOperator(true)

              setRefreshRoutes(true)
              setRefreshRouteDetails(true)

              setFirstSigningIn(true)
              navigation.navigate('DefaultScreen')
            })
          })
        })
      }
    } catch (error) {
      console.log('error confirming sign up', error)
      setErrorConfirmSignUpCode(true)
      setHasSubmitted(false)
    }
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>

        {hasSubmitted && (
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" />
          </View>)}

        <ConfirmationCode
          code={code}
          errorConfirmSignUpCode={errorConfirmSignUpCode}
          setCode={setCode}
          emailInput={emailInput}
          nextClick={nextClick} setNextClick={setNextClick} />

        <Pressable
          disabled={hasSubmitted ? true : false}
          onPress={confirmSignUp}
          style={styles.pressable} >
          <Text style={styles.pressableLabel}>
            Next
          </Text>
        </Pressable>

      </View>
    </View>
  )
}

export default SignUpConfirmationCode

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1f2432',
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 90,
    width: '100%'
  },
  formTitle: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 40,
    textAlign: 'left',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  inputContainerRed: {
    flexDirection: 'row',
    paddingRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#fe2712',
    marginTop: 20,
    width: '80%',
  },
  inputContainerGreen: {
    flexDirection: 'row',
    paddingRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'green',
    marginTop: 20,
    width: '80%',
  },
  input: {
    color: '#ffffff',
    fontSize: 20,
  },
  pressable: {
    alignItems: 'center',
    backgroundColor: '#0093af',
    borderRadius: 50,
    padding: 10,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
  pressableLabel: {
    color: '#FFFFFF',
    fontSize: 22,
  },
})