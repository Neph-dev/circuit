import React, { createContext, useState } from 'react'
import { API } from 'aws-amplify'


export const DeleteContext = createContext()

export const DeleteProvider = ({ children }) => {

    const [isLoadingDelete, setIsLoadingDelete] = useState(false)

    const deleteData = async (mutation, data) => {
        setIsLoadingDelete(true)
        await API.graphql({ query: mutation, variables: { input: data } })
            .then(() => {
                setIsLoadingDelete(false)
            })
            .catch(err => {
                setIsLoadingDelete(false)
                console.log(err.message)
            })
    }
    return (
        <DeleteContext.Provider value={{ deleteData, isLoadingDelete }}>
            {children}
        </DeleteContext.Provider>
    )
}