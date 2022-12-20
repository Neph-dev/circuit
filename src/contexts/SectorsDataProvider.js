import React, { createContext, useState, useEffect } from 'react'

import { API } from 'aws-amplify'
import * as queries from '../graphql/queries'


export const SectorsContext = createContext()

export const SectorsDataProvider = ({ children }) => {

    const [loader, setLoader] = useState(false)

    const [sectors, setSectors] = useState([])
    const [refreshSectors, setRefreshSectors] = useState(false)

    const [sectorDetails, setSectorDetails] = useState([])
    const [refreshSectorDetails, setRefreshSectorDetails] = useState(false)

    const fetchSectors = async () => {
        try {
            setLoader(true)
            const sectorsResults = await API.graphql({ query: queries.listRouteSectors })
            const sectors = sectorsResults.data.listRouteSectors.items
            setSectors(sectors)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('sector: ' + error)
        }
    }

    const fetchSectorDetails = async () => {
        try {
            setLoader(true)
            const sectorDetailsResults = await API.graphql({ query: queries.listRouteSectorCreditInfos })
            const sectorDetails = sectorDetailsResults.data.listRouteSectorCreditInfos.items
            setSectorDetails(sectorDetails)
            setLoader(false)
        }
        catch (error) {
            setLoader(false)
            console.log('sector details: ' + error)
        }
    }

    useEffect(() => {
        fetchSectors()
        fetchSectorDetails()
    }, [])

    if (refreshSectors) {
        fetchSectors()
        setRefreshSectors(false)
    }
    if (refreshSectorDetails) {
        fetchSectorDetails()
        setRefreshSectorDetails(false)
    }

    return (
        <SectorsContext.Provider
            value={{
                loader,
                sectorDetails,
                sectors,
                setRefreshSectorDetails,
                setRefreshSectors,
            }}>
            {children}
        </SectorsContext.Provider>
    )
}