import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const PopUpAnimation = ({ ...props }) => {

    const { message } = props

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {message}
            </Text>
        </View>
    )
}

export default PopUpAnimation

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 5,
        top: 50,
    },
    text: {
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        paddingBottom: 10,
        paddingTop: 10,
    }
})