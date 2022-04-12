import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Input, Screen } from "../../components"
import { color } from "../../theme"
import styled from "styled-components/native"
import { perfectHeight } from "../../utils/commonFunctions"
import { useForm} from "react-hook-form"
import { createPost } from "./actions"
import { useNavigation } from "@react-navigation/native"
import Toast from "react-native-toast-message"

export const CreatePostScreen: FC<StackScreenProps<NavigatorParamList, "createPost">> = observer(
  function CreatePostScreen() {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues,
      reset,
    } = useForm()

    useEffect(() => {
      register("postTitle", {
        required: "Please enter post title",
      })
      register("postBody", {
        required: "Please enter post body",
      })
    }, [register])

    const onPostSubmit = (values) => {
      setLoader(true)
      createPost({
        title: values.postTitle,
        body: values.postBody,
      })
        .then(() => {
          reset()
          Toast.show({
            type: "success",
            text1: "Post created successfully!",
          })
          navigation.navigate("Home")
        })
        .finally(() => {
          setLoader(false)
        })
    }

    return (
      <Screen style={ROOT} preset="scroll">
        <Header title={"Hello!"} />
        <MainContainer>
          <Input
            title={"Post Title"}
            placeholder={"Dogs"}
            defaultValue={getValues("postTitle")}
            onChangeText={(postTitle) => {
              setValue("postTitle", postTitle)
            }}
            error={errors?.postTitle?.message}
          />
          <Input
            title={"Post Body"}
            placeholder={"bla bla bla!"}
            onChangeText={(postBody) => {
              setValue("postBody", postBody)
            }}
            defaultValue={getValues("postBody")}
            multiline
            error={errors?.postBody?.message}
          />
          <Button text="submit" loader={loader} onPress={handleSubmit(onPostSubmit)} />
        </MainContainer>
      </Screen>
    )
  },
)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const MainContainer = styled.View`
  width: 90%;
  height: ${perfectHeight(50)}px;
  align-self: center;
  justify-content: space-evenly;
`
