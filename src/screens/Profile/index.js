import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'

import { Auth } from 'aws-amplify'

import { UserContext } from '../../contexts/UserDataProvider'
import ProfileMenu from '../../components/ProfileMenu'


export default function Profile() {
    const {
        currentName, currentFamilyName,
        currentEmail, setFirstSigningIn } = useContext(UserContext)

    const navigation = useNavigation()

    const SignOut = async () => {
        try {
            await Auth.signOut()
            setFirstSigningIn(false)
            navigation.dispatch(StackActions.replace('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }
    const onPressToAccount = () => navigation.navigate('Account')

    const onPressToPaymentMethod = () => navigation.navigate('PaymentMethod')

    const onPressToScanHistory = () => navigation.navigate('ScanHistory')

    return (
        <View style={styles.profileScreenContainer}>

            {/* USER DETAILS */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.profilePicture}>
                    <Text style={{ fontSize: 22, color: '#000', margin: 'auto', textAlign: 'center', fontWeight: 'bold' }}>
                        {currentName.charAt(0)} {currentFamilyName.charAt(0)}
                    </Text>
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.userDetails} >
                        <View>
                            <Text style={styles.userName}>
                                {currentName} {currentFamilyName}
                            </Text>
                            <Text style={styles.smText}>
                                {currentEmail}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.hr} />

            <View>
                <ProfileMenu
                    onPressToScanHistory={onPressToScanHistory}
                    onPressToAccount={onPressToAccount}
                    onPressToPaymentMethod={onPressToPaymentMethod}
                    SignOut={SignOut} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileScreenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userDetails: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    profilePicture: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 100,
        margin: 'auto',
        marginRight: 20,
        marginLeft: 20,
        width: 60,
        height: 60,
    },
    userName: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
    smText: {
        marginTop: 5,
        fontSize: 18,
        color: '#000',
    },
    hr: {
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 20,
        marginBottom: 40
    }
})