import { StyleSheet, Text, View, Pressable, FlatList, Switch } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import LinearGradient from 'react-native-linear-gradient'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


export default function PaymentMethod() {

    const navigation = useNavigation()

    const { paymentMethods } = useContext(UserPreferencesContext)

    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    const onPressToAddCard = () => {
        navigation.navigate('AddCard')
    }

    const renderCard = ({ item }) => (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.cardContainer}>

            <View style={styles.cardInformationContainer}>
                <Text style={styles.cardProviderName}>
                    Visa
                </Text>
                <View style={styles.cardNumberContainer}>
                    <View
                        style={{
                            width: '60%', marginRight: 10, height: 20, backgroundColor: '#fff'
                        }}
                    />
                    <Text style={styles.cardNumberText}>
                        {item.cardNumber.substr(item.cardNumber.length - 4)}
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 10,
                    marginRight: 10,
                }}>
                    <View>
                        <View style={styles.cardDefault}>
                            <Text style={styles.cardDefaultText}>Default</Text>
                            <Switch
                                style={styles.cardSwitch}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled} />
                        </View>
                    </View>
                    <Text style={styles.cardExpiryText}>
                        {item.expiry}
                    </Text>
                </View>
                <Text style={styles.cardNameHolder}>
                    {item.cardHolderName}
                </Text>
            </View>
        </LinearGradient>
    )

    return (
        <View style={styles.paymentMethodContainer}>
            <View>
                <Pressable
                    onPress={onPressToAddCard}
                    style={styles.addContainer}>
                    <MaterialCommunityIcons
                        name="plus-circle-multiple"
                        color='#1f2432'
                        size={45} />
                </Pressable>

                <FlatList
                    data={paymentMethods}
                    renderItem={renderCard} />
            </View>
            {/*
                <View style={styles.successMessage}>
                    <Ionicons
                        name="checkmark-circle"
                        color='#00ff00'
                        size={30} />
                    <Text style={styles.successMessageText}>Card Successfully added</Text>
                </View> 
            */}
        </View>
    )
}

const styles = StyleSheet.create({
    paymentMethodContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    addContainer: {
        background: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
        height: 70,
    },
    cardsTitle: {
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 15,
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
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
    cardNumberText: {
        fontSize: 22,
        color: '#fff'
    },
    cardExpiryText: {
        fontSize: 18,
        color: '#fff',
        marginTop: 20,
        marginLeft: 10,
        textAlign: 'left',
        alignItems: 'center',
    },
    cardDefault: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 60,
    },
    cardDefaultText: {
        color: '#fff',
        fontSize: 18,
    },
    cardSwitch: {
    },
    cardNameHolder: {
        fontSize: 18,
        color: '#fff',
        marginTop: '4%',
        marginLeft: 10,
        textTransform: 'uppercase',
    },

    successMessage: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 20,
        padding: 20,
        width: '80%',
    },
    successMessageText: {
        color: '#66b032',
        fontSize: 18,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})