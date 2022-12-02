import axios from 'axios'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  Account,
  Connections,
  Feed,
  Login,
  Manga,
  Collection,
  PageNotFound,
  Post,
  MyList,
  Settings,
} from './pages'
import { PrivateRouteAddManga } from './services/PrivateRoutes'
import { activeUser, authorization } from './services/api-routes'
import {
  getCurrentUserAccount,
  getUserData,
} from './store/reducers/current-user-data'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  handleAuthSession,
  handleMinimizeSidebar,
  handleSwitchTheme,
} from './store'
import { Loader } from './components/Loader'
import {
  AddReviewModal,
  AllPostsModal,
  DesktopChatModal,
  EditCoverImageModal,
  EditProfileImageModal,
  MobileChatModal,
  PostInputModal,
  ReviewModal,
  SharedPostsModal,
} from './components/modals'

interface Props {}

export const App = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const session = localStorage.getItem('session')
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)

  // AFTER MOUTING, WE HAVE ACCESS TO THE THEME IN LOCALSTORAGE
  useEffect(() => {
    dispatch(handleSwitchTheme())
  }, [])

  useEffect(() => {
    dispatch(handleMinimizeSidebar())
  }, [])

  // SET ACTIVE USER MIDDLEWARE
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

  // SESSION MIDDLEWARE
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
            setTimeout(() => {
              setLoading(false)
            }, 1000)
          } else {
            navigate('/login')
            setTimeout(() => {
              setLoading(false)
            }, 1000)
          }
        } catch (err) {
          console.error(err)
          navigate('/login')
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })()
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      navigate('/login')
    }
  }, [session, requestAgain])

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
      case 'AddReview':
        return <AddReviewModal />
      case 'Review':
        return <ReviewModal />
      case 'Chat':
        return <DesktopChatModal />
      case 'ChatMobile':
        return <MobileChatModal />
    }
  }

  if (loading) {
    return (
      <div className={loader.container}>
        <Loader className={loader.loader} />
      </div>
    )
  }

  const html = document.querySelector('html')
  if (html) {
    openModal
      ? (html.style.overflow = 'hidden')
      : (html.style.overflow = 'auto')
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
        <Route path="/collection" element={<Collection />} />
        <Route path="/manga/:id" element={<Manga />} />
        <Route path="/MyList" element={<MyList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addManga" element={<PrivateRouteAddManga />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

const loader = {
  container: `w-screen bg-fill-weak dark:bg-fill-strong h-screen flex items-center justify-center`,
  loader: `border-black dark:border-white !w-16 !h-16 !border-[8px]`,
}
