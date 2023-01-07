import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'


const HomeCardsPressable = ({ ...props }) => {

    const { onPressToManageCredit, onPressToDefaultScreen, onPressToFavoriteRoute } = props

    const homeCardElements = [
        {
            title: "Manage Tags",
            onPress: onPressToManageCredit,
            icon: <MaterialCommunityIcons name='tag-plus'
                size={50}
                style='icon'
                color={'#ccc'} />,
        },
        {
            title: "Change Operator",
            onPress: onPressToDefaultScreen,
            icon: <MaterialCommunityIcons name='bus-multiple'
                size={50}
                style='icon'
                color={'#ccc'} />,
        },
        {
            title: "Favorite Routes",
            onPress: onPressToFavoriteRoute,
            icon: <MaterialCommunityIcons name='star-three-points'
                size={50}
                style='icon'
                color={'#ccc'} />,
        },
    ]

    return (
        homeCardElements.map((items, index) => (
            <Pressable key={index} onPress={items.onPress} style={styles.card}>
                {items.icon}
                <Text style={styles.cardText}>{items.title}</Text>
            </Pressable>))
    )
}

export default HomeCardsPressable

const styles = StyleSheet.create({
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
    cardText: {
        bottom: 0,
        color: '#000',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%'
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 0
    },
})