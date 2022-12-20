import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'


const ProfileMenu = ({ ...item }) => {

    const menuList = [
        {
            title: 'Account',
            icon: <MaterialCommunityIcons name="account-circle-outline" color={'#000'} size={35} />,
            onPress: item.onPressToAccount,
        },
        {
            title: 'Payment Method',
            icon: <MaterialCommunityIcons name="credit-card-multiple" color={'#000'} size={35} />,
            onPress: item.onPressToPaymentMethod,
        },
        {
            title: 'History',
            icon: <MaterialCommunityIcons name="history" color={'#000'} size={35} />,
            onPress: item.onPressToScanHistory,
        },
        {
            title: 'Sign out',
            icon: <MaterialCommunityIcons name="logout" color={'#ee204d'} size={35} />,
            onPress: item.SignOut,
        },
    ]

    return (
        menuList.map((items, index) => (
            <Pressable
                key={index}
                onPress={items.onPress}
                style={styles.menuElementContainer} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.iconContainer}>
                        {items.icon}
                    </View>
                    <Text style={styles.menuElementTitle}>
                        {items.title}
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" color={'#000'} size={15} />
            </Pressable >
        ))
    )
}

export default ProfileMenu

const styles = StyleSheet.create({
    menuElementContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        height: 60,
    },
    iconContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10
    },
    menuElementTitle: {
        fontSize: 20,
        color: '#000',
        marginLeft: 10,
        fontWeight: 'normal',
    }
})