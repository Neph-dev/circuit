// This component is responsible for the bottom navigation of the home screen. 

import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import SplashScreen from 'react-native-splash-screen'

import { Home, Camera, Profile } from '../screens'

import { UserContext } from '../contexts/UserDataProvider'
import { UserPreferencesContext } from '../contexts/UserPreferencesDataProvider'


const Tab = createBottomTabNavigator()

export default function HomeBottomNav({ route }) {

    const { fetchUserTags } = useContext(UserPreferencesContext)

    useEffect(() => {
        SplashScreen.hide()
        fetchUserTags()
    }, [])

    //Receive data from OperatorsList component.
    const { operatorData } = route.params
    const { setFirstSigningIn } = useContext(UserContext)

    useEffect(() => {
        setFirstSigningIn(false)
    })

    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior={"backBehavior"}
            screenOptions={{
                tabBarActiveTintColor: '#87A9AC',
                tabBarInactiveTintColor: '#ccc',
                tabBarStyle: {
                    backgroundColor: '#1f2432',
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5
                }
            }}>

            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ operatorData }}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={26} />
                    ),
                }} />

            <Tab.Screen
                name="Camera"
                component={Camera}
                initialParams={{ operatorData }}
                options={{
                    tabBarLabel: "Scan",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="line-scan"
                            color={color}
                            size={26} />
                    ),
                }} />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={26}
                        />
                    ),
                }} />

        </Tab.Navigator>
    )
}