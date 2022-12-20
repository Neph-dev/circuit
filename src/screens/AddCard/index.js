// In this screen component, the user add a new credit card
// then store it to the database. 


import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { API } from "aws-amplify"
import * as mutations from '../../graphql/mutations'

import LinearGradient from 'react-native-linear-gradient'

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

import { UserContext } from '../../contexts/UserDataProvider'
import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


export default function AddCard() {

    const { currentUserSub } = useContext(UserContext)
    const { setRefreshPaymentMethods } = useContext(UserPreferencesContext)

    const navigation = useNavigation()

    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const [cardHolderName, setCardHolderName] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // This Function is used to create a new card
    const addNewCard = async () => {
        try {
            setHasSubmitted(true)
            const cardDetails = {
                sub: currentUserSub,
                cardNumber: cardNumber,
                expiry: expiry,
                cvv: cvv,
                cardHolderName: cardHolderName,
            }
            const newCard = await API.graphql({
                query: mutations.createPaymentCardInformation,
                variables: { input: cardDetails }
            })
            setHasSubmitted(false)
            setRefreshPaymentMethods(true)
            navigation.navigate('PaymentMethod')
        }
        catch (error) {
            console.log(error)
            setHasSubmitted(false)
        }
    }

    return (
        <View style={styles.addCardContainer}>

            {hasSubmitted && (
                <View style={styles.centeredView}>
                    <ActivityIndicator size="large" />
                </View>)}

            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.cardContainer}>
                <View style={styles.cardInformationContainer}>
                    <Text style={styles.cardProviderName}>
                        Visa
                    </Text>
                    <View style={styles.cardNumberContainer}>
                        <TextInput
                            placeholder='Enter your card number'
                            onChangeText={text =>
                                setCardNumber(text.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim())
                            }
                            placeholderTextColor="#ccc"
                            maxLength={16}
                            keyboardType={"numeric"}
                            style={styles.textInputLg} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={styles.cardExpiryContainer}>
                            <TextInput
                                placeholder='CVV'
                                onChangeText={text => setCvv(text)}
                                placeholderTextColor="#ccc"
                                maxLength={3}
                                keyboardType={"numeric"}
                                style={styles.textInputSm} />
                        </View>
                        <View style={styles.cardExpiryContainer}>
                            <TextInput
                                placeholder='Expiry date'
                                onChangeText={text => setExpiry(text)}
                                placeholderTextColor="#ccc"
                                maxLength={5}
                                style={styles.textInputSm} />
                        </View>
                    </View>
                    <View style={styles.cardNameHolder}>
                        <TextInput
                            placeholder='CARD HOLDER NAME'
                            onChangeText={text => setCardHolderName(text)}
                            placeholderTextColor="#ccc"
                            maxLength={200}
                            style={styles.textInputMd} />
                    </View>
                </View>
            </LinearGradient>

            <Pressable
                onPress={addNewCard}
                style={styles.saveCardContainer}>
                <Text style={styles.saveCardText}>Save</Text>
                <MaterialIcons
                    name="save-alt"
                    color={'#fff'}
                    size={26} />
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    addCardContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    labelAndInput: {
        flexDirection: 'column',
        marginLeft: 15,
        marginTop: 30,
        width: '100%',
    },
    cardNumberInputContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#2e364b',
        flexDirection: 'row',
        width: '90%',
        paddingLeft: 15,
        paddingRight: 15,
    },
    cardNumberInput: {
        alignItems: 'center',
        fontSize: 18,
        height: 50,
        paddingLeft: 15,
        width: '70%',
    },
    cardDateInput: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#2e364b',
        fontSize: 18,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
    },
    saveCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1f2432',
        borderRadius: 5,
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        width: 'auto',
        padding: 10,
    },
    saveCardText: {
        color: '#ffffff',
        fontSize: 22,
        marginRight: 5,
    },

    cardContainer: {
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        height: 'auto',
        width: '90%',
        paddingBottom: 15,
    },
    cardInformationContainer: {
        flexDirection: 'column',
        width: '100%',
    },
    cardProviderName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
        marginTop: 10,
    },
    cardNumberContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputLg: {
        fontSize: 22,
        color: '#fff',
        justifyContent: 'flex-end',
        width: '80%',
        marginRight: 50,
        textAlign: 'right',
        letterSpacing: 1
    },
    cardExpiryContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 10,
        marginRight: 10,
    },
    textInputSm: {
        fontSize: 18,
        color: '#fff',
        justifyContent: 'flex-end',
        textAlign: 'right',
    },
    textInputMd: {
        fontSize: 18,
        color: '#fff',
        justifyContent: 'flex-start',
        width: '80%',
        textAlign: 'left',
    },
    cardNumberText: {
        fontSize: 22,
        color: '#fff'
    },
    cardNameHolder: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        textTransform: 'uppercase',
    },
})