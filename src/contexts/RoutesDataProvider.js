import React, { createContext, useState, useEffect } from 'react'

import { API } from 'aws-amplify'
import * as queries from '../graphql/queries'


export const RoutesContext = createContext()

export const RoutesDataProvider = ({ children }) => {

    const [loader, setLoader] = useState(false)

    const [routes, setRoutes] = useState([])
    const [refreshRoutes, setRefreshRoutes] = useState(false)

    const [routeDetails, setRouteDetails] = useState([])
    const [refreshRouteDetails, setRefreshRouteDetails] = useState(false)

    const fetchRoutes = async () => {
        try {
            setLoader(true)
            const routesResults = await API.graphql({ query: queries.listRoutes })
            const routes = routesResults?.data?.listRoutes?.items
            setRoutes(routes)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Route: ' + error)
        }
    }

    const fetchRouteDetails = async () => {
        try {
            setLoader(true)
            const routeDetailsResults = await API.graphql({ query: queries.listRouteDetailss })
            const routeDetails = routeDetailsResults.data.listRouteDetailss.items
            setRouteDetails(routeDetails)

            const sortedData = [].concat(routeDetailsResults?.data?.listRouteDetailss?.items)
                .sort((a, b) => a.departureRouteTime.slice(2) > b.departureRouteTime.slice(2) ? 1 : -1)
            setRouteDetails(sortedData)

            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Route Details: ' + error)
        }
    }

    useEffect(() => {
        fetchRoutes()
        fetchRouteDetails()
    }, [])

    if (refreshRoutes) {
        fetchRoutes()
        setRefreshRoutes(false)
    }

    if (refreshRouteDetails) {
        fetchRouteDetails()
        setRefreshRouteDetails(false)
    }

    return (
        <RoutesContext.Provider value={{ loader, routes, routeDetails, setRefreshRoutes, setRefreshRouteDetails }}>
            {children}
        </RoutesContext.Provider>
    )
}