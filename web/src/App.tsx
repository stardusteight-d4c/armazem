import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Feed, Login } from './pages'
import { handleSwitchTheme } from './store'
import { useAppDispatch } from './store/hooks'

interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()
  const [mounted, setMounted] = useState(false)

   // After mounting, we have access to the theme in localStorage
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [mounted])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
