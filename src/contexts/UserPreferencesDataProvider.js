// This provider is responsible to fetch, distribute and refresh the
// data preferences of the current user.

import React, { createContext, useContext, useState, useEffect } from 'react'
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding'
import { useNavigation, StackActions } from '@react-navigation/native'

import dayjs from 'dayjs'

import axios from 'axios'

import { API } from 'aws-amplify'
import * as queries from '../graphql/queries'

import { GOOGLE_MAPS_KEY, WEATHER_API_KEY } from '../keys'

import { UserContext } from './UserDataProvider'


export const UserPreferencesContext = createContext()

export const UserPreferencesDataProvider = ({ children }) => {


    const navigation = useNavigation()

    Geocoder.init(GOOGLE_MAPS_KEY)

    const { firstSigningIn } = useContext(UserContext)

    const [loader, setLoader] = useState(false)

    const [currentUserCity, setCurrentUserCity] = useState('')

    const baseWeatherIconUrl = "http://openweathermap.org/img/wn/"
    const [weatherData, setWeatherData] = useState({})
    const [temperatureData, setTemperatureData] = useState()
    const [weatherDescription, setWeatherDescription] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')
    const [refreshWeatherData, setRefreshWeatherData] = useState(false)

    const [userSettings, setUserSettings] = useState([])
    const [refreshUserSettings, setRefreshUserSettings] = useState(false)

    const [userTags, setUserTags] = useState([])
    const [refreshUserTags, setRefreshUserTags] = useState(false)

    const [defaultOperator, setDefaultOperator] = useState([])
    const [refreshDefaultOperator, setRefreshDefaultOperator] = useState(false)

    const [userScanHistory, setUserScanHistory] = useState([])
    const [refreshUserScanHistory, setRefreshUserScanHistory] = useState(false)

    const [favoriteRoutes, setFavoriteRoutes] = useState([])
    const [refreshFavoriteRoutes, setRefreshFavoriteRoutes] = useState(false)

    const fetchWeatherData = async () => {
        let latitude
        let longitude

        // Get User's Longitude and Latitude coordinates.
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        }).then(location => {
            latitude = location.latitude
            longitude = location.longitude
        }).catch(error => {
            const { code, message } = error
            console.log("fetching location failed", code, message)
        })

        // Get User's City
        // Search by geo-location (reverse geo-code)
        Geocoder.from(latitude, longitude)
            .then(json => {
                let addressComponent = json.results[0].address_components[0].long_name
                setCurrentUserCity(addressComponent)
            })
            .catch(error => console.log(error))

        if (currentUserCity !== '' || currentUserCity !== undefined) {
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
                .then((response) => {
                    setWeatherData(response.data)
                    setTemperatureData(response.data.main.temp)
                    setWeatherDescription(response.data.weather[0].description)
                    setWeatherIcon(response.data.weather[0].icon)
                }).catch(error => {
                    console.log("Failed To Fetch Weather ", error.message)
                })
        }
    }

    const fetchUserSettings = async () => {
        try {
            setLoader(true)
            const userSettingsResults = await API.graphql({ query: queries.listUserSettingss })
            setUserSettings(userSettingsResults.data.listUserSettingss.items[0])

            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('user settings: ', error)
        }
    }

    const fetchUserTags = async () => {
        // Manage expiry date and time
        const dt = dayjs()
        let currentDate = dt.add(0, "day").format("MM-DD-YY")
        let fullDate = new Date()
        const currentTime = fullDate.toLocaleTimeString({
            hour: 'numeric', hour12: false, minute: 'numeric'
        })

        try {
            setLoader(true)
            const userTagsResults = await API.graphql({ query: queries.listUserTagss })
            setUserTags(userTagsResults.data.listUserTagss.items)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('user tags', error)
        }
    }

    const fetchDefaultOperator = async (operatorData) => {
        try {
            setLoader(true)
            const userTagsResults = await API.graphql({ query: queries.listUserDefaultOperators })
            setDefaultOperator(userTagsResults.data.listUserDefaultOperators.items[0])
            setLoader(false)

            if ((operatorData?.operatorID === defaultOperator?.operatorID) && operatorData !== undefined) {
                // Hide the splash screen when the user signs in automatically.
                if (firstSigningIn === true) {
                    navigation.dispatch(StackActions.replace('HomeBottomNav', { operatorData }))
                }
            }
        }
        catch (error) {
            setLoader(false)
            console.log('user tags: ', error)
        }
    }

    const fetchUserScanHistory = async () => {
        try {
            setLoader(true)
            const userScanHistoryResults = await API.graphql({ query: queries.listUserScanHistorys })
            setUserScanHistory(userScanHistoryResults?.data?.listUserScanHistorys?.items)
            setLoader(false)

        }
        catch (error) {
            setLoader(false)
            console.log('user tags: ', error)
        }
    }

    const fetchFavoriteRoutes = async () => {
        await API.graphql({ query: queries.listUserFavoriteRoutes })
            .then((response) => {
                setFavoriteRoutes(response?.data?.listUserFavoriteRoutes?.items)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                console.log(error)
            })
    }

    // On load, fetch the user preferences data
    useEffect(() => {
        fetchUserSettings()
        fetchUserTags()
        fetchDefaultOperator()
        fetchUserScanHistory()
        fetchFavoriteRoutes()
    }, [])

    // If the state changes to true make a new request
    // then change the state to false
    if (refreshWeatherData) {
        fetchWeatherData()
        setRefreshWeatherData(false)
    }
    if (weatherData === {}) {
        fetchWeatherData()
    }
    if (refreshUserSettings) {
        fetchUserSettings()
        setRefreshUserSettings(false)
    }
    if (refreshUserTags) {
        fetchUserTags()
        setRefreshUserTags(false)
    }
    if (refreshDefaultOperator) {
        fetchDefaultOperator()
        setRefreshDefaultOperator(false)
    }
    if (refreshUserScanHistory) {
        fetchUserScanHistory()
        setRefreshUserScanHistory(false)
    }
    if (refreshFavoriteRoutes) {
        fetchFavoriteRoutes()
        setRefreshFavoriteRoutes(false)
    }
    return (
        <UserPreferencesContext.Provider
            value={{
                loader,
                currentUserCity,
                weatherData,
                temperatureData,
                weatherDescription,
                weatherIcon,
                baseWeatherIconUrl,
                userSettings,
                userTags,
                defaultOperator,
                setRefreshWeatherData,
                fetchUserTags,
                setUserTags,
                fetchUserSettings,
                setRefreshUserSettings,
                setRefreshUserTags,
                fetchDefaultOperator,
                setRefreshDefaultOperator,

                fetchUserScanHistory,
                refreshUserScanHistory,
                setRefreshUserScanHistory,
                userScanHistory,

                fetchFavoriteRoutes,
                favoriteRoutes,
                setRefreshFavoriteRoutes,
            }}>
            {children}
        </UserPreferencesContext.Provider>
    )
}