import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Auth } from 'aws-amplify'

import LightBlueButton from '../../components/Buttons/LightBlueButton'


const NewPassword = ({ route }) => {

    const { emailInput, code } = route.params

    const navigation = useNavigation()

    const [passwordInput, setPasswordInput] = useState('')
    const [passwordInput2, setPasswordInput2] = useState('')

    const [changePasswordError, setChangePasswordError] = useState(false)
    const [shortPasswordError, setShortPasswordError] = useState(false)

    const [changingPassword, setChagingPassword] = useState(false)

    const [nextClick, setNextClick] = useState(false)

    const OnPressToChangePassword = async () => {
        if (passwordInput.length >= 8 && (passwordInput === passwordInput2)) {
            try {
                setChagingPassword(true)
                // Collect confirmation code and new password, then
                await Auth.forgotPasswordSubmit(emailInput, code, passwordInput)
                setChagingPassword(false)
                navigation.navigate('SignIn')
            } catch (error) {
                setChangePasswordError(true)
                setChagingPassword(false)
            }
        }
        else {
            setShortPasswordError(true)
            setChagingPassword(false)
        }
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.formContainer}>

                <View>

                    {changingPassword && (
                        <View style={styles.centeredView}>
                            <ActivityIndicator size="large" />
                        </View>)}

                    <Text style={styles.formTitle}>New Password</Text>

                    <View style={{ alignItems: 'center', marginTop: 30 }}>

                        <View style={passwordInput.length >= 10 ?
                            styles.inputContainerGreen : styles.inputContainerRed}>
                            <TextInput
                                placeholder="Enter your new password"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={passwordInput}
                                secureTextEntry={true}
                                autoCapitalize='none'
                                onChangeText={text => {
                                    setPasswordInput(text.trim())
                                    setShortPasswordError(false)
                                }} />
                        </View>
                        {
                            passwordInput.length < 8 && nextClick ? (
                                <Text style={{ color: 'red', fontSize: 14, marginTop: 5 }}>
                                    Must contain at least 8 characters.
                                </Text>
                            ) : []
                        }
                        <View style={passwordInput.length >= 10 ?
                            styles.inputContainerGreen : styles.inputContainerRed}>
                            <TextInput
                                placeholder="Confirm your new password"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={setPasswordInput2}
                                secureTextEntry={true}
                                autoCapitalize='none'
                                onChangeText={text => setPasswordInput2(text.trim())} />
                        </View>
                        {
                            passwordInput2 !== passwordInput ? (
                                <Text style={{ color: 'red', fontSize: 18, marginTop: 5 }}>
                                    Passwords don't match.
                                </Text>
                            ) : []
                        }
                        {
                            changePasswordError == true ?
                                <Text style={{ color: 'red', fontSize: 18, marginTop: 5 }}>
                                    Invalid verification code provided, please try again.
                                </Text> : []
                        }
                        {
                            shortPasswordError == true ?
                                <Text style={{ color: 'red', fontSize: 18, marginTop: 5 }}>
                                    Must contain at least 8 characters, please try again.
                                </Text> : []
                        }
                    </View>
                </View>

                <LightBlueButton
                    hasPressed={changingPassword}
                    handleOnPress={OnPressToChangePassword} label='Done' />

            </View>
        </View>
    )
}

export default NewPassword

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
        height: 50,
    },
})