import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native"

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'


const ErrorModalView = ({ ...item }) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={item.modalVisible}
                onRequestClose={() => {
                    item.setModalVisible(!item.modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                            <Text style={styles.modalTitle}>
                                Heads Up
                            </Text>
                            <MaterialIcons name='error' size={30} color={'#000'} />
                        </View>
                        <Text style={styles.modalText}>
                            You still have some tags in your sector account.
                            {`\n`} {`\n`}
                            Use it up before buying new tags.
                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => item.setModalVisible(!item.modalVisible)}
                        >
                            <Text style={styles.textStyle}>
                                Understood!
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalTitle: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
    modalText: {
        color: '#000',
        fontSize: 20,
        marginBottom: 15,
        textAlign: "center"
    }
})

export default ErrorModalView