import React, { FC, createContext, useEffect, useState } from "react"
import * as types from "./types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const GeneralContext = createContext<types.GeneralContextType>({
  authorizeUser: () => null,
  isAuthorized: false,
  checkForAuthorization: () => null,
  setActiveUser: () => null,
  activeUser: {},
  setIsAdmin: () => null,
  isAdmin: false,
  logout: () => null,
})

export const GeneralProvider: FC<types.IProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [activeUser, setActiveUser] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)

  const authorizeUser = async (email) => {
    let checkIfAdmin = false
    if (email === "michael.lawson@reqres.in") {
      checkIfAdmin = true
    }
    await AsyncStorage.setItem("isAuthorized", "true")
    await AsyncStorage.setItem("userEmail", email)
    await AsyncStorage.setItem("isAdmin", JSON.stringify(checkIfAdmin))
    setIsAdmin(checkIfAdmin)
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

  const logout = async () => {
    AsyncStorage.clear().then(() => {
      setIsAuthorized(false)
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
        setIsAdmin,
        isAdmin,
        logout,
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContext
