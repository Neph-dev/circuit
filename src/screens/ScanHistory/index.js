import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


const ScanHistory = () => {

    const { fetchUserScanHistory, userScanHistory } = useContext(UserPreferencesContext)

    const [scans, setScans] = useState([])

    const filterScan = () => {
        userScanHistory.filter((item) => {
            if (!scans.includes(item.dateScanned)) {
                scans.push(item.dateScanned)
                scans.sort()
                scans.reverse()
            }
        })
    }

    useEffect(() => {
        filterScan()
        fetchUserScanHistory()
    }, [])

    return (
        <ScrollView style={styles.container}>
            {scans.map((_scans, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                    <Text style={styles.title}>On the {_scans}</Text>
                    {userScanHistory?.map((item, index) => (
                        (item.dateScanned === _scans) &&
                        <View key={index}>
                            <View style={styles.elementContainer}>
                                <MaterialCommunityIcons
                                    name='qrcode'
                                    size={25}
                                    color={
                                        item.status === 'success' ? '#49be25'
                                            : item.status === 'failed' ? 'red'
                                                : '#868B8E'} />
                                <Text style={styles.timeStamp}>{item.timeScanned}</Text>
                            </View>
                        </View>
                    ))}
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
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 20,
        paddingTop: 20,
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 25,
    },
    timeStamp: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'normal',
    },
})