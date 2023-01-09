import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { API } from 'aws-amplify'
import * as queries from '../../graphql/queries'

import {
    DARK_GREY_COLOR,
    GLOBAL_STYLES,
    LIGHT_GREY_COLOR,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from '../../styles/GlobalStyles'
import DistanceCalculation from '../DistanceCalculation'


export default function SearchBar({ ...props }) {

    const {
        setDepartureLatitude,
        setDepartureLongitude,
        setDepartureAddress,
        setArrivalLatitude,
        setArrivalLongitude,
        setArrivalAddress,
        departureAddress,
        arrivalAddress,

        routeCheckPoint,
        setDepartureStationResult,
        setArrivalStationResult,

        setMinDepartureDistance,
        setMinArrivalDistance,

        setLoadingRoute,
    } = props

    const [showSearchBar, setShowSearchBar] = useState(false)
    const [searchBarLabel, setSearchBarLabel] = useState()

    const [departureDistances, setDepartureDistances] = useState([])
    const [filteredDepartingStation, setFilteredDepartingStation] = useState()
    const [arrivalDistances, setArrivalDistances] = useState([])
    const [filteredArrivalStation, setFilteredArrivalStation] = useState([])

    const TextAbstract = (text, length) => {
        if (text == null) return ""

        if (text.length <= length) return text

        text = text.substring(0, length)
        return text + "..."
    }

    const onShowGooglePlacesAutocomplete = (showBoolean, label) => {
        setShowSearchBar(showBoolean)
        setSearchBarLabel(label)
        // Reset distance array
        if (label === 'Departure') {
            setDepartureDistances([])
        }
        if (label === 'Arrival') {
            setArrivalDistances([])
        }
    }

    const onSelectAddress = async (data, details) => {
        setShowSearchBar(false)
        setSearchBarLabel()
        setLoadingRoute(true)
        if (searchBarLabel === 'Departure') {
            setDepartureLatitude(details.geometry.location.lat)
            setDepartureLongitude(details.geometry.location.lng)
            setDepartureAddress(data.description)

            routeCheckPoint.filter(async (ele) => {
                // * From the departing coordinates, find the nearest Station
                const distance = DistanceCalculation(
                    details.geometry.location.lat,
                    ele.checkPointLatitude,
                    details.geometry.location.lng,
                    ele.checkPointLongitude
                )
                departureDistances.push(distance)
                // * Find the index of the minimum distance.
                const findIndexEle = departureDistances.findIndex((element) => {
                    return element === Math.min.apply(Math, departureDistances)
                })
                routeCheckPoint[findIndexEle]

                setMinDepartureDistance(Math.min.apply(Math, departureDistances))

                await API.graphql({
                    query: queries.listRouteCheckPoints, variables: {
                        filter: {
                            checkPointName: { eq: routeCheckPoint[findIndexEle].checkPointName }
                        }
                    }
                })
                    .then((response) => {
                        setFilteredDepartingStation(response?.data?.listRouteCheckPoints?.items)
                        fetchDetails(filteredArrivalStation)
                    })
                    .catch((error) => console.log(error))
            })
        }
        else if (searchBarLabel === 'Arrival') {
            setArrivalLatitude(details.geometry.location.lat)
            setArrivalLongitude(details.geometry.location.lng)
            setArrivalAddress(data.description)

            routeCheckPoint.filter(async (ele) => {
                // * From the arrival coordinates, find the nearest Station
                const distance = DistanceCalculation(
                    details.geometry.location.lat,
                    ele.checkPointLatitude,
                    details.geometry.location.lng,
                    ele.checkPointLongitude
                )
                arrivalDistances.push(distance)
                // * Find the index of the minimum distance.
                const findIndexEle = arrivalDistances.findIndex((element) => {
                    return element === Math.min.apply(Math, arrivalDistances)
                })
                routeCheckPoint[findIndexEle]

                setMinArrivalDistance(Math.min.apply(Math, arrivalDistances))

                await API.graphql({
                    query: queries.listRouteCheckPoints, variables: {
                        filter: { id: { eq: routeCheckPoint[findIndexEle].id } }
                    }
                })
                    .then(response => {
                        setFilteredArrivalStation(response.data.listRouteCheckPoints.items)
                        fetchDetails(response.data.listRouteCheckPoints.items)
                    })
                    .catch((error) => console.log(error))
            })
        }
    }

    const fetchDetails = (filteredArrivalStation) => {
        if (filteredArrivalStation !== undefined && filteredDepartingStation !== undefined) {
            filteredDepartingStation.filter((_departingStation) => {
                filteredArrivalStation.filter((_arrivalStation) => {
                    if (_arrivalStation.routeID === _departingStation.routeID) {
                        API.graphql({
                            query: queries.listCheckPointDetailss, variables: {
                                filter: { routeCheckPointID: { eq: _departingStation.id } }
                            }
                        })
                            .then((response) => setDepartureStationResult(response.data.listCheckPointDetailss.items))
                            .catch((error) => console.log(error))

                        API.graphql({
                            query: queries.listCheckPointDetailss, variables: {
                                filter: { routeCheckPointID: { eq: _arrivalStation.id } }
                            }
                        })
                            .then((response) => setArrivalStationResult(response.data.listCheckPointDetailss.items))
                            .catch((error) => console.log(error))
                    }
                    if (_arrivalStation.routeID !== _departingStation.routeID) {
                        API.graphql({
                            query: queries.listCheckPointDetailss, variables: {
                                filter: { routeCheckPointID: { eq: _departingStation.id } }
                            }
                        })
                            .then((response) => setDepartureStationResult(response?.data?.listCheckPointDetailss?.items))
                            .catch((error) => console.log(error))
                        API.graphql({
                            query: queries.listCheckPointDetailss, variables: {
                                filter: { routeCheckPointID: { eq: _arrivalStation.id } }
                            }
                        })
                            .then((response) => setArrivalStationResult(response?.data?.listCheckPointDetailss?.items))
                            .catch((error) => console.log(error))
                    }
                    setLoadingRoute(false)
                })
            })
        }
    }

    return (
        <>
            {showSearchBar && (
                <View style={styles.googlePlacesAutocomplete}>

                    <View style={GLOBAL_STYLES.mediumSpaceSeparator} />

                    <Text style={[styles.inputLabel, { marginLeft: 20, textTransform: 'capitalize' }]}>
                        {searchBarLabel} Address
                    </Text>
                    <GooglePlacesAutocomplete
                        autoFocus={true}
                        returnKeyType={'default'}
                        fetchDetails={true}
                        multiline={true}
                        numberOfLines={1}
                        styles={{
                            container: {
                                flex: 1
                            },
                            textInputContainer: {
                                borderColor: PRIMARY_COLOR,
                                borderRadius: 5,
                                borderWidth: 1.5,
                            },
                            textInput: {
                                paddingTop: 5,
                                paddingBottom: 5,
                                color: DARK_GREY_COLOR,
                                fontSize: 18,
                            },
                            placeholderStyle: {
                                textTransform: 'capitalize',
                                color: LIGHT_GREY_COLOR
                            },
                            description: {
                                color: DARK_GREY_COLOR,
                                fontSize: 14
                            },
                            separator: {
                                height: 0.5,
                                backgroundColor: LIGHT_GREY_COLOR,
                            },
                            row: {
                                backgroundColor: SECONDARY_COLOR,
                                padding: 13,
                                height: 55,
                                flexDirection: 'row',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                        onPress={(data, details = null) => onSelectAddress(data, details)}
                        query={{
                            key: 'AIzaSyBuvMNAoZZGDjysSSTgRQho91fWGfuWNVU',
                            language: 'en',
                            components: 'country:za',
                        }}
                    />
                </View>
            )}
            {!showSearchBar && (
                <View style={styles.container}>
                    <Pressable
                        onPress={() => onShowGooglePlacesAutocomplete(true, 'Departure')}
                        style={styles.searchBoxContainer}>
                        <Text style={[styles.departurePlaceholder, {
                            color: departureAddress !== undefined ? '#000' : '#ccc'
                        }]}>
                            {departureAddress !== undefined ? TextAbstract(departureAddress, 35) : 'Departure'}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onShowGooglePlacesAutocomplete(true, 'Arrival')}
                        style={styles.searchBoxContainer}>
                        <Text style={[styles.departurePlaceholder, {
                            color: arrivalAddress !== undefined ? '#000' : '#ccc'
                        }]}>
                            {arrivalAddress !== undefined ? TextAbstract(arrivalAddress, 35) : 'Arrival'}
                        </Text>
                    </Pressable>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 20,
        padding: 20,
        backgroundColor: '#1f2432',//2e364b
    },
    searchBoxContainer: {
        width: "95%",
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 45,
        marginBottom: 10,
        borderRadius: 10
    },
    departurePlaceholder: {
        alignItems: 'center',
        fontSize: 16,
        marginBottom: 'auto',
        marginTop: 'auto',
        paddingLeft: 10,
        width: '100%',
    },

    googlePlacesAutocomplete: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        height: '100%',
        zIndex: 5,
        width: '100%',
    },
    fromToInput: {
        backgroundColor: '#fff',
        width: '90%',
        color: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        borderRadius: 25,
    },
    inputLabel: {
        fontSize: 12,
        color: '#000',
        backgroundColor: '#fff',
        position: 'absolute',
        top: 10,
        left: 5,
        zIndex: 3,
    },

})
