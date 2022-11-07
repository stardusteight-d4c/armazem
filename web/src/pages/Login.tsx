import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignIn, SignUp } from '../components/login'
import { SwitchTheme } from '../components/SwitchTheme'
import { Loader } from '../components/Loader'
import background from '../assets/background.jpg'
import { AnimatePresence } from 'framer-motion'
import { authorization } from '../services/api-routes'
import { useAppDispatch } from '../store/hooks'
import { clearAuthSession, clearCurrentUser } from '../store'
import axios from 'axios'

interface Props {}

export const Login = (props: Props) => {
  const [signIn, setSignIn] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
  }, [])

  const switchForm = {
    signIn: signIn,
    setSignIn: setSignIn,
  }

  useEffect(() => {
    const session = sessionStorage.getItem('session')
    if (session) {
      ;(async () => {
        try {
          const rawToken = JSON.parse(session)
          const { data } = await axios.post(authorization, null, {
            headers: {
              Authorization: rawToken,
            },
          })
          if (data.status === false) {
            setLoading(false)
            return
          } else {
            navigate('/')
          }
        } catch (error) {
          setLoading(false)
        }
      })()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading || undefined) {
    return (
      <div className={loader.container}>
        <Loader className={loader.loader} />
      </div>
    )
  }

  function rendersPageSpan() {
    return (
      <span className="block">
        {signIn
          ? 'Enter the platform and meet the community'
          : 'Create your account and start tracking your manga reading'}
      </span>
    )
  }

  return (
    <>
      <div className={style.wrapper}>
        <section className={grid.container}>
          <div className={style.logoContainer}>
            <i className={style.logoIcon} />
            <h1 className={style.logoText}>Armazem</h1>
          </div>
          <div className={grid.firstColumn}>
            <img
              src={background}
              alt="background/img"
              className={style.backgroundImage}
            />
            <div className={style.pageSpan}>{rendersPageSpan()}</div>
          </div>
          <div className={grid.secondColumn}>
            <AnimatePresence>
              {signIn ? <SignIn {...switchForm} /> : <SignUp {...switchForm} />}
            </AnimatePresence>
          </div>
        </section>
        <div className={style.switch}>
          <SwitchTheme />
        </div>
      </div>
    </>
  )
}

const style = {
  wrapper: `max-w-screen relative min-h-screen overflow-hidden bg-fill-weak dark:bg-fill-strong`,
  logoContainer: `flex absolute top-8 left-4 z-50 cursor-pointer items-center justify-center gap-x-2`,
  logoIcon: `ri-server-fill text-3xl text-fill-weak`,
  logoText: 'text-4xl font-inter text-fill-weak font-bold',
  backgroundImage: `w-screen h-screen absolute inset-0 object-cover object-top opacity-95`,
  pageSpan: `z-10 w-full absolute bottom-0 left-0 bg-fill-weak font-medium text-base dark:bg-fill-strong py-[2px] px-2 hidden xl:block`,
  switch: `absolute top-4 z-30 left-[50%] translate-x-[-50%]`,
}

const grid = {
  container: `sm:grid grid-cols-2 xl:grid-cols-5 origin-center text-dusk-main dark:text-dawn-main relative`,
  firstColumn: `col-span-1 hidden xl:col-span-3 relative h-screen sm:flex pl-5 flex-col justify-center items-start`,
  secondColumn: `col-span-1 w-full relative xl:col-span-2 flex justify-center items-center`,
}

const loader = {
  container: `w-screen bg-fill-weak dark:bg-fill-strong h-screen flex items-center justify-center`,
  loader: `border-black dark:border-white !w-16 !h-16 !border-[8px]`,
}
