import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import AntDesign from 'react-native-vector-icons/dist/AntDesign'


const SearchPressable = ({ handlePress }) => {
    return (
        <Pressable
            onPress={handlePress}
            style={styles.searchContainer} >
            <View style={styles.search} >
                <Text style={{ fontSize: 18, color: '#000000' }}>
                    Search a Route
                </Text>
            </View>
            <AntDesign
                name="search1"
                color='#000'
                size={26} />
        </Pressable>
    )
}

export default SearchPressable

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 20,
        width: '100%',
    },
    search: {
        paddingLeft: 15,
        paddingRight: 15,
        width: '90%',
    },
})