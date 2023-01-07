// This screen displays the list of all the routes saved by the user.


import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import * as mutations from '../../graphql/mutations'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'
import { GetDataContext } from '../../contexts/GetDataProvider'
import { DeleteContext } from '../../contexts/DeleteProvider'

import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'


const FavoriteRoutes = () => {

  const navigation = useNavigation()

  const { favoriteRoutes, setRefreshFavoriteRoutes } = useContext(UserPreferencesContext)
  const { checkPointDetails } = useContext(GetDataContext)
  const { deleteData, isLoadingDelete } = useContext(DeleteContext)

  const [departureDetails, setDepartureDetails] = useState([])
  const [arrivalDetails, setArrivalDetails] = useState([])

  // Delete a saved route.
  const deleteFavoriteRoute = async (id) => {
    const data = { id: id }
    await deleteData(mutations.deleteUserFavoriteRoute, data)
    setRefreshFavoriteRoutes(true)
  }

  const onGoToRouteDetails = (_departureStation, _arrivalStation) => {
    navigation.navigate('SelectedRoute', { _departureStation, _arrivalStation })
  }

  const filterDeparture = () => {
    favoriteRoutes.filter((item) => {
      checkPointDetails.filter(_checkPointDetails => {
        if (_checkPointDetails?.id?.includes(item.departureRouteDetailsID)) {
          if (!departureDetails.includes(_checkPointDetails.id)) {
            return departureDetails.push(_checkPointDetails)
          }
        }
      })
    })
  }

  const filterArrival = () => {
    favoriteRoutes.filter((item) => {
      checkPointDetails.filter(_checkPointDetails => {
        if (_checkPointDetails?.id?.includes(item.arrivalDetailsRouteID)) {
          if (!arrivalDetails.includes(_checkPointDetails.id)) {
            return arrivalDetails.push(_checkPointDetails)
          }
        }
      })
    })
  }

  useEffect(() => {
    filterDeparture()
    filterArrival()
    setRefreshFavoriteRoutes(true)
  }, [])

  return (
    <ScrollView style={styles.screenContainer}>

      <View style={styles.boxContainer}>

        {isLoadingDelete && <ActivityIndicator size="large" />}

        <View style={styles.cardsContainer}>

          {favoriteRoutes.map((_favoriteRoutes) => (
            departureDetails.map((_departureDetails) => (
              arrivalDetails.map((_arrivalDetails, index) => (
                (_favoriteRoutes.departureRouteDetailsID === _departureDetails.id
                  && _favoriteRoutes.arrivalDetailsRouteID === _arrivalDetails.id) ?
                  <Pressable
                    key={index}
                    onPress={() => onGoToRouteDetails(_departureDetails, _arrivalDetails)}
                    style={styles.card}>

                    <FontAwesome5 name='route' size={60} style={styles.icon} color={'#ccc'} />
                    <Text style={styles.cardTextBold}>
                      {_departureDetails.routeCheckPoint.checkPointName} - {_arrivalDetails.routeCheckPoint.checkPointName}
                    </Text>
                    <Text style={styles.cardTextBoldSm}>
                      {_departureDetails.checkPointDepartureTime} - {_arrivalDetails.checkPointDepartureTime}
                    </Text>
                    {/* <Text style={styles.cardTextBoldSm}>
                      A
                    </Text> */}
                    <Pressable
                      onPress={() => { deleteFavoriteRoute(_favoriteRoutes.id) }}
                      style={styles.iconRightBottom} >
                      <MaterialCommunityIcons
                        name='delete'
                        size={40}
                        color={'red'} />
                    </Pressable>
                  </Pressable>
                  : []
              ))
            ))
          ))}
        </View>
      </View>

    </ScrollView >
  )
}

export default FavoriteRoutes

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
    fontSize: 16,
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