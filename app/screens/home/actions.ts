import { AxiosResponse } from "axios"
import { sendAxiosRequest as AXIOS } from "../../api"
import Toast from "react-native-toast-message"
import { dataLimit } from "../../config/constants"

export const getAllUsers = (body: any) => {
  return AXIOS({
    url: `/user?page=${body.page}?&limit=${dataLimit}`,
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
