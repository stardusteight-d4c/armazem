import React, { useState } from 'react'
import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

interface Props {
  account: User
}

export const Header = ({ account }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  return (
    <>
      <div className="relative">
        <img
          className="w-full h-[300px]"
          src={account.cover_img}
          alt="cover/img"
        />
        {account._id === currentUser?._id && (
          <div className="ri-image-edit-fill  text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong flex items-center justify-center w-10 h-10 text-xl absolute top-5 right-5 cursor-pointer rounded-full" />
        )}
        <img
          className="w-40 h-40 bg-white dark:bg-fill-strong p-2 object-cover absolute -bottom-20 left-4"
          src={account.user_img}
          alt=""
        />
        {account._id === currentUser?._id && (
          <div
            onClick={() => dispatch(handleOpenModal('EditProfileImage'))}
            className="ri-pencil-fill  text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong flex items-center justify-center w-10 h-10 text-xl absolute z-20 bottom-12 left-36 cursor-pointer rounded-full"
          />
        )}
        <div className="absolute left-[185px] -bottom-[75px]">
          <div className="flex items-center gap-x-4">
            <h2 className="text-4xl font-semibold mr-4 text-black dark:text-white">
              {account.name}
            </h2>
            {account._id !== currentUser?._id && (
              <>
                <div className="flex cursor-pointer items-center">
                  <i className="ri-link mr-1" />
                  <span>Request</span>
                </div>
                <div className="flex cursor-pointer items-center">
                  <i className="ri-message-3-line mr-1" />
                  <span>Send message</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center text-lg">@{account?.username}</div>
        </div>
      </div>
    </>
  )
}
