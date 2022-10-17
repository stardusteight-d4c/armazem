import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Feed, Login } from './pages'

interface Props {}

export const App = (props: Props) => {
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
