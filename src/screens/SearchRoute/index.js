// Read all routes.
// Search for a specific route.


import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { GetDataContext } from '../../contexts/GetDataProvider'

import RouteResultDetails from '../../components/RouteResultDetails'
import SearchBar from '../../components/SearchBar'
import DistanceCalculation from '../../components/DistanceCalculation'


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

    const [departureStation, setDepartureStation] = useState()
    const [arrivalStation, setArrivalStation] = useState()

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

                routeCheckPoint={routeCheckPoint} />
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
                    ))
                    }
                </View>
                <View style={styles.backgroundList}>
                    <Pressable
                        onPress={() => navigation.navigate('SelectedRoute')}
                        style={styles.container}>

                        <RouteResultDetails />

                    </Pressable>
                </View>
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundList: {
        marginTop: 0,
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
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