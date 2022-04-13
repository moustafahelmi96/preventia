import { AxiosResponse } from "axios"
import { sendAxiosRequest as AXIOS } from "../../api"
import Toast from "react-native-toast-message"
import { dataBackendUrl, dataLimit } from "../../config/constants"

export const getAllUsers = (body: any) => {
  return AXIOS({
    url: `${dataBackendUrl}/user?page=${body.page}?&limit=${dataLimit}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(
      async (response: AxiosResponse): Promise<any> => {
        if (response) {
          return response.data
        }
      },
    )
    .catch((err: any) => {
      const errorMessage = err?.response?.data?.error || "Error occurred"
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      })
    })
}

export const getUserPosts = (body: any) => {
  return AXIOS({
    url: `${dataBackendUrl}/user/${body.userId}/post?limit=${dataLimit}&page=${body.page}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(
      async (response: AxiosResponse): Promise<any> => {
        if (response) {
          return response.data
        }
      },
    )
    .catch((err: any) => {
      const errorMessage = err?.response?.data?.error || "Error occurred"
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      })
    })
}

export const getAllTags = () => {
  return AXIOS({
    url: `${dataBackendUrl}/tag`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(
      async (response: AxiosResponse): Promise<any> => {
        if (response) {
          return response.data
        }
      },
    )
    .catch((err: any) => {
      const errorMessage = err?.response?.data?.error || "Error occurred"
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      })
    })
}

export const getFilteredPosts = (body: any) => {
  const tag = body.tag.trim()
  return AXIOS({
    url: `${dataBackendUrl}/tag/${tag}/post?limit=${dataLimit}&page=${body.page}`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(
      async (response: AxiosResponse): Promise<any> => {
        if (response) {
          return response.data
        }
      },
    )
    .catch((err: any) => {
      const errorMessage = err?.response?.data?.error || "Error occurred"
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      })
    })
}
