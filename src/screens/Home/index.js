import { StyleSheet, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { mapBackground } from '../../assets'
import screensStyles from '../screensStyles'

import Header from '../../components/Header'
import Greeting from '../../components/Greeting'
import SearchPressable from '../../components/SearchPressable'
import HomeCardsPressable from '../../components/HomeCardsPressable'


export default function Home({ route }) {

    // receive data from the component 'OperatorList' via 'HomeBottomNav'.
    const { operatorData } = route.params

    const navigation = useNavigation()

    // Define the navigations.
    const onPressToSearchRoute = () => {
        navigation.navigate('SearchRoute', { operatorData })
    }
    const onPressToDefaultScreen = () => {
        navigation.navigate('DefaultScreen')
    }
    const onPressToManageCredit = () => {
        navigation.navigate('ManageCredit', { operatorData })
    }
    const onPressToFavoriteRoute = () => {
        navigation.navigate('FavoriteRoutes', { operatorData })
    }

    const backgroundImage = { uri: mapBackground }

    return (
        <ScrollView style={styles.screenContainer}>

            {/* Background image */}
            <Image
                source={backgroundImage}
                style={screensStyles.background}
                blurRadius={5} />

            <Header />

            <View style={styles.homeScreenBody}>

                <View style={styles.boxContainer}>
                    <View style={{ width: '95%', alignSelf: 'center' }}>
                        <Greeting operatorName={operatorData.operatorName} />
                    </View>
                </View>

                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <SearchPressable handlePress={onPressToSearchRoute} />
                </View>

                <View style={{ marginBottom: 50 }}>
                    <View style={styles.boxContainer}>
                        <View style={styles.cardsContainer}>
                            <HomeCardsPressable
                                operatorData={operatorData}
                                onPressToManageCredit={onPressToManageCredit}
                                onPressToDefaultScreen={onPressToDefaultScreen}
                                onPressToFavoriteRoute={onPressToFavoriteRoute} />
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    homeScreenBody: {
        flex: 1,
    },
    cardsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
        width: "100%",
    },
    boxContainer: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 'auto',
        justifyContent: 'center',
        marginTop: 20,
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
    }
})