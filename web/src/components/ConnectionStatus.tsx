import axios from 'axios'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import {
  addConnection,
  rejectConnection,
  removeConnection,
  sendRequest,
} from '../services/api-routes'
import { askToRequestAgain, handleOpenModal } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { error, success } from './Toasters'
import { Menu } from '@headlessui/react'

interface Props {
  userMetadata: User
  currentAccount: Account
}

export const ConnectionStatus = ({ userMetadata, currentAccount}: Props) => {
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
    if (requestAlreadySentStatus()) {
      return (
        <div className="relative z-50 text-orange flex cursor-pointer items-center">
          <Menu>
            <Menu.Button>
              <i className="ri-link mr-1" />
              <span>Request sent</span>
            </Menu.Button>
            <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong left-8 -bottom-[65px]">
              <Menu.Item>
                <span
                  onClick={unsendRequestConnection}
                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Unsend
                </span>
              </Menu.Item>
              <Menu.Item>
                <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
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
            <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong left-8 -bottom-[65px]">
              <Menu.Item>
                <span
                  onClick={createConnection}
                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Accept
                </span>
              </Menu.Item>
              <Menu.Item>
                <span
                  onClick={rejectRequestConnection}
                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Reject
                </span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
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
                <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong left-5 -bottom-[65px]">
                  <Menu.Item>
                    <span
                      onClick={deleteUserConnection}
                      className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                    >
                      Remove
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                      Cancel
                    </span>
                  </Menu.Item>
                </Menu.Items>
              </Menu.Button>
            </Menu>
          </div>
          {/* <div className="flex cursor-pointer items-center">
            <i className="ri-message-3-line mr-1" />
            <span>Send message</span>
          </div> */}
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
            <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong left-8 -bottom-[65px]">
              <Menu.Item>
                <span
                  onClick={sendRequestToUser}
                  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                >
                  Send
                </span>
              </Menu.Item>
              <Menu.Item>
                <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
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
    HandleRequestComponent()
  )
}