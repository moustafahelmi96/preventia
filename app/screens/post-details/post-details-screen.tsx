import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Comment, Header, Post, Screen } from "../../components"
import { color } from "../../theme"
import { getPostComments, getPostDetails } from "./actions"
import styled from "styled-components/native"
import { perfectHeight } from "../../utils/commonFunctions"

// @ts-ignore
export const PostDetailsScreen: FC<StackScreenProps<NavigatorParamList, "postDetails">> = observer(
  function PostDetailsScreen({ route }) {
    const { postId } = route.params
    const [loader, setLoader] = useState(false)
    const [post, setPost] = useState()
    const [postComments, setPostComments] = useState([])

    const postDetails = () => {
      setLoader(true)
      getPostDetails({
        postId: postId,
      })
        .then((res) => {
          setPost(res)
        })
        .finally(() => {
          setLoader(false)
        })
      getPostComments({
        postId: postId,
      }).then((res) => {
        setPostComments(res.data)
      })
    }

    const renderComments = () => (
      <CommentsContainer>
        {postComments.map((comment, index) => (
          <Comment
            comment={comment.message}
            userImage={comment.owner.picture}
            userName={`${comment.owner.firstName} ${comment.owner.lastName}`}
            key={index}
          />
        ))}
      </CommentsContainer>
    )

    useEffect(() => {
      postDetails()
    }, [postId])

    return (
      <>
        <Header back />
        <Screen style={ROOT} preset="fixed">
          {loader || post === undefined ? (
            <Loader size={"small"} color={color.palette.redDarker} />
          ) : (
            <>
              <Post post={post} />
              {renderComments()}
            </>
          )}
        </Screen>
      </>
    )
  },
)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
}

const Loader = styled(ActivityIndicator)`
  margin-top: ${perfectHeight(10)}px;
`

const CommentsContainer = styled.ScrollView`
margin-top: ${perfectHeight(1)}px;
`
