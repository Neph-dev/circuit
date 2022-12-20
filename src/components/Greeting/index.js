import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../contexts/UserDataProvider'
import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


const Greeting = ({ ...props }) => {

    const { currentName } = useContext(UserContext)
    const { userSettings, userTags } = useContext(UserPreferencesContext)

    // Manage date and time.
    let fullDate = new Date()

    const time = fullDate.toLocaleTimeString({ hour: 'numeric', hour12: false, minute: 'numeric' })
    let currentMinutes = fullDate.getMinutes()
    let currentSeconds = fullDate.getSeconds()

    const [minutes, setMinutes] = useState(currentMinutes)
    const [seconds, setSeconds] = useState(currentSeconds)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSeconds((seconds) => seconds + 1)
            setMinutes((minutes) => minutes + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    })

    return (
        <View style={styles.container}>
            <View style={{ width: '50%', alignItems: 'flex-start' }}>
                <Text style={styles.smText}>
                    Hello {currentName},
                </Text>
                <Text style={styles.smBoldText}>
                    {props.operatorName}
                </Text>
            </View>

            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                <Text style={styles.smText}>
                    {time}
                </Text>
                <Text style={styles.smBoldText}>
                    {/* {_userTag?.numberOfTags} Tg / {userSettings?.totalPointsEarned} Mi */}
                    {userTags[0].numberOfTags} Tg / {userSettings?.totalPointsEarned} Mi
                </Text>
            </View>
        </View>
    )
}

export default Greeting

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 5,
        paddingTop: 5,
    },
    smText: {
        color: '#000',
        fontSize: 17,
    },
    smBoldText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#000',
    },
    mdText: {
        color: '#000',
        fontSize: 22,
    },
    mdBoldText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#000',
    },
})