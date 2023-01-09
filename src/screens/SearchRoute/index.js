// Read all routes.
// Search for a specific route.


import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GetDataContext } from '../../contexts/GetDataProvider'

import RouteResultDetails from '../../components/RouteResultDetails'
import SearchBar from '../../components/SearchBar'


export default function SearchRoute() {

    const { routeCheckPoint, checkPointDetails } = useContext(GetDataContext)
    const navigation = useNavigation()


    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
        'Saturday']
    let currentDay = dayNames[new Date().getDay()] //Current day
    const [selectedDay, setSelectedDay] = useState(currentDay)

    const [departureLongitude, setDepartureLongitude] = useState()
    const [departureLatitude, setDepartureLatitude] = useState()
    const [departureAddress, setDepartureAddress] = useState()

    const [arrivalLongitude, setArrivalLongitude] = useState()
    const [arrivalLatitude, setArrivalLatitude] = useState()
    const [arrivalAddress, setArrivalAddress] = useState()

    const [departureStationResult, setDepartureStationResult] = useState([])
    const [arrivalStationResult, setArrivalStationResult] = useState([])

    const [minDepartureDistance, setMinDepartureDistance] = useState()
    const [minArrivalDistance, setMinArrivalDistance] = useState()

    const [loadingRoute, setLoadingRoute] = useState(false)

    const walkingSpeed = 5 //* Km/h

    const calculateTimeToReachStation = () => {
        return Math.round((minDepartureDistance / walkingSpeed) * 60)
    }

    const calculateTimeToReachDestination = () => {
        return Math.round((minArrivalDistance / walkingSpeed) * 60)
    }

    const checkDay = (_departureStation) => {
        (_departureStation.routeCheckPoint.checkPointDay).filter((item) => {
            if ((item === 'businessDays' &&
                selectedDay !== 'Saturday' || selectedDay !== 'Sunday'
            )) return true
        })
    }

    return (
        <View>
            <SearchBar
                setDepartureLongitude={setDepartureLongitude}
                setDepartureLatitude={setDepartureLatitude}
                setDepartureAddress={setDepartureAddress}
                departureAddress={departureAddress}
                setArrivalLongitude={setArrivalLongitude}
                setArrivalLatitude={setArrivalLatitude}
                arrivalAddress={arrivalAddress}
                setArrivalAddress={setArrivalAddress}

                departureStationResult={departureStationResult}
                arrivalStationResult={arrivalStationResult}
                routeCheckPoint={routeCheckPoint}
                setDepartureStationResult={setDepartureStationResult}
                setArrivalStationResult={setArrivalStationResult}

                setMinDepartureDistance={setMinDepartureDistance}
                setMinArrivalDistance={setMinArrivalDistance}
                minArrivalDistance={minArrivalDistance}
                setLoadingRoute={setLoadingRoute} />

            {loadingRoute && <ActivityIndicator size="large" color="#1f2432" />}

            {(departureStationResult.length !== 0 && arrivalStationResult.length !== 0) && (
                <>
                    <View style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-around',
                        backgroundColor: '#d5d5d5'
                    }}>
                        {dayNames.map((dayName, index) => (
                            <Pressable
                                onPress={() => setSelectedDay(dayName)}
                                style={{
                                    bakgroundColor: selectedDay === dayName ? '#d3d3d3' : '#1f2432',
                                    padding: 10, borderRadius: 50
                                }}
                                key={index}>
                                <Text style={{
                                    color: selectedDay === dayName ? '#1f2432' : '#fff',
                                    fontSize: 13,
                                }}>{dayName.slice(0, 3)}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <ScrollView style={styles.backgroundList}>
                        {departureStationResult.map((_departureStation) => (
                            arrivalStationResult.map((_arrivalStation, index) => (
                                ((_departureStation.routeCheckPoint.routeID === _arrivalStation.routeCheckPoint.routeID
                                    && _departureStation.checkPointCount < _arrivalStation.checkPointCount
                                    && _departureStation.checkPointNumber === _arrivalStation.checkPointNumber)) ? (
                                    <Pressable
                                        key={index}
                                        onPress={() => navigation.navigate('SelectedRoute', { _departureStation, _arrivalStation })}
                                        style={styles.container}>
                                        <RouteResultDetails
                                            calculateTimeToReachDestination={calculateTimeToReachDestination}
                                            calculateTimeToReachStation={calculateTimeToReachStation}
                                            _departureStation={_departureStation}
                                            _arrivalStation={_arrivalStation} />
                                    </Pressable>
                                )
                                    :
                                    ((_departureStation.routeCheckPoint.routeID !== _arrivalStation.routeCheckPoint.routeID
                                        && _departureStation.checkPointNumber === _arrivalStation.checkPointNumber))
                                        ? (
                                            <Pressable
                                                key={index}
                                                onPress={() => navigation.navigate('SelectedRoute', { _departureStation, _arrivalStation })}
                                                style={styles.container}>
                                                <RouteResultDetails
                                                    calculateTimeToReachDestination={calculateTimeToReachDestination}
                                                    calculateTimeToReachStation={calculateTimeToReachStation}
                                                    _departureStation={_departureStation}
                                                    _arrivalStation={_arrivalStation} />
                                            </Pressable>)
                                        : []
                            ))
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundList: {
        marginTop: 0,
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        // alignItems: 'center',
        height: 'auto',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    container: {
        backgroundColor: '#1f2432',
        flexDirection: 'row',
        marginTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        width: '100%',
    },
})