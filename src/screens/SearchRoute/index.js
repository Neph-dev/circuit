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

    // Coodinates of the departure point
    const [latitude1, setLatitude1] = useState()
    const [longitude1, setLongitude1] = useState()

    const [searchBarLabel, setSearchBarLabel] = useState('')

    // in an array, store the the distances calculated
    const [distances, setDistances] = useState([])
    const [arrivalDistances, setArrivalDistances] = useState([])
    const [minDistance, setMinDistance] = useState()
    const [getMinDistanceDep, setGetMinDistanceDep] = useState()
    const [getMinDistanceArr, setGetMinDistanceArr] = useState()

    // call function only if user search a route
    const [searching, setSearching] = useState(false)

    const [depCheckPointCount, setDepCheckPointCount] = useState()
    const [arrCheckPointCount, setArrCheckPointCount] = useState()
    const [depFindRouteDetails, setDepFindRouteDetails] = useState()
    const [arrFindRouteDetails, setArrFindRouteDetails] = useState()

    const [selectedDay, setSelectedDay] = useState(currentDay)

    let minDistanceDep
    let minDistanceArr

    // * Filter through the data accroding to the user search 
    if (searching === true) {
        routeCheckPoint.filter(async (ele) => {
            if (searchBarLabel === 'Departure') {
                // * From the departing coordinates, find the nearest Station
                const distance = DistanceCalculation(latitude1, ele.checkPointLatitude, longitude1, ele.checkPointLongitude)
                distances.push(distance)

                setMinDistance(Math.min.apply(Math, distances))

                // * Find the index of the minimum distance.
                const findIndexEle = distances.findIndex((element) => {
                    return element === Math.min.apply(Math, distances)
                })
                minDistanceDep = routeCheckPoint[findIndexEle]

                setGetMinDistanceDep(routeCheckPoint[findIndexEle])
                setSearching(false)
            }
            if (searchBarLabel === 'Arrival') {
                const distance = DistanceCalculation(latitude1, ele.checkPointLatitude, longitude1, ele.checkPointLongitude)
                arrivalDistances.push(distance)

                setMinDistance(Math.min.apply(Math, arrivalDistances))

                // * Find the index of the minimum distance.
                const findIndex = arrivalDistances.findIndex((element) => {
                    return element === Math.min.apply(Math, arrivalDistances)
                })

                minDistanceArr = routeCheckPoint[findIndex]
                setGetMinDistanceArr(routeCheckPoint[findIndex])
                setSearching(false)
            }
        })
    }

    const filterToDepFindRouteDetails = () => checkPointDetails.filter(element => {
        if (element.routeCheckPointID?.includes(getMinDistanceDep?.id) && depCheckPointCount === undefined) {
            setDepFindRouteDetails(element)
            setDepCheckPointCount(element?.checkPointCount)
        }
    })
    filterToDepFindRouteDetails()

    const filterToArrFindRouteDetails = () => checkPointDetails.filter(element => {
        if ((element.routeCheckPointID?.includes(getMinDistanceArr?.id)
            && element?.checkPointCount > depCheckPointCount) && arrCheckPointCount === undefined) {
            setArrFindRouteDetails(element)
            setArrCheckPointCount(element?.checkPointCount)
        }
    })
    filterToArrFindRouteDetails()

    return (
        <View>
            <SearchBar
                searchBarLabel={searchBarLabel}
                setSearchBarLabel={setSearchBarLabel}
                setDistances={setDistances}
                setSearching={setSearching}
                setLatitude1={setLatitude1}
                setLongitude1={setLongitude1}
                setDepFindRouteDetails={setDepFindRouteDetails}
                setArrFindRouteDetails={setArrFindRouteDetails} />

            {(depFindRouteDetails !== undefined && arrFindRouteDetails !== undefined) &&
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
                            <RouteResultDetails
                                RouteResults={depFindRouteDetails}
                                arrFindRouteDetails={arrFindRouteDetails} />
                        </Pressable>
                    </View>
                </>}
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