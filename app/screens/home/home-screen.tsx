import React, { FC, useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header, Screen, Dropdown, Post, Button, VerticalSpace } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { getAllUsers, getUserPosts } from "./actions"
import GeneralContext from "../../context/GeneralContext"
import styled from "styled-components/native"
import { hasMoreToFetch, perfectHeight } from "../../utils/commonFunctions"
import Typography from "../../components/Typography"

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    const { setActiveUser, activeUser } = useContext(GeneralContext)
    // dropdown data
    const [modalVisible, setModalVisible] = useState(false)
    const [usersData, setUsersData] = useState([])
    const [usersDataPage, setUsersDataPage] = useState(1)
    const [usersLoadMoreLoader, setUsersLoadMoreLoader] = useState(false)
    const [userDataInfo, setUserDataInfo] = useState()
    // posts data
    const [loader, setLoader] = useState(false)
    const [postsDataPage, setPostsDataPage] = useState(0)
    const [postsInfo, setPostsInfo] = useState()
    const [postsLoadMoreLoader, setPostsLoadMoreLoader] = useState(false)
    const [posts, setPosts] = useState([])

    const navigation = useNavigation()

    // FUNCTIONS SECTION
    const getUsers = async (page) => {
      // get all users
      getAllUsers({
        page: page,
      })
        .then((res) => {
          setUsersData([...usersData, ...res.data])
          setUserDataInfo(res)
        })
        .finally(() => {
          setUsersLoadMoreLoader(false)
        })
    }

    const getPosts = (page) => {
      // get all posts
      getUserPosts({
        userId: activeUser.id,
        page: page,
      })
        .then((res) => {
          setPosts([...posts, ...res.data])
          setPostsInfo(res)
        })
        .finally(() => {
          setLoader(false)
          setPostsLoadMoreLoader(false)
        })
    }

    const getUsersNextPage = () => {
      setUsersLoadMoreLoader(true)
      setUsersDataPage(usersDataPage + 1)
      getUsers(usersDataPage + 1)
    }

    const getPostsNextPage = () => {
      setPostsLoadMoreLoader(true)
      getPosts(postsDataPage + 1)
      setPostsDataPage(postsDataPage + 1)
    }

    // USE_EFFECT SECTION
    useEffect(() => {
      getUsers(usersDataPage)
    }, [])

    useEffect(() => {
      // get active user posts once selected
      if (activeUser?.id) {
        setLoader(true)
        getPosts(postsDataPage)
      }
    }, [activeUser])

    return (
      <>
        <Dropdown
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={usersData}
          onDataPress={(data) => {
            setModalVisible(false)
            setActiveUser(data)
          }}
          activeData={activeUser}
          nextPage={getUsersNextPage}
          currentPage={usersDataPage}
          totalDataCount={userDataInfo?.total}
          loadMoreLoader={usersLoadMoreLoader}
        />
        <Header
          title={"Welcome Moustafa!"}
          onSelectUserPress={() => {
            setModalVisible(true)
          }}
        />
        <Screen style={ROOT} preset="scroll" unsafe>
          {loader ? (
            <Loader size={"small"} color={color.palette.orangeDarker} />
          ) : posts.length > 0 ? (
            <>
              {posts.map((post, index) => (
                <Post
                  post={post}
                  key={index}
                  onPress={() => {
                    navigation.navigate("postDetails", { postId: post.id })
                  }}
                />
              ))}
              <VerticalSpace height={2} />
              {hasMoreToFetch(posts.length, postsInfo.total) && (
                <Button
                  text="load more"
                  loader={postsLoadMoreLoader}
                  onPress={() => {
                    getPostsNextPage()
                  }}
                />
              )}
            </>
          ) : (
            <Typography
              text={"No posts yet"}
              width={"100%"}
              marginTop={perfectHeight(20)}
              textAlign={"center"}
              fontWeight="bold"
            />
          )}
        </Screen>
      </>
    )
  },
)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingBottom: perfectHeight(1),
}

const Loader = styled(ActivityIndicator)`
  margin-top: ${perfectHeight(10)}px;
`
