import React, { FC, useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header, Screen, UsersDropdown } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { getAllUsers } from "./actions"
import GeneralContext from "../../context/GeneralContext"

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false)
    const [usersData, setUsersData] = useState([])
    const { setActiveUser, activeUser } = useContext(GeneralContext)
    const [usersDataPage, setUsersDataPage] = useState(1)
    const [loaderMoreLoader, setLoaderMoreLoader] = useState(false)
    const [info, setInfo] = useState()
    // const navigation = useNavigation()

    const getUsersNextPage = () => {
      setLoaderMoreLoader(true)
      setUsersDataPage(usersDataPage + 1)
      getUsers(usersDataPage + 1)
    }

    const getUsers = async (page) => {
      // get all users
      try {
        getAllUsers({
          page: page,
        }).then((res) => {
          setUsersData([...usersData, ...res.data])
          setInfo(res)
        })
      } finally {
        setLoaderMoreLoader(false)
      }
    }

    useEffect(() => {
      getUsers(usersDataPage)
    }, [])

    useEffect(() => {
      // get active user posts once selected
    }, [activeUser])

    return (
      <Screen style={ROOT} preset="scroll">
        <Header
          title={"Welcome Moustafa!"}
          onSelectUserPress={() => {
            setModalVisible(true)
          }}
        />
        <UsersDropdown
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
          totalPages={info?.total_pages}
          loaderMoreLoader={loaderMoreLoader}
        />
      </Screen>
    )
  },
)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
