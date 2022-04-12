import { ReactNode } from "react"

export type GeneralContextType = {
  authorizeUser?: any
  isAuthorized?: boolean
  checkForAuthorization?: any
  setActiveUser?: any
  activeUser?: any
  logout?: any
}

export interface IProps {
  children: ReactNode
}
