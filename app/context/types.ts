import { ReactNode } from "react"

export type GeneralContextType = {
  authorizeUser?: any
  isAuthorized?: boolean
  checkForAuthorization?: any
}

export interface IProps {
  children: ReactNode
}
