import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import ConfirmationCode from '../../components/ConfirmationCode'
import LightBlueButton from '../../components/Buttons/LightBlueButton'


const ForgotGetCode = ({ route }) => {

    const { emailInput } = route.params;

    const navigation = useNavigation()

    const [code, setCode] = useState('')

    const [nextClick, setNextClick] = useState(false)

    const handlePressable = () => {
        setNextClick(true)
        if (code.length === 6 && nextClick === true) {
            navigation.navigate('NewPassword', { emailInput, code })
        }
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.formContainer}>

                <ConfirmationCode
                    emailInput={emailInput}
                    code={code} setCode={setCode}
                    nextClick={nextClick} setNextClick={setNextClick} />

                <LightBlueButton handleOnPress={handlePressable} label='Next' />

            </View>
        </View>
    )
}

export default ForgotGetCode

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