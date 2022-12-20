import React, { createContext, useState, useEffect } from 'react'

import { API } from 'aws-amplify'
import * as queries from '../graphql/queries'


export const GetDataContext = createContext()

export const GetDataProvider = ({ children }) => {

    const [operators, setOperators] = useState([])
    const [refreshOperators, setRefreshOperators] = useState(false)

    const [sectors, setSectors] = useState([])
    const [refreshSectors, setRefreshSectors] = useState(false)

    const [tagsInfo, setTagsInfo] = useState([])
    const [refreshTagsInfo, setRefreshTagsInfo] = useState(false)

    const [routes, setRoutes] = useState([])
    const [refreshRoutes, setRefreshRoutes] = useState(false)

    const [routeCheckPoint, setRouteCheckPoint] = useState([])
    const [refreshRouteCheckPoint, setRefreshRouteCheckPoint] = useState(false)

    const [checkPointDetails, setCheckPointDetails] = useState([])
    const [refreshCheckPointDetails, setRefreshCheckPointDetails] = useState(false)

    const [loader, setLoader] = useState(false)

    const fetchOperators = async () => {
        try {
            setLoader(true)
            const operatorsResults = await API.graphql({ query: queries.listOperators })
            const operatorsDetails = operatorsResults.data.listOperators.items
            setOperators(operatorsDetails)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Fetching Operators Error', error)
        }
    }

    const fetchSectors = async () => {
        try {
            setLoader(true)
            const sectorsResults = await API.graphql({ query: queries.listSectors })
            setSectors(sectorsResults.data.listSectors.items)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Fetching Sector Error', error)
        }
    }

    const fetchRoutes = async () => {
        try {
            setLoader(true)
            const routesResults = await API.graphql({ query: queries.listRoutes })
            setRoutes(routesResults.data.listRoutes.items)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Fetching Routes Error', error)
        }
    }

    const fetchRouteCheckPoint = async () => {
        try {
            setLoader(true)
            const routeCheckPointResults = await API.graphql({ query: queries.listRouteCheckPoints })
            setRouteCheckPoint(routeCheckPointResults.data.listRouteCheckPoints.items)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Fetching Routes Error', error)
        }
    }

    const fetchCheckPointDetails = async () => {
        try {
            setLoader(true)
            const checkPointDetailsResults = await API.graphql({ query: queries.listCheckPointDetailss })
            setCheckPointDetails(checkPointDetailsResults.data.listCheckPointDetailss.items)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Fetching CheckPointDetails Error', error)
        }
    }

    const fetchTagsInfo = async () => {
        try {
            setLoader(true)
            const tagsResults = await API.graphql({ query: queries.listTagsInfos })
            setTagsInfo(tagsResults?.data?.listTagsInfos?.items)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('Fetching Tags Error', error)
        }
    }

    useEffect(() => {
        fetchOperators()
        fetchSectors()
        fetchTagsInfo()
        fetchRoutes()
        fetchRoutes()
        fetchRouteCheckPoint()
        fetchCheckPointDetails()
    }, [])

    if (refreshOperators) {
        fetchOperators()
        setRefreshOperators(false)
    }

    if (refreshSectors) {
        fetchSectors()
        setRefreshSectors(false)
    }

    if (refreshTagsInfo) {
        fetchTagsInfo()
        setRefreshTagsInfo(false)
    }

    if (refreshRoutes) {
        fetchRoutes()
        setRefreshRoutes(false)
    }

    if (refreshRouteCheckPoint) {
        fetchRoutePointResults()
        setRefreshRouteCheckPoint(false)
    }

    if (refreshCheckPointDetails) {
        fetchCheckPointDetails()
        setRefreshCheckPointDetails(false)
    }

    return (
        <GetDataContext.Provider
            value={{
                loader,

                fetchOperators,
                operators,
                setRefreshOperators,

                fetchSectors,
                sectors,
                setRefreshSectors,

                fetchTagsInfo,
                tagsInfo,
                setRefreshTagsInfo,

                fetchRoutes,
                routes,
                setRefreshRoutes,

                fetchRouteCheckPoint,
                routeCheckPoint,
                setRefreshRouteCheckPoint,

                fetchCheckPointDetails,
                checkPointDetails,
                setRefreshCheckPointDetails,
            }}>
            {children}
        </GetDataContext.Provider>
    )
}