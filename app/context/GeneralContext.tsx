import React, { FC, createContext, useEffect, useState } from "react"
import * as types from "./types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const GeneralContext = createContext<types.GeneralContextType>({
  authorizeUser: () => null,
  isAuthorized: false,
  checkForAuthorization: () => null,
  setActiveUser: () => null,
  activeUser: {},
})

export const GeneralProvider: FC<types.IProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [activeUser, setActiveUser] = useState({})

  const authorizeUser = async () => {
    await AsyncStorage.setItem("isAuthorized", "true")
    setIsAuthorized(true)
  }

  const checkForAuthorization = async () => {
    AsyncStorage.getItem("isAuthorized").then((res: string | null) => {
      if (res === null) {
        setIsAuthorized(false)
      } else {
        setIsAuthorized(JSON.parse(res))
      }
    })
  }

  useEffect(() => {
    checkForAuthorization()
  }, [])

  return (
    <GeneralContext.Provider
      value={{
        authorizeUser,
        isAuthorized,
        checkForAuthorization,
        setActiveUser,
        activeUser,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContext
