import React, { createContext, useState, useEffect } from 'react'

import { API } from 'aws-amplify'
import * as queries from '../graphql/queries'


export const RoutesDetailsContext = createContext()

export const RouteDetailsDataProvider = ({ children }) => {

    const [routeDetails, setRouteDetails] = useState([])
    const [loader, setLoader] = useState(false)

    const fetchRouteDetails = async () => {
        try {
            setLoader(true)
            const routeDetailsResults = await API.graphql({ query: queries.listRouteDetailss })
            const routeDetails = routeDetailsResults.data.listRouteDetailss.items
            setRouteDetails(routeDetails)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchRouteDetails()
    }, [])

    return (
        <RoutesDetailsContext.Provider value={{ routeDetails, loader }}>
            {children}
        </RoutesDetailsContext.Provider>
    )
}