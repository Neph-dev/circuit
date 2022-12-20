import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'


const DefaultScreenModal = ({ ...props }) => {

    const pressables = [
        {
            label: 'Yes',
            handlePress: props.handleSetDefault,
        },
        {
            label: 'No',
            handlePress: props.handleContinueToHome
        },
    ]

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.viewModal}
                onRequestClose={() => { props.setViewModal(false) }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Do you want to set <Text style={{ fontWeight: "bold" }}>{props.operatorName}</Text> as default ?
                        </Text>
                        <View style={styles.pressablesContainer}>
                            {
                                pressables.map((pressable, index) => (
                                    <Pressable
                                        key={index}
                                        style={styles.button}
                                        onPress={pressable.handlePress} >
                                        <Text style={styles.textStyle}>
                                            {pressable.label}
                                        </Text>
                                    </Pressable>
                                ))
                            }
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default DefaultScreenModal

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
        justifyContent: 'space-between',
        marginTop: 20,
        width: '80%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#2196F3",
        borderRadius: 20,
        elevation: 2,
        justifyContent: "center",
        width: 90,
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