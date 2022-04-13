import React, { FC, useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header, Screen, Dropdown, Post, Button, VerticalSpace, Tags } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { getAllTags, getAllUsers, getFilteredPosts, getUserPosts } from "./actions"
import GeneralContext from "../../context/GeneralContext"
import styled from "styled-components/native"
import { hasMoreToFetch, perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import Typography from "../../components/Typography"

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    const navigation = useNavigation()
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
    // tag data
    const [tags, setTags] = useState([])
    const [tagsLoader, setTagsLoader] = useState(false)
    const [selectedTag, setSelectedTag] = useState(undefined)

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

    const getTags = () => {
      // get all tags
      setTagsLoader(true)
      getAllTags()
        .then((res) => {
          setTags(res.data)
        })
        .finally(() => {
          setTagsLoader(false)
        })
    }

    const getUsersNextPage = () => {
      setUsersLoadMoreLoader(true)
      setUsersDataPage(usersDataPage + 1)
      getUsers(usersDataPage + 1)
    }

    const getPostsNextPage = () => {
      setPostsLoadMoreLoader(true)
      if (selectedTag !== "") {
        filterData(postsDataPage + 1)
      } else {
        getPosts(postsDataPage + 1)
      }
      setPostsDataPage(postsDataPage + 1)
    }

    const filterData = (page) => {
      getFilteredPosts({
        tag: selectedTag,
        page: page,
      })
        .then((res) => {
          setPosts([...posts, ...res.data])
          setPostsInfo(res)
        })
        .finally(() => {
          setPostsLoadMoreLoader(false)
          setLoader(false)
        })
    }

    // USE_EFFECT SECTION
    useEffect(() => {
      getTags()
      getUsers(usersDataPage)
    }, [])

    useEffect(() => {
      // get active user posts once selected
      if (activeUser?.id) {
        setLoader(true)
        getPosts(postsDataPage)
      }
    }, [activeUser])

    useEffect(() => {
      if (selectedTag !== "") {
        setLoader(true)
        filterData(postsDataPage)
      }
    }, [selectedTag])

    return (
      <>
        <Dropdown
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={usersData}
          onDataPress={(data) => {
            setPosts([])
            setSelectedTag(undefined)
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
          {tagsLoader ? (
            <Loader size={"small"} color={color.palette.redDarker} withMargin={2} />
          ) : (
            <TagsScrollView horizontal>
              <TagsContainer>
                {tags.map((tag, index) => (
                  <SingleTagContainer
                    title={tag}
                    key={index}
                    isActive={selectedTag === tag}
                    onPress={() => {
                      setPosts([])
                      setActiveUser({})
                      setSelectedTag(tag)
                    }}
                  />
                ))}
              </TagsContainer>
            </TagsScrollView>
          )}
          {loader ? (
            <Loader size={"small"} color={color.palette.redDarker} withMargin={10} />
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
  margin-top: ${({ withMargin }) => withMargin && perfectHeight(withMargin)}px;
  align-self: center;
  width: 90%;
  justify-content: center;
`

const TagsScrollView = styled.ScrollView`
  width: 90%;
  height: ${perfectHeight(6)}px;
  align-self: center;
`

const TagsContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
`

const SingleTagContainer = styled(Tags)`
  margin-right: ${perfectWidth(2)}px;
`
