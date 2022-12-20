import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

// import Entypo from 'react-native-vector-icons/dist/Entypo'
import {
    DARK_GREY_COLOR, GLOBAL_STYLES,
    LIGHT_GREY_COLOR, PRIMARY_COLOR,
    SECONDARY_COLOR
} from '../../styles/GlobalStyles'


export default function SearchBar({ ...props }) {

    const [showSearchBar, setShowSearchBar] = useState(false)
    const [departureAddress, setDepartureAddress] = useState()
    const [arrivalAddress, setArrivalAddress] = useState()

    const onGoToSearchBar = (label) => {
        props.setSearchBarLabel(label)
        setShowSearchBar(true)
    }

    const TextAbstract = (text, length) => {
        if (text == null) return ""

        if (text.length <= length) return text

        text = text.substring(0, length)
        text = text.substring(0, 35)
        return text + "..."
    }

    return (
        <>
            {showSearchBar && (
                <View style={styles.googlePlacesAutocomplete}>

                    <View style={GLOBAL_STYLES.mediumSpaceSeparator} />

                    <Text style={[styles.inputLabel, { marginLeft: 20, textTransform: 'capitalize' }]}>
                        {props.searchBarLabel} point
                    </Text>
                    <GooglePlacesAutocomplete
                        placeholder={`Enter a ${props.searchBarLabel} address`}
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
                                height: 38,
                                color: DARK_GREY_COLOR,
                                fontSize: 18,
                            },
                            placeholderStyle: {
                                textTransform: 'capitalize',
                                color: LIGHT_GREY_COLOR
                            },
                            description: {
                                color: SECONDARY_COLOR
                            },
                            separator: {
                                height: 0.5,
                                backgroundColor: LIGHT_GREY_COLOR,
                            },
                            row: {
                                backgroundColor: DARK_GREY_COLOR,
                                padding: 13,
                                height: 55,
                                flexDirection: 'row',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                        }}
                        onPress={(data, details = null) => {
                            setShowSearchBar(false)
                            if (props.searchBarLabel === "Departure") {
                                props.setLatitude1(details.geometry.location.lat)
                                props.setLongitude1(details.geometry.location.lng)
                                setDepartureAddress(data.description)
                                props.setSearching(true)
                            }
                            if (props.searchBarLabel === "Arrival") {
                                props.setLatitude1(details.geometry.location.lat)
                                props.setLongitude1(details.geometry.location.lng)
                                setArrivalAddress(data.description)
                                props.setSearching(true)
                            }
                        }}
                        query={{
                            key: 'AIzaSyBuvMNAoZZGDjysSSTgRQho91fWGfuWNVU',
                            language: 'en',
                            components: 'country:za',
                        }}
                    // currentLocation={true}
                    // currentLocationLabel='Current location'
                    />
                </View>
            )}
            {!showSearchBar && (
                <View style={styles.container}>

                    <Pressable onPress={() => onGoToSearchBar('Departure')} style={styles.searchBoxContainer}>
                        <Text style={[styles.departurePlaceholder,
                        { color: departureAddress === undefined ? "#ccc" : '#000' }]}>
                            {departureAddress === undefined ? "Departure" : TextAbstract(departureAddress, 35)}
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => onGoToSearchBar('Arrival')} style={styles.searchBoxContainer}>
                        <Text style={[styles.departurePlaceholder,
                        { color: arrivalAddress === undefined ? "#ccc" : '#000' }]}>
                            {arrivalAddress === undefined ? "Arrival" : TextAbstract(arrivalAddress, 35)}
                        </Text>
                    </Pressable>

                    {/* <View style={styles.currentLocationContainer}>
                    <Entypo
                        name='location-pin'
                        size={30}
                        color={'#ccc'}
                    />
                    <Text style={styles.currentLocationText}>
                        Use Current Location
                    </Text>
                </View> */}
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
    currentLocationContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        marginBottom: 10,
        paddingLeft: 20,
        width: "100%",
    },
    currentLocationText: {
        color: '#000',
        fontSize: 18,
        marginLeft: 5,
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
