import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  EditCoverImageModal,
  EditProfileImageModal,
  PostInputModal,
} from './components'
import { Account, Connections, Feed, Login } from './pages'
import { authorization } from './services/api-routes'
import {
  handleAuthSession,
  handleResultUsersSearch,
  handleSwitchTheme,
} from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { getCurrentUserAccount, getUserData } from './store/reducers/current-user-data'

interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const session = sessionStorage.getItem('session')
  const usersSearch = useAppSelector((state) => state.armazem.usersSearch)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)

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
          await dispatch(getUserData())
          await dispatch(getCurrentUserAccount())
        } catch (error) {
          navigate('/login')
        }
      })()
    } else {
      navigate('/login')
    }
  }, [session, requestAgain])

  const handleSearchResults = () => {
    if (usersSearch !== undefined || usersSearch !== null) {
      dispatch(handleResultUsersSearch(undefined))
    } else {
      return
    }
  }

  return (
    <>
      {openModal === 'EditProfileImage' && <EditProfileImageModal />}
      {openModal === 'EditCoverImage' && <EditCoverImageModal />}
      {openModal === 'PostInput' && <PostInputModal />}
      <div
        onClick={handleSearchResults}
        className="max-h-screen overflow-x-hidden  overflow-y-scroll"
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Feed />} />
          <Route path="/:username" element={<Account />} />
          <Route path="/connections" element={<Connections />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </>
  )
}
