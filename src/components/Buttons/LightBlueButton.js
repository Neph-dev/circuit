import { StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'


const LightBlueButton = ({ ...props }) => {

    const { hasPressed, handleOnPress, label } = props

    return (
        <Pressable
            disabled={hasPressed ? true : false}
            onPress={handleOnPress}
            style={styles.pressable}>
            {hasPressed === true ? <ActivityIndicator color={"#fff"} size="large" /> :
                <Text style={styles.pressableLabel}>{label}</Text>}
        </Pressable>
    )
}

export default LightBlueButton

const styles = StyleSheet.create({
    pressable: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        width: '80%',
    },
    pressableLabel: {
        color: '#FFFFFF',
        fontSize: 22,
    },
})