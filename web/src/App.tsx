import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { EditProfileImageModal, PostInputModal } from './components'
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

  // After mounting, we have access to the theme in localStorage
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [])

  useEffect(() => {
    const session = sessionStorage.getItem('session')
    if (session) {
      ;(async () => {
        try {
          const parsed = JSON.parse(session) //get raw token: "token" -> token
          const { data } = await axios.post(authorization, null, {
            headers: {
              Authorization: parsed,
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
  }, [])

  console.log(openModal)

  return (
    <>
      {openModal === 'EditProfileImage' && <EditProfileImageModal />}
      {openModal === 'PostInput' && <PostInputModal />}
      <div
        className='max-h-screen overflow-y-scroll'
      >
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
