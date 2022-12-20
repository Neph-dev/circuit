import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Auth } from 'aws-amplify'

import Feather from 'react-native-vector-icons/dist/Feather'

// import EmailorPhoneNumber from '../../components/EmailorPhoneNumber'
import LightBlueButton from '../../components/Buttons/LightBlueButton'


const GetEmailorPhoneNumber = ({ route }) => {

    const { nameInput, surnameInput } = route.params

    const navigation = useNavigation()

    const passwordRef = useRef()

    // const [activeTab, setActiveTab] = useState('email')

    const [emailInput, setEmailInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const [nextClick, setNextClick] = useState(false)

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const signUp = async () => {
        setNextClick(true)
        try {
            if (emailInput.length >= 5 && passwordInput.length >= 8 && nextClick) {
                setHasSubmitted(true)
                const { user } = await Auth.signUp({
                    username: emailInput,
                    password: passwordInput,
                    attributes: {
                        email: emailInput,
                        name: nameInput,
                        family_name: surnameInput,
                        // 'custom:province': provinceInput,
                        // 'custom:city': cityInput
                    },
                });
                setHasSubmitted(false)
                navigation.navigate('SignUpConfirmationCode', { emailInput, passwordInput })
            }
        } catch (error) {
            console.log('error signing up:', error);
            setHasSubmitted(false)
        }
    }

    const onShowPassword = () => setShowPassword(!showPassword)

    return (
        <View style={styles.screenContainer}>
            <View style={styles.formContainer}>

                <View>
                    <Text style={styles.formTitle}>Sign Up!</Text>
                    <Text style={styles.textsm}>You are 1 screens away!</Text>
                </View>

                <View>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>

                        {/* <EmailorPhoneNumber
                            activeTab={activeTab} setActiveTab={setActiveTab}
                            phoneInput={phoneInput} setPhoneInput={setPhoneInput}
                            emailInput={emailInput} setEmailInput={setEmailInput}
                            nextClick={nextClick} setNextClick={setNextClick}
                        /> */}

                        <View style={emailInput.length >= 5 ?
                            styles.inputContainerGreen : styles.inputContainerRed}>
                            <TextInput
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => passwordRef.current.focus()}
                                keyboardType='email-address'
                                placeholder="Enter your email"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={emailInput}
                                maxLength={100}
                                onFocus={() => setFocusEmail(true)}
                                onBlur={() => setFocusEmail(false)}
                                autoCapitalize='none'
                                onChangeText={text => setEmailInput(text.trim())}
                                autoFocus />
                        </View>
                        {
                            emailInput.length < 5 && nextClick ? (
                                <Text style={{ color: 'red', fontSize: 14, marginTop: 5 }}>
                                    Please enter a valid email address.
                                </Text>
                            ) : []
                        }

                        <View style={passwordInput.length >= 10 ?
                            styles.inputContainer : styles.inputContainerRed}>
                            <TextInput
                                placeholder="Enter your new password"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={passwordInput}
                                autoCapitalize='none'
                                onChangeText={text => setPasswordInput(text.trim())}
                                onFocus={() => setFocusPassword(true)}
                                onBlur={() => setFocusPassword(false)}
                                secureTextEntry={showPassword === false ? true : false} />
                            <Feather
                                onPress={onShowPassword}
                                name={showPassword === true ? "eye" : "eye-off"}
                                color={'#333333'}
                                size={25}
                                style={styles.inputIcon} />
                        </View>
                        {
                            passwordInput.length < 8 && nextClick ? (
                                <Text style={{ color: 'red', fontSize: 18, marginTop: 5 }}>
                                    Must contain at least 8 characters.
                                </Text>
                            ) : []
                        }
                        <View style={{ width: '100%', marginTop: 20 }}>
                            <Text style={styles.textsm}>
                                By proceeding, you consent to get calls,
                                WhatsApp or SMS messages, including by automated means,
                                from Matriculate and its affiliates to the number provided.
                            </Text>
                        </View>
                    </View>
                </View>

                <LightBlueButton
                    handleOnPress={signUp}
                    hasPressed={hasSubmitted}
                    label='Next' />

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
        fontSize: 53,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        textTransform: 'uppercase',
        textAlign: 'left',
    },
    textMd: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'normal',
        textAlign: 'left',
        marginLeft: 20,
        marginBottom: 5,
    },
    textsm: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'left',
        marginLeft: 20,
        marginBottom: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',

        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderRadius: 10,
        borderBottomColor: 'red',
        marginTop: 20,
        width: '100%',
        height: 50,
    },
    inputContainerRed: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',

        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderRadius: 10,
        borderBottomColor: 'red',
        marginTop: 20,
        width: '90%',
        height: 50,
    },
    inputContainerGreen: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',

        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderRadius: 10,
        borderBottomColor: 'green',
        marginTop: 20,
        width: '90%',
        height: 50,
    },
    input: {
        color: '#000',
        fontSize: 22,
        width: '90%'
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

    tabElementActive: {
        color: '#efdfbb',
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#efdfbb'
    },
    tabElement: {
        color: '#c5c5c5',
        fontSize: 18,
        fontWeight: 'bold',
        width: 150,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#c5c5c5'
    }
})