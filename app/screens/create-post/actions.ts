import { AxiosResponse } from "axios"
import { sendAxiosRequest as AXIOS } from "../../api"
import Toast from "react-native-toast-message"
import { createPostBackendUrl } from "../../config/constants"

export const createPost = (body: any) => {
  return AXIOS({
    url: createPostBackendUrl,
    method: "POST",
    body,
    headers: { "Content-type": "application/json; charset=UTF-8" },
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
