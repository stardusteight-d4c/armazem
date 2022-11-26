import { useEffect, useState } from 'react'
import { SignIn, SignUp } from '../components/login'
import { SwitchTheme } from '../components/SwitchTheme'
import background from '../assets/background.jpg'
import { AnimatePresence } from 'framer-motion'
import { useAppDispatch } from '../store/hooks'
import { clearAuthSession, clearCurrentUser } from '../store'

export const Login = () => {
  const [signIn, setSignIn] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
  }, [])

  const switchForm = {
    signIn: signIn,
    setSignIn: setSignIn,
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
            <img src={background} className={style.backgroundImage} />
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
  logoContainer: `flex mt-14 sm:mt-0 sm:text-fill-strong sm:dark:text-fill-weak sm:text-fill-weak sm:dark:text-fill-weak sm:absolute top-10 sm:top-8 left-4 z-50 cursor-pointer items-center justify-center gap-x-2`,
  logoIcon: `ri-server-fill text-3xl`,
  logoText: 'text-4xl font-inter font-bold',
  backgroundImage: `w-screen h-screen absolute inset-0 object-cover object-top opacity-95`,
  pageSpan: `z-10 w-full absolute bottom-0 left-0 bg-fill-weak font-medium text-base dark:bg-fill-strong py-[2px] px-2 hidden xl:block`,
  switch: `absolute top-4 z-30 left-[50%] translate-x-[-50%]`,
}

const grid = {
  container: `sm:grid grid-cols-2 xl:grid-cols-5 origin-center text-dusk-main dark:text-dawn-main relative`,
  firstColumn: `col-span-1 hidden xl:col-span-3 relative h-screen sm:flex pl-5 flex-col justify-center items-start`,
  secondColumn: `col-span-1 w-full relative xl:col-span-2 flex justify-center items-center overflow-hidden`,
}
