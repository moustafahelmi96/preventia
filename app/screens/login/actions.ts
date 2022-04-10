import AsyncStorage from "@react-native-async-storage/async-storage"
import { AxiosResponse } from "axios"
import { sendAxiosRequest as AXIOS } from "../../api"
import Toast from "react-native-toast-message"

export const login = (body: any) => {
  const onSuccess = body.onSuccess
  delete body.onSuccess
  return AXIOS({
    url: "/login",
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  })
    .then(
      async (response: AxiosResponse): Promise<any> => {
        if (response) {
          console.log("🚀 ~ file: actions.ts ~ line 18 ~ response", response)
          await AsyncStorage.setItem("token", response?.data?.token)
          onSuccess()
          return response.data
        }
      },
    )
    .catch((err: any) => {
      console.log("🚀 ~ file: actions.ts ~ line 31 ~ login ~ err", err)
      const errorMessage = err?.response?.data?.message || "Error occurred"
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      })
    })
}
