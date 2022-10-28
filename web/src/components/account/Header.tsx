import axios from 'axios'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { sendRequest } from '../../services/api-routes'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { error, success } from '../Toasters'

interface Props {
  userMetadata: User
  currentAccount: Account
}

export const Header = ({ userMetadata, currentAccount }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const sendRequestToUser = async () => {
    try {
      const { data } = await axios.post(sendRequest, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      if (data.status === true) {
        success(data.msg)
        dispatch(askToRequestAgain())
      } else if (data.status === false) {
        error(data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('currentAccount', currentAccount)

  // who sent
  const requestAlreadySentStatus = () => {
    const verificationResult = currentAccount.requestsSent.map((requests) => {
      if (requests.to === userMetadata._id) {
        return true
      } else {
        return false
      }
    })
    return verificationResult[0]
  }

  // who received
  const requestAlreadyReceivedStatus = () => {
    const verificationResult = currentAccount?.requestsReceived?.map(
      (requests) => {
        if (requests.from == userMetadata._id) {
          return true
        } else {
          return false
        }
      }
    )
    return verificationResult[0]
  }

  const HandleRequestComponent = () => {
    if (requestAlreadySentStatus()) {
      return (
        <div className="text-[#eb7140] flex cursor-pointer items-center">
          <i className="ri-link mr-1" />
          <span>Request sent</span>
        </div>
      )
    }
    if (requestAlreadyReceivedStatus()) {
      return (
        <div className="text-prime-blue flex cursor-pointer items-center">
          <i className="ri-link mr-1" />
          <span>Accept request</span>
          {/* Fazer menu dropdown com reject e accept */}
        </div>
      )
    } else {
      return (
        <div className="flex cursor-pointer items-center">
          <i className="ri-link mr-1" />
          <span onClick={sendRequestToUser}>Send request</span>
        </div>
      )
    }
  }

  return (
    <>
      <div className="relative">
        <img
          className="w-full h-[300px]"
          src={userMetadata.cover_img}
          alt="cover/img"
        />
        {userMetadata._id === currentUser?._id && (
          <div
            onClick={() => dispatch(handleOpenModal('EditCoverImage'))}
            className="ri-image-edit-fill  text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong flex items-center justify-center w-10 h-10 text-xl absolute top-5 right-5 cursor-pointer rounded-full"
          />
        )}
        <img
          className="w-40 h-40 bg-white dark:bg-fill-strong p-2 object-cover absolute -bottom-20 left-4"
          src={userMetadata.user_img}
          alt=""
        />
        {userMetadata._id === currentUser?._id && (
          <div
            onClick={() => dispatch(handleOpenModal('EditProfileImage'))}
            className="ri-pencil-fill  text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong flex items-center justify-center w-10 h-10 text-xl absolute z-20 bottom-12 left-36 cursor-pointer rounded-full"
          />
        )}
        <div className="absolute left-[185px] -bottom-[75px]">
          <div className="flex items-center gap-x-4">
            <h2 className="text-4xl font-semibold mr-4 text-black dark:text-white">
              {userMetadata.name}
            </h2>
            {userMetadata._id !== currentUser?._id && (
              <>
                <HandleRequestComponent />
                <div className="flex cursor-pointer items-center">
                  <i className="ri-message-3-line mr-1" />
                  <span>Send message</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center text-lg">
            @{userMetadata?.username}
          </div>
        </div>
      </div>
      '
    </>
  )
}
