import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Account, Connections, Feed, Login, PageNotFound, Post } from './pages'
import { activeUser, authorization } from './services/api-routes'
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
import { io } from 'socket.io-client'

interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const session = localStorage.getItem('session')
  const usersSearch = useAppSelector((state) => state.armazem.usersSearch)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)

  const location = useLocation()

  // // Connect user to WB
  // const socket = useRef<any>()
  // useEffect(() => {
  //   if (currentUser !== null) {
  //      socket.current = io('http://localhost:5000', {
  //       withCredentials: true,
  //     })
  //     socket.current.emit('logged-in', {
  //       userId: currentUser._id,
  //       username: currentUser.username,
  //     })
  //   }
  // }, [currentUser, session])

  // A cada um minuto atualizar o status de ativo do usuário, mandar data de agora

  useEffect(() => {
    if (currentUser?._id !== undefined) {
      handleTimeout()
      ;(async () => {
        await axios.post(`${activeUser}/${currentUser?._id}`)
      })()
      setLoading(false)
    }
  }, [currentUser, active])

  function handleTimeout() {
    setTimeout(() => {
      setActive(!active)
    }, 60000)
  }

  // After mounting, we have access to the theme in localStorage
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [])

  // Session middleware
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/') {
      setLoading(true)
    }
    if (session) {
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
            if (location.pathname === '/login') {
              navigate('/')
            }
            setLoading(false)
          } else {
            setLoading(false)
            navigate('/login')
          }
        } catch (err) {
          console.error(err)
          setLoading(false)
          navigate('/login')
        }
      })()
    } else {
      setLoading(false)
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
      <Toaster position="top-left" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
        <Route path="/:username" element={<Account />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

const loader = {
  container: `w-screen bg-fill-weak dark:bg-fill-strong h-screen flex items-center justify-center`,
  loader: `border-black dark:border-white !w-16 !h-16 !border-[8px]`,
}
