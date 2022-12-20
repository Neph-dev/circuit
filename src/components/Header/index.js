import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Image } from 'react-native'

import styles from './styles'

import { UserPreferencesContext } from '../../contexts/UserPreferencesDataProvider'


export default function Header() {

    const {
        setRefreshWeatherData,
        weatherData,
        baseWeatherIconUrl,
        temperatureData,
        weatherDescription,
        weatherIcon,
    } = useContext(UserPreferencesContext)

    const [currentDate, setCurrentDate] = useState('')

    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
        'Saturday']

    useEffect(() => {
        let date = new Date().getDate() //Current Date
        let month = monthNames[new Date().getMonth()] //Current Month
        let day = dayNames[new Date().getDay()]//Current day
        setCurrentDate(`${day}, ${month} ${date}`)

        setRefreshWeatherData(true)
    }, [])

    return (
        <View style={styles.headerContainer}>
            <View style={styles.dateAndTimeContainer}>
                <Text style={styles.date}>{currentDate}</Text>
            </View>
            <View style={styles.weatherContainer}>
                <Image source={{ uri: `${baseWeatherIconUrl}${weatherIcon}@2x.png` }} style={styles.weatherIcon} />
                <Text style={styles.weather}>
                    {
                        temperatureData === undefined ? "loading..." :
                            `${weatherDescription}, ${Math.round(temperatureData)}°C in ${weatherData.name}`
                    }
                </Text>
            </View>
        </View>
    )
}
