import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Hero,
  Navbar,
  PopularReadings,
  PostInput,
  RatedMangas,
  RatedPosts,
  Sidebar,
} from '../components'
import { Loader } from '../components/Loader'
import { authorization } from '../services/api-routes'
import { handleAuthSession } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getUserData } from '../store/reducers/current-user-data'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authSession = useAppSelector((state) => state.armazem.authSession)
  const [newPost, setNewPost] = useState(false)

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


  // Hospedar imagens no IPFS

  return (
    <>
      {newPost && <PostInput />}
      {authSession ? (
        <div className={style.gridContainer}>
          <Sidebar />
          <div className={style.mainContent}>
            <Navbar />
            <main className="p-8">
              <Hero />
              <RatedPosts />
              <PopularReadings />
              <RatedMangas />
            </main>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
        </div>
      )}
    </>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
