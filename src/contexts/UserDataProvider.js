import React, { createContext, useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'


export const UserContext = createContext()

export const UserDataProvider = ({ children }) => {

    const [currentUsername, setCurrentUsername] = useState('')
    const [currentName, setCurrentName] = useState('')
    const [currentFamilyName, setCurrentFamilyName] = useState('')
    const [currentEmail, setCurrentEmail] = useState('')
    const [currentUserSub, setCurrentUserSub] = useState('')
    const [isEmailVerified, setIsEmailVerified] = useState('')
    const [currentUserProvince, setCurrentUserProvince] = useState('')
    const [currentUserCity, setCurrentUserCity] = useState('')
    const [error, setError] = useState()
    const [firstSigningIn, setFirstSigningIn] = useState()

    const [refreshUser, setRefreshUser] = useState(false)

    const fetchUserInfo = async () => {
        try {
            let city = "custom:city"
            Auth.currentAuthenticatedUser({
                bypassCache: true
            }).then(user => {
                setCurrentUsername(user.username)
                setCurrentName(user.attributes.name)
                setCurrentFamilyName(user.attributes.family_name)
                setCurrentEmail(user.attributes.email)
                setCurrentUserSub(user.attributes.sub)
                setIsEmailVerified(user.attributes.email_verified)

                // Convert data from object to array to access custom attributes  
                // let result = Object.keys(user.attributes).map((key) => [key, user.attributes[key]])
                // setCurrentUserProvince(result[5][1])
                // setCurrentUserCity(result[6][1])
            }).catch(err => {
                setError(401)
            })
        }
        catch (error) {
        }
    }

    useEffect(() => { fetchUserInfo() }, [])

    if (refreshUser) {
        fetchUserInfo()
        setRefreshUser(false)
    }

    return (
        <UserContext.Provider value={{
            fetchUserInfo,
            currentUsername,
            currentName,
            currentFamilyName,
            currentEmail,
            currentUserSub,
            currentUserProvince,
            currentUserCity,
            error,
            isEmailVerified,
            setIsEmailVerified,
            firstSigningIn,
            setFirstSigningIn,
            setRefreshUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}
