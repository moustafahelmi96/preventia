import axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from "axios"
import promise from "promise"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { appId, dataBackendUrl, loginBackendUrl } from "../config/constants"

// Add a request interceptor
export const axiosInstance: AxiosInstance = axios.create()

// Intercepting all API requests
axiosInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // If the header does not contain the token and the url not public, redirect to login
    const accessToken = await AsyncStorage.getItem("token")

    if (!config.headers["Content-Type"]) config.headers["Content-Type"] = "application/json"
    // if token is found add it to the header
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken
      config.headers["app-id"] = appId
    }
    // Injecting the API server IP
    // config.url = (accessToken ? dataBackendUrl : loginBackendUrl) + config.url
    return config
  },
  function (error) {
    // Do something with request error
    return promise.reject(error)
  },
)

// TODO: intercept response to refresh token
// config should be an object
export const sendAxiosRequest = async (paramters: {
  url: string
  method: string
  body?: any
  query?: any
  actions?: any | { apiCallSuccess: any; nullifyToast: any; apiCallFail: any }
  headers?: any
}) => {
  const { url, method, body = {}, query = {}, actions, headers = {} } = paramters
  const clonedQuery: any = { ...query }
  let requestPromise

  switch (method) {
    case "POST":
      requestPromise = axiosInstance.post(url, body, {
        headers: headers,
        maxRedirects: 1,
      })
      break

    case "GET":
      requestPromise = axiosInstance.get(url, {
        params: clonedQuery,
        withCredentials: true,
      })
      break

    case "PATCH":
      requestPromise = axiosInstance.patch(url, body)
      break

    case "DELETE":
      requestPromise = axiosInstance.delete(url, { params: clonedQuery })
      break
  }

  try {
    const res = await requestPromise
    return res
  } catch (err) {
    if (err?.response?.status === 401) {
      await AsyncStorage.clear()
      throw err
    } else {
      throw err
    }
  }
}
