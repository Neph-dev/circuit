import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/dist/Fontisto'


const RouteResultDetails = ({ ...props }) => {

    return (
        <>
            <View>
                <Text style={styles.boldText}>
                    {props?.RouteResults?.checkPointDepartureTime}
                </Text>
                <Text style={styles.boldText}>
                    {props?.arrFindRouteDetails?.checkPointDepartureTime}
                </Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="walk"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>15 min</Text>
                </View>

                <Fontisto
                    style={{ marginLeft: 10 }}
                    name="arrow-right-l"
                    size={20}
                    color={'#d4d4d4'} />

                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="bus"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>35 min</Text>
                </View>

                <MaterialCommunityIcons
                    style={{ marginLeft: 10, marginRight: 10 }}
                    name="transit-transfer"
                    size={30}
                    color={'#d4d4d4'} />

                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="bus"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>20 min</Text>
                </View>

                <Fontisto
                    style={{ marginLeft: 10 }}
                    name="arrow-right-l"
                    size={20}
                    color={'#d4d4d4'} />

                <View style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name="walk"
                        size={20}
                        color={'#d4d4d4'} />

                    <Text style={{ fontSize: 12, color: '#fff' }}>20 min</Text>
                </View>

                <MaterialCommunityIcons
                    style={{ marginLeft: 10 }}
                    name="star-three-points"
                    size={20}
                    color={'#d4d4d4'} />
            </View>
        </>
    )
}

export default RouteResultDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1f2432',
        flexDirection: 'row',
        marginTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
        width: '100%',
    },
    boldText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    verticalLine: {
        backgroundColor: '#fff',
        height: '100%',
        marginLeft: 10,
        marginRight: 10,
        width: 3,
    }
})