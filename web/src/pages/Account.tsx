import { useEffect, useState } from 'react'
import {
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
import { dataByUsername } from '../services/api-routes'
import { useLocation, useParams } from 'react-router-dom'
import { Comments } from '../components/account/Comments'
import { Loader } from '../components/Loader'
import { askToRequestAgain, handleUserMetadata } from '../store'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {}

export const Account = (props: Props) => {
  const dispatch = useAppDispatch()
  const { username } = useParams()
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [loading, setLoading] = useState(true)
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${dataByUsername}/${username}`)
      dispatch(handleUserMetadata(data.user))
    })()
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [username, requestAgain])

  const dataLoaded =
    currentAccount.user !== undefined && userMetadata !== null && username

  return (
      <div
        className={`${style.gridContainer} ${
          minimizeSidebar ? 'grid-cols-18' : 'grid-cols-5'
        }`}
      >
        <Sidebar />
        <div
          className={`${style.mainContent} ${
            minimizeSidebar ? 'col-span-17' : 'col-span-4'
          }`}
        >
          <Navbar />
          {dataLoaded && !loading ? (
            <main>
              <Header
                userMetadata={userMetadata}
                currentAccount={currentAccount}
              />
              <div className="p-4 pb-14">
                <StatusBar />
                <Favorites />
                <LastPosts userMetadata={userMetadata} />
                <SharedPosts userMetadata={userMetadata} />
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
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
