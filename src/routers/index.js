import React from 'react'

/* import the nav container and the stack navigator components */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeBottomNav from './HomeBottomNav'
// import RoutesBottomNav from './RoutesBottomNav'

// Auth imports
import {
    SignIn,
    GetEmailorPhoneNumber,
    PersonalInformation,
    SignUpConfirmationCode,
    ForgotGetEmail,
    ForgotGetCode,
    NewPassword
} from '../authentication'

import {
    DefaultScreen,
    ManageCredit,
    AddCredit,
    FavoriteRoutes,
    Account,
    PaymentMethod,
    AddCard,
    ScanHistory,
    ScanSucceed,
    ScanFailed,
    SearchRoute,
    SelectedRoute,
} from '../screens'

export default function Router() {

    /* store the stack navigator in a variable */
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='SignUp'
                component={PersonalInformation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='GetEmailorPhoneNumber'
                component={GetEmailorPhoneNumber}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SignUpConfirmationCode'
                component={SignUpConfirmationCode}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ForgotPassword'
                component={ForgotGetEmail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ForgotGetCode'
                component={ForgotGetCode}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='NewPassword'
                component={NewPassword}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='DefaultScreen'
                component={DefaultScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='HomeBottomNav'
                component={HomeBottomNav}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ManageCredit"
                component={ManageCredit}
                options={{ headerTitle: "Manage Tags" }}
            />
            <Stack.Screen
                name="AddCredit"
                component={AddCredit}
                options={{ headerTitle: "Add Tags" }}
            />
            <Stack.Screen
                name='FavoriteRoutes'
                component={FavoriteRoutes}
                options={{ headerTitle: "Favorite Route" }}
            />
            <Stack.Screen
                name='Account'
                component={Account}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTitle: "Account",
                }}
            />
            <Stack.Screen
                name='PaymentMethod'
                component={PaymentMethod}
                options={{ headerTitle: "Payment Methods" }}
            />
            <Stack.Screen
                name='AddCard'
                component={AddCard}
                options={{ headerTitle: "Add a card" }}
            />
            <Stack.Screen
                name='ScanHistory'
                component={ScanHistory}
                options={{ headerTitle: "Scan History" }}
            />
            <Stack.Screen
                name="ScanSucceed"
                component={ScanSucceed}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ScanFailed"
                component={ScanFailed}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SearchRoute"
                component={SearchRoute}
                options={{ headerShown: false, headerTitle: "Search Route" }}
            />
            <Stack.Screen
                name='SelectedRoute'
                component={SelectedRoute}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
