import React from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"
import Modal from "react-native-modal"
import { ProfileRoundedImage } from "../profile-rounded-image/profile-rounded-image"
import { VerticalSpace } from "../vertical-space/vertical-space"
import { Button } from "../button/button"

export interface UsersDropdownProps {
  // data to be displayed
  data: any
  // modal is visible boolean
  modalVisible: boolean
  // set modal is visible boolean
  setModalVisible: any
  // on dropdown data selected
  onDataPress: any
  // already selected data object
  activeData: any
  // call get next data "page"
  nextPage?: any
  // total number of pages
  totalPages?: number
  // current page number
  currentPage?: number
  // set current page number
  setCurrentPage?: any
  // load more loader button
  loaderMoreLoader?: boolean
}

/**
 * Describe your component here
 */
export const UsersDropdown = observer(function UsersDropdown(props: UsersDropdownProps) {
  const {
    data,
    modalVisible,
    setModalVisible,
    onDataPress,
    activeData,
    nextPage,
    totalPages,
    currentPage,
    loaderMoreLoader,
  } = props
  return (
    <ModalContainer
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false)
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <VerticalSpace height={5} />
      <Typography
        text="All users"
        size={40}
        width={perfectWidth(100)}
        textAlign="center"
        color={color.palette.white}
      />
      <ModalBase>
        {(data || [].length > 0) &&
          data.map((item, index) => {
            const isActive = item?.id === activeData?.id
            return (
              <ModalItem
                key={index}
                active={isActive}
                onPress={() => {
                  onDataPress(item)
                }}
              >
                <ProfileRoundedImage image={item.avatar} />
                <UserInfo>
                  <Typography
                    color={isActive ? color.palette.white : color.palette.black}
                    text={`${item.first_name} ${item.last_name}`}
                    width={"65%"}
                    fontWeight="bold"
                  />
                  <Typography
                    color={isActive ? color.palette.white : color.palette.black}
                    text={item.email}
                    width={"100%"}
                  />
                </UserInfo>
              </ModalItem>
            )
          })}
        <VerticalSpace height={2} />
        {currentPage < totalPages && (
          <Button
            text="load more"
            loader={loaderMoreLoader}
            onPress={() => {
              nextPage()
            }}
          />
        )}
      </ModalBase>
    </ModalContainer>
  )
})

const ModalContainer = styled(Modal)`
  width: 100%;
  align-self: center;
  justify-content: space-between;
  background-color: ${color.palette.transparentBlack};
`

const ModalBase = styled.ScrollView`
  width: 100%;
  max-height: 80%;
  padding-bottom: 5%;
  background-color: ${color.palette.lightGrey};
  border-top-left-radius: ${perfectWidth(20)}px;
`

const ModalItem = styled.TouchableOpacity`
  width: 90%;
  height: ${perfectHeight(9)}px;
  margin-top: ${perfectHeight(2)}px;
  border-top-left-radius: ${perfectWidth(5)}px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-self: center;
  padding-horizontal: ${perfectWidth(2)}px;
  background-color: ${({ active }) => (active ? color.palette.black : color.palette.white)};
`

const UserInfo = styled.View`
  height: 70%;
  width: 70%;
  justify-content: space-evenly;
`
