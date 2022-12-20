import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'


const SignupModal = ({ ...props }) => {

    const { viewModal, setViewModal, input } = props
    return (
        <Modal transparent={true} visible={viewModal} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable onPress={() => { setViewModal(false) }} style={styles.pressable}>
                        <Text style={styles.textStyle}>
                            {input}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal >
    )
}

export default SignupModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        width: '90%',
    },

    pressable: {
        justifyContent: "center",
        backgroundColor: 'transparent',
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%',
    },

    textStyle: {
        marginLeft: 15,
        color: "#000",
        fontSize: 20,
        fontWeight: "normal",
    },

    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        justifyContent: 'space-between',

        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 20,
        width: '90%',
        height: 50,
    },

    hr: {
        marginTop: 'auto',
        marginBottom: 'auto',
        borderColor: '#fff',
        borderBottomWidth: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
    },
})