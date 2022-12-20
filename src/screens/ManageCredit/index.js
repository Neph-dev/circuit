// Read the information of all available tags.


import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


const ManageCredit = ({ route }) => {

    const navigation = useNavigation()
    const { operatorData } = route.params

    const { userTags, userSettings, setRefreshUserTags } = useContext(UserPreferencesContext)

    useEffect(() => { setRefreshUserTags(true) }, [])

    const onPressToAddCredit = () => navigation.navigate('AddCredit', { operatorData })

    const filterData = userTags.filter((item) => {
        if (item.operatorID.includes(operatorData.operatorID)) return item
    })

    return (
        <View style={styles.manageCreditScreen}>
            <View style={styles.manageCreditBody}>

                <Pressable
                    onPress={onPressToAddCredit}
                    style={styles.manageCreditMenu}>
                    <MaterialCommunityIcons
                        name="plus-circle-multiple"
                        color={userSettings.userCategory === 'Blue' ? '#1f2432' :
                            userSettings.userCategory === 'Gold' ? '#da9100' :
                                userSettings.userCategory === 'Platinum' ? '#4D4F51' : '#1f2432'}
                        size={45} />
                </Pressable>

                <View style={[styles.balanceContainer, {
                    backgroundColor: userSettings.userCategory === 'Blue' ? '#1f2432'
                        : userSettings.userCategory === 'Gold' ? '#da9100'
                            : userSettings.userCategory === 'Platinum' ? '#4D4F51'
                                : '#1f2432'
                }]}>
                    <View
                        style={{
                            flexDirection: 'column',
                            paddingBottom: 40,
                            height: '85%',
                            width: '100%',
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text style={styles.cardMdText}>
                                {operatorData.operatorName}
                            </Text>
                            <Text style={styles.cardMdText}>
                                {userSettings.totalPointsEarned} Miles
                            </Text>
                        </View>

                        {filterData.map((_data, index) =>
                            <View key={index} style={{ marginTop: 45 }}>
                                <Text style={styles.cardMdText}>
                                    Balance: {_data.numberOfTags}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* <Text style={styles.cardSmText}>
                        0919780120 3710 0000 9122 4514
                    </Text> */}
                </View>

            </View>
        </View>
    )
}

export default ManageCredit

const styles = StyleSheet.create({
    manageCreditScreen: {
        flex: 1
    },
    balanceContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        width: '90%',
        height: 'auto'
    },
    cardMdText: {
        fontSize: 18,
        color: '#fff',
    },
    cardSmText: {
        color: '#fff',
        fontSize: 16,
    },
    manageCreditBody: {
        margin: 0
    },
    manageCreditMenu: {
        alignItems: 'center',
        background: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
        height: 70,
    },
})