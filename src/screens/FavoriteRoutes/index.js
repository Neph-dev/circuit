// This screen displays the list of all the routes saved by the user.


import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { API } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { RoutesContext } from '../../contexts/RoutesDataProvider'
import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


export default function FavoriteRoutes({ ...props }) {

  const { routes, routeDetails } = useContext(RoutesContext)
  const { favoriteRoutes, loader, setRefreshFavorite, } = useContext(UserPreferencesContext)

  const navigation = useNavigation()

  const [favoriteRouteID, setFavoriteRouteID] = useState('')

  // Route states
  const [departureRouteName, setDepartureRouteName] = useState('')
  const [arrivalRouteName, setArrivalRouteName] = useState('')
  const [sectorName, setSectorName] = useState('')
  const [routeSectorOperatorID, setRouteSectorOperatorID] = useState('')
  const [originLatitude, setOriginLatitude] = useState('')
  const [originLongitude, setOriginLongitude] = useState('')
  const [destinationLatitude, setDestinationLatitude] = useState('')
  const [destinationLongitude, setDestinationLongitude] = useState('')

  // RouteDetails states
  const [routeDetailsID, setRouteDetailsID] = useState('')
  const [departureBusNumber, setDepartureBusNumber] = useState('')
  const [departureRouteTime, setDepartureRouteTime] = useState('')
  const [connectionBusNumber, setConnectionBusNumber] = useState('')
  const [connectionRouteName, setConnectionRouteName] = useState('')
  const [connectionDepartureTime, setConnectionDepartureTime] = useState('')
  const [arrivalRouteTime, setArrivalRouteTime] = useState('')
  const [routeID, setRouteID] = useState('')
  const [showFullView, setShowFullView] = useState(true)

  const routeData = {
    departureRouteName: departureRouteName,
    arrivalRouteName: arrivalRouteName,
    routeSectorName: sectorName,
    routeSectorOperatorID: routeSectorOperatorID,
    originLatitude: originLatitude,
    originLongitude: originLongitude,
    destinationLatitude: destinationLatitude,
    destinationLongitude: destinationLongitude,
  }

  const routeInfoData = {
    routeDetailsID: routeDetailsID,
    departureBusNumber: departureBusNumber,
    departureRouteTime: departureRouteTime,
    connectionBusNumber: connectionBusNumber,
    connectionRouteName: connectionRouteName,
    connectionDepartureTime: connectionDepartureTime,
    arrivalRouteTime: arrivalRouteTime,
    routeID: routeID,
  }

  const onPressToRouteDetails = () => {
    const routeData = {
      routeID: routeID,
      routeConnectionID: routeID,
      departureRouteName: departureRouteName,
      arrivalRouteName: arrivalRouteName,
      routeSectorOperatorID: routeSectorOperatorID,
      routeSectorName: sectorName,
      originLatitude: originLatitude,
      originLongitude: originLongitude,
      destinationLatitude: destinationLatitude,
      destinationLongitude: destinationLongitude,
    }

    const opreratorInfoData = props.opreratorInfoData
    navigation.navigate('FindRouteAndTime',
      { opreratorInfoData, routeData, showFullView, routeInfoData })
    // navigation.navigate('RouteDetails', { routeInfoData, routeData })
  }

  // Delete a saved route.
  const deleteFavoriteRoute = async () => {
    try {
      const favoriteRouteDetails = { id: favoriteRouteID }

      const deleteFavoriteRoute = await API.graphql({
        query: mutations.deleteFavoriteRoutes,
        variables: { input: favoriteRouteDetails }
      })
      setRefreshFavorite(true)
    }
    catch (error) { console.log(error) }
  }

  return (
    <ScrollView style={styles.screenContainer}>

      <View style={styles.boxContainer}>

        {loader && (<ActivityIndicator size="large" />)}

        <View style={styles.cardsContainer}>

          {favoriteRoutes.map((favoriteRoute, index) => (
            routes?.map((route) => (
              route.id === favoriteRoute.routeID ? (
                routeDetails.map((routeDetails) => (
                  routeDetails.id === favoriteRoute.routeDetailsID ? (
                    <Pressable
                      onPressIn={() => {
                        setDepartureRouteName(route.departureRouteName)
                        setArrivalRouteName(route.arrivalRouteName)
                        setSectorName(route.routeSector.sectorName)
                        setRouteSectorOperatorID(route.routeSector.operatorID)
                        setOriginLatitude(route.originLatitude)
                        setOriginLongitude(route.originLongitude)
                        setOriginLongitude(route.originLongitude)
                        setDestinationLatitude(route.destinationLatitude)
                        setDestinationLongitude(route.destinationLongitude)

                        setRouteDetailsID(routeDetails.id)
                        setDepartureBusNumber(routeDetails.departureBusNumber)
                        setDepartureRouteTime(routeDetails.departureRouteTime)
                        setConnectionBusNumber(routeDetails.connectionBusNumber)
                        setConnectionRouteName(routeDetails.connectionRouteName)
                        setConnectionDepartureTime(routeDetails.connectionDepartureTime)
                        setArrivalRouteTime(routeDetails.arrivalRouteTime)
                        setRouteID(routeDetails.routeID)
                      }}
                      onPressOut={onPressToRouteDetails}
                      style={styles.card} key={index}>

                      <FontAwesome5 name='route' size={60} style={styles.icon} color={'#ccc'} />
                      <Text style={styles.cardTextBold}>
                        {route.departureRouteName} to {route.arrivalRouteName}
                      </Text>
                      <Text style={styles.cardTextBoldSm}>
                        {routeDetails.departureRouteTime} - {routeDetails.arrivalRouteTime}
                      </Text>
                      <Text style={styles.cardTextBoldSm}>
                        {routeDetails.sectorName}
                      </Text>
                      <Pressable
                        onPressIn={() => setFavoriteRouteID(favoriteRoute.id)}
                        style={styles.iconRightBottom} onPress={deleteFavoriteRoute}>
                        <MaterialCommunityIcons
                          name='delete'
                          size={40}
                          color={'red'} />
                      </Pressable>
                    </Pressable>
                  ) : []))
              ) : []
            ))
          ))}

        </View>
      </View>

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  boxContainer: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 'auto',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
    width: '95%',
    paddingTop: 10,
    paddingBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  cardsContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: "100%",
  },

  card: {
    backgroundColor: '#fff',
    width: '90%',
    height: 145,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    marginBottom: 30,
    padding: 5,
  },
  cardTextBold: {
    bottom: 0,
    color: '#000',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 45,
    width: '100%'
  },
  cardTextBoldSm: {
    color: '#c5c5c5',
    fontSize: 18,
    fontWeight: 'normal',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  iconRightBottom: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
})