import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Favorites,
  Header,
  LastPosts,
  LastUpdates,
  Navbar,
  SharedPosts,
  Sidebar,
  StatusBar,
} from '../components'
import { useAppSelector } from '../store/hooks'
import axios from 'axios'
import { dataByUsername, userData } from '../services/api-routes'
import { useLocation } from 'react-router-dom'
import { Comments } from '../components/account/Comments'
import { Loader } from '../components/Loader'

interface Props {}

export const Account = (props: Props) => {
  const [account, setAccount] = useState<User | null>(null)
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const location = useLocation()
  const username = location.pathname

  // CRIAR UM MODELO SÓ PARA CONTA E REFERÊNCIAR O USUÁRIO,
  // POIS ACCOUNT PODE TER CONNECTIOS, FAVORITES, READING E MAIS INFORMAÇÕES

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${dataByUsername}${username}`)
      setAccount(data.user)
    })()
  }, [username])

  console.log('currentUser', currentUser)
  console.log('account', account)

  return (
    <div className={style.gridContainer}>
      <Sidebar />
      <div className={style.mainContent}>
        <Navbar />
        {account ? (
          <main>
            <Header account={account} />
            <div className="p-4">
              <StatusBar />
              <Favorites />
              <LastPosts />
              <SharedPosts />
              <LastUpdates />
              <Comments />
            </div>
          </main>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
          </div>
        )}
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto  text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
