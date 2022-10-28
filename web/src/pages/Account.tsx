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
import { useAppDispatch, useAppSelector } from '../store/hooks'
import axios from 'axios'
import { dataByUsername, userData } from '../services/api-routes'
import { useLocation } from 'react-router-dom'
import { Comments } from '../components/account/Comments'
import { Loader } from '../components/Loader'
import { handleUserMetadata } from '../store'
import { getCurrentUserAccount } from '../store/reducers/current-user-data'

interface Props {}

export const Account = (props: Props) => {
  // const [account, setAccount] = useState<User | null>(null)
  const dispatch = useAppDispatch()
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)

  const location = useLocation()
  const username = location.pathname

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${dataByUsername}${username}`)
      dispatch(handleUserMetadata(data.user))
    })()
  }, [username, requestAgain])

  // console.log('account', account)
  // console.log(username);
  // Limpar dados de account quando deslogar

  const dataLoaded =
    currentAccount.user !== undefined && userMetadata !== null && username

  return (
    <div className={style.gridContainer}>
      <Sidebar />
      <div className={style.mainContent}>
        <Navbar />
        {dataLoaded ? (
          <main>
            <Header
              userMetadata={userMetadata}
              currentAccount={currentAccount}
            />
            <div className="p-4">
              <StatusBar />
              <Favorites />
              <LastPosts />
              <SharedPosts />
              <LastUpdates />
              <Comments userMetadata={userMetadata} />
            </div>
          </main>
        ) : (
          <div className="w-full h-screen -mt-28 flex items-center justify-center">
            <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
          </div>
        )}
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto  text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
