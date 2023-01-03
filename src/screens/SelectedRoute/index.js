import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GestureRecognizer from 'react-native-swipe-gestures'

import { API } from 'aws-amplify'
import * as queries from '../../graphql/queries'

import SelectedRouteFullView from '../../components/SelectedRouteFullView'


const SelectedRoute = ({ route }) => {

    const { _departureStation, _arrivalStation } = route.params

    const [routeDepartureResult, setRouteDepartureResult] = useState({})
    const [routeArrivalResult, setRouteArrivalResult] = useState({})

    const [showFullView, setShowFullView] = useState(true)
    const [swipeDirection, setSwipeDirection] = useState('SWIPE_DOWN')

    const onSwipe = (direction, state) => setSwipeDirection(direction)

    console.log('routeDepartureResult', routeDepartureResult)
    console.log('routeArrivalResult', routeArrivalResult)

    // Set initial Region to Johannesburg
    const initialRegion = {
        latitude: -26.195246,
        longitude: 28.034088,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    useEffect(() => {
        if (swipeDirection === 'SWIPE_UP') {
            setShowFullView(true)
        }
        API.graphql({
            query: queries.listRoutes, variables: {
                filter: { id: { eq: _departureStation.routeCheckPoint.routeID } }
            }
        })
            .then((response) => setRouteDepartureResult(response?.data?.listRoutes?.items[0]))
            .catch((error) => console.log(error))
        API.graphql({
            query: queries.listRoutes, variables: {
                filter: { id: { eq: _arrivalStation.routeCheckPoint.routeID } }
            }
        })
            .then((response) => setRouteArrivalResult(response?.data?.listRoutes?.items[0]))
            .catch((error) => console.log(error))
    }, [])

    return (
        <View style={styles.container}>

            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={initialRegion}>
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
                        routeArrivalResult={routeArrivalResult} />
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