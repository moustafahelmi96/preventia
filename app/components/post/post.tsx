import React from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"
import { ProfileRoundedImage } from "../profile-rounded-image/profile-rounded-image"
import { Tags } from "../tags/tags"

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  post: any
}

/**
 * Describe your component here
 */
export const Post = observer(function Post(props: PostProps) {
  const { post } = props
  return (
    <MainContainer>
      <ProfileContainer>
        <ProfileRoundedImage image={post.owner.picture} size={14} />
        <Typography text={`${post.owner.firstName} ${post.owner.lastName}`} width={"80%"} noLimit />
      </ProfileContainer>
      <Container>
        <Typography text={post.text} noLimit />
        <Image source={{ uri: post.image }} resizeMode={"cover"} />
        <TagsContainer>
          {post.tags.map((tag, index) => (
            <Tags title={tag} key={index} />
          ))}
        </TagsContainer>
      </Container>
    </MainContainer>
  )
})

const MainContainer = styled.Pressable.attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})`
  width: 90%;
  align-self: center;
  padding-vertical: ${perfectHeight(1)}px;
  margin-top: ${perfectHeight(2)}px;
  background-color: ${color.palette.white};
  border-top-left-radius: ${perfectWidth(7)}px;
  border-radius: ${perfectWidth(2)}px;
`

const ProfileContainer = styled.View`
  width: 90%;
  height: ${perfectHeight(8)}px;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Container = styled.View`
  width: 90%;
  align-self: center;
  justify-content: center;
`

const Image = styled.Image`
  width: 100%;
  height: ${perfectHeight(20)}px;
  align-self: center;
  border-radius: ${perfectWidth(2)}px;
  margin-vertical: ${perfectHeight(1)}px;
`

const TagsContainer = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
`
