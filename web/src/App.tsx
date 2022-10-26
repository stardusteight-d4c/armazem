import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  EditCoverImageModal,
  EditProfileImageModal,
  PostInputModal,
} from './components'
import { Account, Feed, Login } from './pages'
import { authorization } from './services/api-routes'
import { handleAuthSession, handleSwitchTheme } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { getUserData } from './store/reducers/current-user-data'

interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const session = sessionStorage.getItem('session')

  // After mounting, we have access to the theme in localStorage
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [])

  useEffect(() => {
    if (session) {
      ;(async () => {
        try {
          const parsedSession = JSON.parse(session) //get raw token: "token" -> token
          const { data } = await axios.post(authorization, null, {
            headers: {
              Authorization: parsedSession,
            },
          })
          if (data.status === false) {
            navigate('/login')
          }
          dispatch(handleAuthSession(data.session))
          dispatch(getUserData())
        } catch (error) {
          navigate('/login')
        }
      })()
    } else {
      navigate('/login')
    }
  }, [session])

  return (
    <>
      {openModal === 'EditProfileImage' && <EditProfileImageModal />}
      {openModal === 'EditCoverImage' && <EditCoverImageModal />}
      {openModal === 'PostInput' && <PostInputModal />}
      <div className="max-h-screen overflow-x-hidden scrollbar-hide overflow-y-scroll">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Feed />} />
          <Route path="/:username" element={<Account />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </>
  )
}
