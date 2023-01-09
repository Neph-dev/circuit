import React, { createContext, useState } from 'react'
import { API } from 'aws-amplify'


export const CreateContext = createContext()

export const CreateProvider = ({ children }) => {

    const [response, setResponse] = useState()
    const [isLoadingOnCreate, setIsLoadingOnCreate] = useState(false)

    const createData = async (mutation, data) => {
        setIsLoadingOnCreate(true)
        await API.graphql({ query: mutation, variables: { input: data } })
            .then((response) => {
                setResponse(response)
                setIsLoadingOnCreate(false)
            })
            .catch(err => {
                setIsLoadingOnCreate(false)
                console.log(err.message)
            })
    }
    return (
        <CreateContext.Provider value={{ createData, response, isLoadingOnCreate }}>
            {children}
        </CreateContext.Provider>
    )
}