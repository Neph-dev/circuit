import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect, useContext, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import GestureRecognizer from 'react-native-swipe-gestures'
import MapViewDirections from 'react-native-maps-directions';

import { API } from 'aws-amplify'
import * as queries from '../../graphql/queries'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'

import SelectedRouteFullView from '../../components/SelectedRouteFullView'
import { GOOGLE_MAPS_KEY } from '../../keys'


const SelectedRoute = ({ route }) => {

    const { _departureStation, _arrivalStation } = route.params

    const { favoriteRoutes, setRefreshFavoriteRoutes } = useContext(UserPreferencesContext)

    const mapRef = useRef()

    const [routeDepartureResult, setRouteDepartureResult] = useState({})
    const [routeArrivalResult, setRouteArrivalResult] = useState({})

    const [showFullView, setShowFullView] = useState(true)
    const [swipeDirection, setSwipeDirection] = useState('SWIPE_DOWN')

    const [isRouteSaved, setIsRouteSaved] = useState()

    const onSwipe = (direction, state) => setSwipeDirection(direction)

    const filterDown = () => {
        favoriteRoutes.filter((item) => {
            if (item.departureRouteDetailsID === _departureStation.id) {
                setIsRouteSaved(true)
            }
        })
    }

    // Set initial Region to Johannesburg
    const initialRegion = {
        latitude: -26.195246,
        longitude: 28.034088,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const markerArray = [
        {
            latitude: parseFloat(_departureStation.routeCheckPoint.checkPointLatitude),
            longitude: parseFloat(_departureStation.routeCheckPoint.checkPointLongitude),
            title: _departureStation.routeCheckPoint.checkPointName,
            description: 'Depart at ' + _departureStation.checkPointDepartureTime,
        },
        {
            latitude: parseFloat(_arrivalStation.routeCheckPoint.checkPointLatitude),
            longitude: parseFloat(_arrivalStation.routeCheckPoint.checkPointLongitude),
            title: _arrivalStation.routeCheckPoint.checkPointName,
            description: 'Arrive at ' + _arrivalStation.checkPointDepartureTime,
        },
    ]

    useEffect(() => {
        if (mapRef.current) {
            // list of _id's must same that has been provided to the identifier props of the Marker
            mapRef.current.fitToSuppliedMarkers(markerArray.map(({ _id }) => _id));
        }
    }, [markerArray]);

    useEffect(() => {
        filterDown()
        if (swipeDirection === 'SWIPE_UP') {
            setShowFullView(true)
        }
        const fetchDeparture = async () => {
            await API.graphql({
                query: queries.listRoutes, variables: {
                    filter: { id: { eq: _departureStation.routeCheckPoint.routeID } }
                }
            })
                .then((response) => setRouteDepartureResult(response?.data?.listRoutes?.items[0]))
                .catch((error) => console.log(error))
        }
        fetchDeparture()

        const fetchArrival = async () => {
            API.graphql({
                query: queries.listRoutes, variables: {
                    filter: { id: { eq: _arrivalStation.routeCheckPoint.routeID } }
                }
            })
                .then((response) => setRouteArrivalResult(response?.data?.listRoutes?.items[0]))
                .catch((error) => console.log(error))
        }
        fetchArrival()
    }, [])

    return (
        <View style={styles.container}>

            <View>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={initialRegion}>
                    {markerArray.map((_marker, index) => (
                        <Marker
                            key={index}
                            // image={{ uri: 'https://i.postimg.cc/j5MFzxpZ/bus-stop-1.png' }}
                            image={{ uri: 'https://i.postimg.cc/d04BfW50/bus-stop-2.png' }}
                            coordinate={{
                                latitude: _marker.latitude,
                                longitude: _marker.longitude
                            }}
                            title={_marker.title}
                            description={_marker.description} />
                    ))}
                    <MapViewDirections
                        origin={{
                            latitude: parseFloat(_departureStation.routeCheckPoint.checkPointLatitude),
                            longitude: parseFloat(_departureStation.routeCheckPoint.checkPointLongitude),
                        }}
                        destination={{
                            latitude: parseFloat(_arrivalStation.routeCheckPoint.checkPointLatitude),
                            longitude: parseFloat(_arrivalStation.routeCheckPoint.checkPointLongitude),
                        }}
                        apikey={GOOGLE_MAPS_KEY}
                        strokeWidth={5}
                        timePrecision="now"
                        strokeColor={'#000000'} />
                </MapView>
            </View>

            {swipeDirection === 'SWIPE_UP' ?
                <View style={styles.bottomFullViewContainer} >
                    <SelectedRouteFullView
                        _departureStation={_departureStation}
                        _arrivalStation={_arrivalStation}
                        setSwipeDirection={setSwipeDirection}
                        showFullView={showFullView}
                        setShowFullView={setShowFullView}
                        routeArrivalResult={routeArrivalResult}
                        isRouteSaved={isRouteSaved}
                        setRefreshFavoriteRoutes={setRefreshFavoriteRoutes} />
                </View>
                :
                <GestureRecognizer
                    style={styles.bottomView}
                    onSwipe={(direction, state) => onSwipe(direction, state)} >

                    <View style={[styles.horizontalLine, { marginTop: 15 }]} />

                </GestureRecognizer>
            }
        </View>
    )
}

export default SelectedRoute

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomView: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        height: 40,
        alignSelf: 'center',
        position: 'absolute',
        width: '80%',
        zIndex: 4,
    },
    bottomFullViewContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        height: '95%',
        position: 'absolute',
        width: '100%',
        zIndex: 4,
    },
    horizontalLine: {
        width: '30%',
        alignSelf: 'center',
        backgroundColor: '#d5d5d5',
        height: 4
    }
})