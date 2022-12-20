import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

import LightBlueButton from '../../components/Buttons/LightBlueButton'


const PersonalInformation = () => {

    const navigation = useNavigation()

    const nameRef = useRef()
    const surnameRef = useRef()

    const [nameInput, setNameInput] = useState('')
    const [surnameInput, setSurnameInput] = useState('')
    const [provinceInput, setProvinceInput] = useState('Gauteng')
    const [cityInput, setCityInput] = useState('Johannesburg')

    const [focusName, setFocusName] = useState(false)
    const [focusSurname, setFocusSurname] = useState(false)

    const [viewProvinceModal, setViewProvinceModal] = useState(false)
    const [viewCityModal, setViewCityModal] = useState(false)

    const [nextClick, setNextClick] = useState(false)

    const handlePressable = () => {
        setNextClick(true)
        if (nameInput.length !== 0, surnameInput.length !== 0) {
            navigation.navigate('GetEmailorPhoneNumber', { nameInput, surnameInput })
        }
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.formContainer}>

                <View>
                    <Text style={styles.formTitle}>Sign Up!</Text>
                    <Text style={styles.textMd}>Join the community and</Text>
                    <Text style={styles.textMd}>Travel the best way possible.</Text>
                    <Text style={styles.textsm}>You are 2 screens away!</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <>
                        <View
                            style={[styles.inputContainer, {
                                borderBottomColor: focusName === true ? '#5FB3CE'
                                    : (nextClick === true && nameInput.length === 0) ?
                                        'red' : 'green'
                            }
                            ]}>
                            <TextInput
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => surnameRef.current.focus()}
                                type='text'
                                placeholder="Enter your first nane"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={nameInput}
                                onFocus={() => setFocusName(true)}
                                onBlur={() => setFocusName(false)}
                                maxLength={100}
                                onChangeText={text => {
                                    setNameInput(text)
                                    setNextClick(false)
                                }}
                                autoFocus />
                        </View>
                        {
                            nameInput.length < 3 && nextClick ? (
                                <Text style={{ color: 'red', fontSize: 16, marginTop: 0 }}>
                                    This field cannot be empty.
                                </Text>
                            ) : []
                        }

                        <View
                            style={[styles.inputContainer, {
                                borderBottomColor: focusSurname === true ? '#5FB3CE'
                                    : (nextClick === true && surnameInput.length === 0) ?
                                        'red' : 'green'
                            }
                            ]}>
                            <TextInput
                                type='text'
                                placeholder="Enter your surname"
                                ref={surnameRef}
                                returnKeyType="done"
                                onSubmitEditing={handlePressable}
                                blurOnSubmit={true}
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={surnameInput}
                                onFocus={() => setFocusSurname(true)}
                                onBlur={() => setFocusSurname(false)}
                                maxLength={100}
                                onChangeText={text => {
                                    setSurnameInput(text)
                                    setNextClick(false)
                                }} />
                        </View>
                        {
                            surnameInput.length === 0 && nextClick ? (
                                <Text style={{ color: 'red', fontSize: 16, marginTop: 0 }}>
                                    This field cannot be empty.
                                </Text>
                            ) : []
                        }
                    </>
                </View>

                <LightBlueButton handleOnPress={handlePressable} label='Next' />

            </View>
        </View>
    )
}

export default PersonalInformation

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#1f2432',
    },
    formContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
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
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        justifyContent: 'space-between',

        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 20,
        width: '90%',
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
    inputContainer: {
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
        width: '100%',
    },
})