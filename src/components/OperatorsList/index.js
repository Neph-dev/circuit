import { Image, Pressable, StyleSheet } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'

import { API } from "aws-amplify"
import * as mutations from '../../graphql/mutations'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'
import { UserContext } from '../../contexts/UserDataProvider'

import DefaultScreenModal from '../Modal/DefaultScreenModal'


export default function OperatorsList({ ...props }) {

    const { operator } = props

    // Receive data from 'DefaultScreen'
    const operatorData = {
        operatorID: operator?.id,
        operatorName: operator?.operatorName,
        operatorOfficialLogo: operator?.operatorOfficialLogo,
        cityOperating: operator?.cityOperating,
    }
    const navigation = useNavigation()
    const {
        defaultOperator, setRefreshWeatherData,
        defaultOperatorID, setRefreshDefaultOperator,
        fetchDefaultOperator } = useContext(UserPreferencesContext)
    const { firstSigningIn } = useContext(UserContext)

    const [operatorName, setOperatorName] = useState('')
    const [viewModal, setViewModal] = useState(false)

    useEffect(() => {
        fetchDefaultOperator(operatorData)
        setRefreshWeatherData(true)
        if (firstSigningIn === false) {
            SplashScreen.hide()
            navigation.navigate('DefaultScreen')
        }
    }, [])

    const handlePressInToNextScreen = () => setOperatorName(operatorData.operatorName)

    const handlePressOutToNextScreen = () => {
        if (operatorData.operatorID === defaultOperator.operatorID) {
            navigation.navigate('HomeBottomNav', { operatorData })
        }
        else { setViewModal(true) }
    }

    const onSetDefaultOperator = async () => {
        if (defaultOperator === undefined) {
            const data = {
                operatorID: operatorData.operatorID,
                name: operatorData.operatorName
            }
            await API.graphql({
                query: mutations.createUserDefaultOperator,
                variables: { input: data }
            })
            setRefreshDefaultOperator(true)
        }
        else {
            const operatorData = {
                id: defaultOperator.id,
                operatorID: operatorData.operatorID,
                name: operatorData.operatorName,
            }
            await API.graphql({
                query: mutations.updateUserDefaultOperator,
                variables: { input: operatorData }
            })
            setRefreshDefaultOperator(true)
        }
    }

    const handleSetDefault = async () => {
        setViewModal(false)
        onSetDefaultOperator()
        navigation.navigate('HomeBottomNav', { operatorData })
    }
    const handleContinueToHome = () => {
        setViewModal(false)
        navigation.navigate('HomeBottomNav', { operatorData })
    }

    return (
        <>
            {viewModal && <DefaultScreenModal
                viewModal={viewModal}
                setViewModal={setViewModal}
                operatorName={operatorData.operatorName}
                handleSetDefault={handleSetDefault}
                handleContinueToHome={handleContinueToHome} />}

            <Pressable
                style={styles.card}
                onPressIn={handlePressInToNextScreen}
                onPressOut={handlePressOutToNextScreen}>
                <Image
                    source={{ uri: operatorData.operatorOfficialLogo }}
                    style={styles.operatorLogo} />
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: '85%',
        height: 190,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 20,
        marginBottom: "10%",
    },
    strikeLabel: {
        fontSize: 15,
        bottom: 20,
        width: 100,
        textAlign: 'center',
        right: 0,
        backgroundColor: 'red',
        color: '#fff',
        position: 'absolute',
    },
    operatorLogo: {
        width: "90%",
        height: "90%",
    }
})
