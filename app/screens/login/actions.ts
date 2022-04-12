import AsyncStorage from "@react-native-async-storage/async-storage"
import { AxiosResponse } from "axios"
import { sendAxiosRequest as AXIOS } from "../../api"
import Toast from "react-native-toast-message"
import { loginBackendUrl } from "../../config/constants"

export const login = (body: any) => {
  const onSuccess = body.onSuccess
  delete body.onSuccess
  return AXIOS({
    url: `${loginBackendUrl}/login`,
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  })
    .then(
      async (response: AxiosResponse): Promise<any> => {
        if (response) {
          await AsyncStorage.setItem("token", response?.data?.token)
          onSuccess()
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
