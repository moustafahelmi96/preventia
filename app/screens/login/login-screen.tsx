import React, { FC, useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Input, Screen } from "../../components"
// import { useStores } from "../../models"
import { color } from "../../theme"
import styled from "styled-components/native"
import { perfectWidth } from "../../utils/commonFunctions"
import Typography from "../../components/Typography"
import { login } from "./actions"
import Toast from "react-native-toast-message"
import GeneralContext from "../../context/GeneralContext"
import { useForm } from "react-hook-form"
import { emailRegex } from "../../config/regex"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  function LoginScreen() {
    const { authorizeUser, setIsAdmin } = useContext(GeneralContext)
    const [loader, setLoader] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()

    const onLoginSubmit = async (values: any) => {
      const onSuccess = () => {
        authorizeUser(values.email)
        Toast.show({
          type: "success",
          text1: "Welcome!",
          text2: `Welcome back ${values.email}!`,
        })
      }
      try {
        setLoader(true)
        await login({
          email: values.email.toLowerCase(),
          password: values.password,
          setIsAdmin,
          onSuccess,
        })
      } finally {
        setLoader(false)
      }
    }

    useEffect(() => {
      register("email", {
        required: "Please enter your email",
        pattern: { value: emailRegex, message: "Please enter a valid email" },
      })
      register("password", {
        required: "Please enter your password",
      })
    }, [register])

    return (
      <Screen style={ROOT} preset="fixed">
        <MainContainer>
          <CurvedContainer>
            <Typography text="Login" size={40} />
            <Container>
              <Input
                title="Email"
                placeholder="eve.holt@reqres.in"
                keyboardType="email-address"
                onChangeText={(value) => {
                  setValue("email", value)
                }}
                error={errors?.email?.message}
              />
              <Input
                title="Password"
                placeholder="cityslicka"
                secureTextEntry
                onChangeText={(value) => {
                  setValue("password", value)
                }}
                error={errors?.password?.message}
              />
            </Container>
            <Button text="Login" width={80} loader={loader} onPress={handleSubmit(onLoginSubmit)} />
          </CurvedContainer>
        </MainContainer>
      </Screen>
    )
  },
)

const ROOT = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const MainContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background-color: ${color.palette.lightGrey};
`

const CurvedContainer = styled.View`
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: space-evenly;
  border-top-left-radius: ${perfectWidth(20)}px;
  background-color: ${color.palette.white};
`

const Container = styled.View`
  width: 90%;
  height: ${perfectWidth(55)}px;
  justify-content: space-between;
  align-self: center;
`
