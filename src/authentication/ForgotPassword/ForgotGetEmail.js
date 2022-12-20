import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Auth } from 'aws-amplify'

import EmailorPhoneNumber from '../../components/EmailorPhoneNumber'
import LightBlueButton from '../../components/Buttons/LightBlueButton'


const GetEmailorPhoneNumber = () => {

  const navigation = useNavigation()

  const [activeTab, setActiveTab] = useState('email')

  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')

  const [nextClick, setNextClick] = useState(false)

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const goToConfirmWithCode = async () => {
    setNextClick(true)
    try {
      if (emailInput.length >= 5 && nextClick) {
        setHasSubmitted(true)
        // Send confirmation code to user's email
        await Auth.forgotPassword(emailInput)

        setHasSubmitted(false)
        navigation.navigate('ForgotGetCode', { emailInput })
      }
    } catch (error) {
      console.log(error)
      setHasSubmitted(false)
    }
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>

        <View>
          <Text style={styles.formTitle}>Forgot Password</Text>

          <View style={{ alignItems: 'center', marginTop: 30 }}>

            {hasSubmitted && (
              <View style={styles.centeredView}>
                <ActivityIndicator size="large" />
              </View>)}

            <EmailorPhoneNumber
              activeTab={activeTab} setActiveTab={setActiveTab}
              phoneInput={phoneInput} setPhoneInput={setPhoneInput}
              emailInput={emailInput} setEmailInput={setEmailInput}
              nextClick={nextClick} setNextClick={setNextClick}
            />
            <View style={{ width: '80%' }}>
              <Text style={{ marginTop: 25, fontSize: 13, color: '#fff', fontSize: 18 }}>
                By proceeding, you consent to get calls,
                WhatsApp or SMS messages, including by automated means,
                from Matriculate and its affiliates to the number provided.
              </Text>
            </View>
          </View>
        </View>

        <LightBlueButton
          hasPressed={hasSubmitted}
          handleOnPress={goToConfirmWithCode} label='Next' />

      </View>
    </View>
  )
}

export default GetEmailorPhoneNumber

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
})