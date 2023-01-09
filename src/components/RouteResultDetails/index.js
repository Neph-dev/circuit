import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/dist/Fontisto'


const RouteResultDetails = ({ ...props }) => {

    const {
        _arrivalStation,
        _departureStation,
        calculateTimeToReachStation,
        calculateTimeToReachDestination
    } = props

    return (
        <>
            <View style={{ width: '15%' }}>
                <Text style={styles.boldText}>
                    {_departureStation.checkPointDepartureTime}
                </Text>
                <Text style={styles.boldText}>
                    {_arrivalStation.checkPointDepartureTime}
                </Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.detailsContainer}>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="walk"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>
                        {calculateTimeToReachStation()} min
                    </Text>
                </View>

                <Fontisto
                    style={{ marginLeft: 10 }}
                    name="arrow-right-l"
                    size={20}
                    color={'#d4d4d4'} />

                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="bus"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>35 min</Text>
                </View>

                {/* <MaterialCommunityIcons
                    style={{ marginLeft: 10, marginRight: 10 }}
                    name="transit-transfer"
                    size={30}
                    color={'#d4d4d4'} />

                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="bus"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>20 min</Text>
                </View> */}

                <Fontisto
                    style={{ marginLeft: 10 }}
                    name="arrow-right-l"
                    size={20}
                    color={'#d4d4d4'} />

                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="walk"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>
                        {calculateTimeToReachDestination()} min
                    </Text>
                </View>

                {/* <MaterialCommunityIcons
                    style={{ marginLeft: 10 }}
                    name="star-three-points"
                    size={20}
                    color={'#d4d4d4'} /> */}
            </View>
        </>
    )
}

export default RouteResultDetails

const styles = StyleSheet.create({
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%'
    },
    boldText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    verticalLine: {
        backgroundColor: '#fff',
        height: '100%',
        marginLeft: 10,
        marginRight: 10,
        width: 3,
    }
})