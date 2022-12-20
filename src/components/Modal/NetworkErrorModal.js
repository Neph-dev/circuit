import { View, Text, Modal, Pressable, StyleSheet, DevSettings } from 'react-native'
import React from 'react'

import Feather from 'react-native-vector-icons/dist/Feather'


const NetworkErrorModal = () => {

    const onExitApp = () => DevSettings.reload()

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={true} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Feather
                            size={80}
                            name="wifi-off"
                            style={{ color: 'grey' }}
                        />
                        <Text style={styles.modalText}>
                            No internet connection
                        </Text>
                        <View style={styles.pressablesContainer}>
                            <Pressable onPress={onExitApp} style={styles.button}>
                                <Text style={styles.textStyle}>
                                    Try again
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

export default NetworkErrorModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        width: '80%',
    },
    pressablesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        width: '80%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#2196F3",
        borderRadius: 20,
        elevation: 2,
        justifyContent: "center",
        width: '100%',
        height: 40,
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        color: '#000',
        fontSize: 22,
        marginBottom: 15,
        textAlign: "center"
    }
})