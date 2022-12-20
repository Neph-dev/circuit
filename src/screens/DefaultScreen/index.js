// This screen displays the list of all operators available on the platform 
// *Then the default choice of the user should be sent to the user's database. 

import { Text, View, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding'

import screensStyles from '../screensStyles'
import { mapBackground } from '../../assets'

import { GetDataContext } from '../../contexts/GetDataProvider'

// Screen components 
// import ChangeMyCityButton from '../../components/Buttons/ChangeMyCityButton'
import Header from '../../components/Header'
import OperatorsList from '../../components/OperatorsList'
// import NetworkErrorModal from '../../components/Modal/NetworkErrorModal'


export default function DefaultScreen() {

    const { operators, loader } = useContext(GetDataContext)

    const [currentUserCity, setCurrentUserCity] = useState('')

    // <NetworkErrorModal />

    const backgroundImage = { uri: mapBackground }

    // Return Operator Based On User City Location
    const checkCity = operators?.filter(async (item) => {
        let latitude
        let longitude

        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        }).then(async (location) => {
            latitude = location.latitude
            longitude = location.longitude

            // Search by geo-location (reverse geo-code)
            await Geocoder.from(latitude, longitude)
                .then(json => {
                    let addressComponent = json.results[4].address_components[1].long_name
                    setCurrentUserCity(addressComponent)
                })
                .catch(error => console.log(error))
        }).catch(error => {
            const { code, message } = error
            console.log("fetching location failed", code, message)
        })
        return item?.cityOperating?.includes(currentUserCity)
    })

    return (
        <View style={screensStyles.screenContainer}>

            {/* Background image */}
            <Image
                source={backgroundImage}
                style={screensStyles.background}
                blurRadius={5} />

            <FlatList
                ListHeaderComponent={
                    <>
                        <Header />

                        <Text style={screensStyles.screenTitle}>
                            Select An Operator
                        </Text>

                        {loader && (<ActivityIndicator size="large" />)}
                    </>
                }
                data={checkCity}
                numColumns={2}
                renderItem={({ item }) =>
                    <View style={screensStyles.cardsContainer}>
                        <OperatorsList operator={item} />
                    </View>
                }
            />
            {/* <ChangeMyCityButton /> */}
        </View>
    )
}