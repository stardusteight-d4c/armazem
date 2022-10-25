import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Account, Feed, Login } from './pages'
import { handleSwitchTheme } from './store'
import { useAppDispatch } from './store/hooks'


interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()

   // After mounting, we have access to the theme in localStorage
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
        <Route path="/:username" element={<Account />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
