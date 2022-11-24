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
import { ConnectionStatus } from '../ConnectionStatus'

interface Props {
  userMetadata: User
  currentAccount: Account
}

export const Header = ({ userMetadata, currentAccount }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  function timeago() {
    return Number(
      Math.abs(
        (new Date().getTime() - new Date(userMetadata.lastActivity).getTime()) /
          1000
      ).toFixed()
    )
  }

  return (
    <>
      <div className="relative">
        <img
          referrerPolicy="no-referrer"
          className="w-full border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 h-[250px] md:h-[300px]"
          src={userMetadata.cover_img}
          alt="cover/img"
        />
        {userMetadata._id === currentUser?._id && (
          <div
            onClick={() => dispatch(handleOpenModal('EditCoverImage'))}
            className="ri-image-edit-fill transition-all duration-200 hover:brightness-125 flex justify-center items-center p-2 drop-shadow-md rounded-full text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong  w-10 h-10 text-xl absolute z-20 top-5 right-5  cursor-pointer"
          />
        )}
        <div className="relative">
          <div className="w-fit mx-auto md:mx-0 relative">
            <img
              referrerPolicy="no-referrer"
              className="w-28 h-28 md:w-40 md:h-40 bg-fill-weak dark:bg-fill-strong p-2 object-cover mx-auto md:ml-4 -mt-[60px] md:-mt-[85px]"
              src={userMetadata.user_img}
              alt=""
            />
            {userMetadata._id === currentUser?._id && (
              <div
                onClick={() => dispatch(handleOpenModal('EditProfileImage'))}
                className="ri-edit-2-fill transition-all duration-200 hover:brightness-125 flex justify-center items-center p-2 drop-shadow-md rounded-full text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong w-8 h-8 md:w-10 md:h-10 text-xl absolute z-20 -top-2 -right-2 cursor-pointer"
              />
            )}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-1 md:left-44">
            <div className="flex flex-col md:flex-row items-center gap-x-2">
              <h2 className="text-3xl w-[80vw] md:w-fit line-clamp-1 text-center md:text-4xl font-semibold text-black dark:text-white">
                {userMetadata.name}
              </h2>
              {userMetadata._id !== currentUser?._id && (
                <div>
                  <ConnectionStatus
                    userMetadata={userMetadata}
                    currentAccount={currentAccount}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-x-2 text-lg">
              <>
                @{userMetadata?.username}{' '}
                {timeago() <= 65 ? (
                  <div
                    title="Online"
                    className="ri-wifi-fill text-xl rounded-full p-1 cursor-pointer text-green"
                  />
                ) : (
                  <div
                    title="Offline"
                    className="ri-wifi-off-line text-xl rounded-full p-1 cursor-pointer text-orange"
                  />
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
