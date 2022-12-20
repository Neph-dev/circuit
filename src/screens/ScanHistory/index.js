import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


const ScanHistory = () => {

    const { fetchUserScanHistory, userScanHistory } = useContext(UserPreferencesContext)

    useEffect(() => { fetchUserScanHistory() }, [])

    return (
        <ScrollView style={styles.container}>
            {userScanHistory.map((item, index) => (
                <View key={index} style={styles.elementContainer}>
                    <Text style={styles.elementTitle}>
                        Scan of {item.dateScanned} at {item.timeScanned}
                    </Text>

                    <MaterialIcons name="arrow-forward-ios" color={'#000'} size={15} />
                </View>
            ))}
        </ScrollView>
    )
}

export default ScanHistory

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    elementContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        height: 60,
    },
    elementTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    }
})