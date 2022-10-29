import axios from 'axios'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import {
  addConnection,
  rejectConnection,
  removeConnection,
  sendRequest,
} from '../../services/api-routes'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { error, success } from '../Toasters'
import { Menu } from '@headlessui/react'

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

  const createConnection = async () => {
    try {
      const { data } = await axios.post(addConnection, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      dispatch(askToRequestAgain())
    } catch (error) {
      console.log(error)
    }
  }

 const deleteUserConnection = async () => {
  try {
    const { data } = await axios.post(removeConnection, {
      to: userMetadata._id,
      from: currentUser?._id,
    })
    dispatch(askToRequestAgain())
  } catch (error) {
    console.log(error)
  }
}

  const rejectRequestConnection = async () => {
    try {
      const { data } = await axios.post(rejectConnection, {
        to: userMetadata._id,
        from: currentUser?._id,
      })
      dispatch(askToRequestAgain())
    } catch (error) {
      console.log(error)
    }
  }

  const unsendRequestConnection = async () => {
    try {
      const { data } = await axios.post(rejectConnection, {
        to: currentUser?._id,
        from: userMetadata._id,
      })
      dispatch(askToRequestAgain())
    } catch (error) {
      console.log(error)
    }
  }

  //

  // Who sent
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

  // Who received
  const requestAlreadyReceivedStatus = () => {
    const verificationResult = currentAccount.requestsReceived.map(
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

  const connectWithThisUser = () => {
    const verificationResult = currentAccount.connections.map((connection) => {
      if (connection.with == userMetadata._id) {
        return true
      } else {
        return false
      }
    })
    return verificationResult[0]
  }

  const HandleRequestComponent = () => {
    // criar um componente para cada estado e chamar aqui
    if (requestAlreadySentStatus()) {
      return (
        <div className="relative z-50 text-orange flex cursor-pointer items-center">
          <Menu>
            <Menu.Button>
              <i className="ri-link mr-1" />
              <span>Request sent</span>
            </Menu.Button>
            <Menu.Items className="transition-all duration-200 hover:brightness-125 drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20 rounded-md p-1 absolute flex flex-col items-startS justify-start left-7 -bottom-[75px] z-50 h-fit text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong">
              <Menu.Item>
                <span
                  onClick={unsendRequestConnection}
                  className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Unsend
                </span>
              </Menu.Item>
              <Menu.Item>
                <span className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
                  Cancel
                </span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      )
    }
    if (requestAlreadyReceivedStatus()) {
      return (
        <div className="relative text-prime-blue flex cursor-pointer items-center">
          <Menu>
            <Menu.Button>
              <i className="ri-link mr-1" />
              <span>Accept request</span>
            </Menu.Button>
            <Menu.Items className="transition-all duration-200 hover:brightness-125 drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20 rounded-md p-1 absolute flex flex-col items-startS justify-start left-10 -bottom-[75px] z-50 h-fit text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong">
              <Menu.Item>
                <span
                  onClick={createConnection}
                  className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Accept
                </span>
              </Menu.Item>
              <Menu.Item>
                <span
                  onClick={rejectRequestConnection}
                  className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Reject
                </span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
          {/* Fazer menu dropdown com reject e accept,
           também deixar uma lista em connectios e no dropdown de notificações, ao aceitar colocar
           o usuário em connectios em ambas contas, ao rejeitar deletar de requestsReceived e requestsSent, 
           notificar com web sockets que a solicitação foi aceita, ou recusada.
           */}
        </div>
      )
    }
    if (connectWithThisUser()) {
      return (
        <>
          <div className="relative text-green flex cursor-pointer items-center">
            <Menu>
              <Menu.Button>
                <i className="ri-link mr-1" />
                <span>Connected</span>
                <Menu.Items className="transition-all duration-200 hover:brightness-125 drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20 rounded-md p-1 absolute flex flex-col items-startS justify-start left-4 -bottom-[75px] z-50 h-fit text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong">
                  <Menu.Item>
                    <span
                      onClick={deleteUserConnection}
                      className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                    >
                      Remove
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <span className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
                      Cancel
                    </span>
                  </Menu.Item>
                </Menu.Items>
              </Menu.Button>
            </Menu>
          </div>
          <div className="flex cursor-pointer items-center">
            <i className="ri-message-3-line mr-1" />
            <span>Send message</span>
          </div>
        </>
      )
    } else {
      return (
        <div className="relative flex cursor-pointer items-center">
          <Menu>
            <Menu.Button>
              <i className="ri-link mr-1" />
              <span>Send request</span>
            </Menu.Button>
            <Menu.Items className="transition-all duration-200 hover:brightness-125 drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20 rounded-md p-1 absolute flex flex-col items-startS justify-start left-8 -bottom-[75px] z-50 h-fit text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong">
              <Menu.Item>
                <span
                  onClick={sendRequestToUser}
                  className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Send
                </span>
              </Menu.Item>
              <Menu.Item>
                <span className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
                  Cancel
                </span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
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
              </>
            )}
          </div>
          <div className="flex items-center text-lg">
            @{userMetadata?.username}
          </div>
        </div>
      </div>
    </>
  )
}
