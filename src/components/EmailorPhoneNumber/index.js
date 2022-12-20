import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'


const EmailorPhoneNumber = ({ ...item }) => {

    const {
        setActiveTab,
        activeTab,
        emailInput,
        setEmailInput,
        nextClick,
        phoneInput,
        setPhoneInput
     } = item
    return (
        <View>
            {/* TAB */}
            <View style={styles.tab}>
                <Pressable onPress={() => setActiveTab('email')}>
                    <Text style={activeTab === 'email'
                        ? styles.tabElementActive : styles.tabElement}>
                        Email
                    </Text>
                </Pressable>
                <Pressable onPress={() => setActiveTab('phone')} disabled>
                    <Text style={activeTab === 'phone'
                        ? styles.tabElementActive : styles.tabElement}>
                        Phone Number
                    </Text>
                </Pressable>
            </View>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                {activeTab === 'email' ?
                    <>
                        <View style={emailInput.length >= 5 ?
                            styles.inputContainerGreen : styles.inputContainerRed}>
                            <TextInput
                                type='email'
                                placeholder="Enter your email"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                value={emailInput}
                                maxLength={30}
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
                    </>
                    :
                    <>
                        <View style={emailInput.length >= 10 ?
                            styles.inputContainerGreen : styles.inputContainerRed}>
                            <TextInput
                                placeholder="Enter your phone number"
                                placeholderTextColor="#D1D6D7"
                                style={styles.input}
                                maxLength={10}
                                value={phoneInput}
                                onChangeText={text => setPhoneInput(text.trim())}
                                autoFocus />
                        </View>
                        {
                            phoneInput.length < 10 && nextClick ? (
                                <Text style={{ color: 'red', fontSize: 14, marginTop: 5 }}>
                                    Please enter a valid phone number.
                                </Text>
                            ) : []
                        }
                    </>
                }
            </View>
        </View>
    )
}

export default EmailorPhoneNumber

const styles = StyleSheet.create({
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
        width: '100%',
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
        width: '100%',
        height: 50,
    },
    input: {
        color: '#000',
        fontSize: 20,
        height: 50,
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
    tab: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    tabElementActive: {
        color: '#efdfbb',
        fontSize: 20,
        fontWeight: 'bold',
        width: 150,
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