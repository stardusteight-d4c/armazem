import axios from 'axios'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Account, Connections, Feed, Login, PageNotFound, Post } from './pages'
import { authorization } from './services/api-routes'
import {
  getCurrentUserAccount,
  getUserData,
} from './store/reducers/current-user-data'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  handleAuthSession,
  handleResultUsersSearch,
  handleSwitchTheme,
} from './store'
import { Loader } from './components/Loader'
import {
  AllPostsModal,
  EditCoverImageModal,
  EditProfileImageModal,
  PostInputModal,
  SharedPostsModal,
} from './components/modals'

interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const session = sessionStorage.getItem('session')
  const usersSearch = useAppSelector((state) => state.armazem.usersSearch)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const [loading, setLoading] = useState(true)

  // After mounting, we have access to the theme in localStorage
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [])

  // Session middleware
  useEffect(() => {
    if (session) {
      setLoading(true)
      ;(async () => {
        try {
          const rawToken = JSON.parse(session)
          const { data } = await axios.post(authorization, null, {
            headers: {
              Authorization: rawToken,
            },
          })
          if (data.status === true) {
            dispatch(handleAuthSession(data.session))
            await dispatch(getUserData())
            await dispatch(getCurrentUserAccount())
            setLoading(false)
          } else {
            navigate('/login')
          }
        } catch (err) {
          console.error(err)
          navigate('/login')
          setLoading(false)
        }
      })()
    } else {
      navigate('/login')
      setLoading(false)
    }
  }, [session, requestAgain])

  const handleSearchResults = () => {
    if (usersSearch !== undefined || usersSearch !== null) {
      dispatch(handleResultUsersSearch(undefined))
    } else {
      return
    }
  }

  function handleOpenModal(openModal: string) {
    switch (openModal) {
      case 'EditProfileImage':
        return <EditProfileImageModal />
      case 'EditCoverImage':
        return <EditCoverImageModal />
      case 'PostInput':
        return <PostInputModal />
      case 'AllPosts':
        return <AllPostsModal />
      case 'SharedPosts':
        return <SharedPostsModal />
    }
  }

  if (loading) {
    return (
      <div className={loader.container}>
        <Loader className={loader.loader} />
      </div>
    )
  }

  return (
    <>
      {openModal && handleOpenModal(openModal)}
      <div onClick={handleSearchResults} className={style.wrapper}>
        <Toaster position="top-left" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Feed />} />
          <Route path="/:username" element={<Account />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}

const style = {
  wrapper: `max-h-screen overflow-x-hidden overflow-y-scroll`,
}

const loader = {
  container: `w-screen bg-fill-weak dark:bg-fill-strong h-screen flex items-center justify-center`,
  loader: `border-black dark:border-white !w-16 !h-16 !border-[8px]`,
}
