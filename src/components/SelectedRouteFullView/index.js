import { StyleSheet, Pressable, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Timeline from 'react-native-timeline-flatlist'

import Feather from 'react-native-vector-icons/dist/Feather'
import LightBlueButton from '../../components/Buttons/LightBlueButton'


const SelectedRouteFullView = ({ ...props }) => {

    const [hasPressed, setHasPressed] = useState(false)

    const itineraireInfo = [
        {
            time: '07:00',
            title: 'Eastgate',
            description: `Departure \nBus ID: A55`,
            lineColor: '#1f2432',
            lineWidth: 6,
            icon: <Image
                style={{ width: 40, height: 40, marginTop: 18, marginLeft: 3 }}
                source={{ uri: 'https://i.postimg.cc/ydNsBpqQ/6122371.png' }}
            />
        },
        {
            time: '8:00',
            title: 'Gandhi Square',
            description: `Change Bus \nBus ID: A20`,
            lineColor: '#1f2432',
            lineWidth: 6,
            icon: <Image
                style={{ width: 40, height: 40, marginTop: 15, marginLeft: 3 }}
                source={{ uri: 'https://i.postimg.cc/ydNsBpqQ/6122371.png' }}
            />
        },
        {
            time: '9:00',
            title: 'Braamfontein',
            description: 'Arrival',
            lineColor: '#1f2432',
            icon: <Image
                style={{ width: 40, height: 40, marginTop: 15, marginLeft: 3 }}
                source={{ uri: 'https://i.postimg.cc/ydNsBpqQ/6122371.png' }}
            />
        },
    ]

    return (
        <View style={styles.container}>

            <Pressable
                onPress={() => {
                    props.setSwipeDirection('SWIPE_DOWN')
                    props.setShowFullView(!props.showFullView)
                }}
                style={styles.iconContainer}>
                <Feather name="x" size={30} color={"#000"} />
            </Pressable>

            <View>
                <Text style={styles.boldMediumText}>
                    Eastgate to Braamfontein
                </Text>
            </View>
            <View style={styles.elementContainer}>
                <Text style={styles.smallText}>
                    Sector name:
                </Text>
                <Text style={styles.smallText}>
                    A
                </Text>
            </View>
            <View style={styles.elementContainer}>
                <Text style={styles.smallText}>
                    Stops:
                </Text>
                <Text style={styles.smallText}>
                    1
                </Text>
            </View>
            <View style={styles.elementContainer}>
                <Text style={styles.smallText}>
                    Status:
                </Text>
                <Text style={styles.smallText}>
                    On Time
                </Text>
            </View>

            <View style={{ flex: 1, paddingTop: 40 }}>
                <Timeline
                    data={itineraireInfo}
                    innerCircle={'icon'}
                    style={{
                        paddingTop: 15,
                    }}
                    titleStyle={{
                        color: '#000',
                        fontSize: 18,
                        marginTop: -15,
                    }}
                    descriptionStyle={{
                        color: '#000',
                        fontSize: 18,
                        marginTop: -5,
                        paddingBottom: 35,
                    }}
                    timeContainerStyle={{ minWidth: 52, marginTop: 10, marginRight: 10 }}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#000',
                        color: '#fff',
                        padding: 5,
                        width: 75,
                        borderRadius: 13,
                        marginTop: -10,
                        fontSize: 18
                    }}
                />
            </View>

            <LightBlueButton
                hasPressed={hasPressed}
                handleOnPress={() => { }}
                label='Save this route' />
        </View>
    )
}

export default SelectedRouteFullView

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
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
    iconContainer: {
        margin: 10,
        right: 0,
        alignItems: 'flex-end',
        width: '95%',
    },
    boldMediumText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    mediumText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'normal',
    },
    smallText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'normal',
    },
    elementContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
    horizontalLine: {
        width: '30%',
        alignSelf: 'center',
        backgroundColor: '#d5d5d5',
        height: 4
    }
})