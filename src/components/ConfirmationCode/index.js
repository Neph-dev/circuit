import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'


const ConfirmationCode = ({ ...props }) => {

    const { emailInput, code, setCode, nextClick, errorConfirmSignUpCode } = props

    return (
        <View>
            <Text style={styles.formTitle}>Enter the code sent to {emailInput}</Text>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <View style={code !== undefined && code.length >= 5 ?
                    styles.inputContainerGreen : styles.inputContainerRed}>
                    <TextInput
                        placeholder="Enter your code"
                        placeholderTextColor="#D1D6D7"
                        style={styles.input}
                        maxLength={6}
                        value={code}
                        keyboardType={"numeric"}
                        onChangeText={text => setCode(text.trim())}
                        autoFocus />
                </View>
                {
                    code.length < 5 && nextClick ? (
                        <Text style={{ color: 'red', fontSize: 18, marginTop: 5 }}>
                            Incorrect code.
                        </Text>
                    ) : []
                }
                {
                    errorConfirmSignUpCode && (
                        <Text style={{ color: 'red', fontSize: 18, marginTop: 5 }}>
                            Incorrect code.
                        </Text>
                    )
                }
            </View>
        </View>
    )
}

export default ConfirmationCode

const styles = StyleSheet.create({
    formTitle: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 40,
        textAlign: 'left',
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
        borderBottomColor: 'red',
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