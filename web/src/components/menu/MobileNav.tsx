import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { BackToTop } from '../BackToTop'
import { SwitchTheme } from '../SwitchTheme'
import { Notifications } from './integrate/Notifications'

interface Props {}

export const MobileNav = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  console.log(location.pathname)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const html = document.querySelector('html')
  if (html) {
    openModal === 'PostInput' || openModal === 'ChatMobile'
      ? (html.style.overflow = 'hidden')
      : (html.style.overflow = 'auto')
  }

  return (
    <>
      {scrollPosition > 10 && (
        <aside className={style.wrapper}>
          <BackToTop />
          <i
            title="New post"
            className={style.newPostIcon}
            onClick={() => dispatch(handleOpenModal('PostInput'))}
          />
          <Notifications isMobile={true} />
          {location.pathname !== '/' && (
            <i
              title="Back"
              onClick={() => navigate('/')}
              className={style.backIcon}
            />
          )}
          {location.pathname === '/' && <SwitchTheme />}
          <i
            onClick={() => dispatch(handleOpenModal('ChatMobile'))}
            className={style.messagesIcon}
          />
          <i
            title="Settings"
            onClick={() => navigate('/settings')}
            className={style.settingsIcon}
          />
        </aside>
      )}
    </>
  )
}

const style = {
  wrapper: `bg-fill-weak fixed bottom-0 w-screen md:hidden dark:bg-fill-strong z-40 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 justify-between px-3 md:px-12 flex items-center h-14`,
  backIcon: `ri-home-fill text-3xl p-2 cursor-pointer`,
  newPostIcon: `ri-article-line text-3xl p-2 cursor-pointer`,
  messagesIcon: `ri-question-answer-line text-3xl p-2 cursor-pointer`,
  settingsIcon: `ri-settings-2-line text-3xl p-2 cursor-pointer transition duration-1000 transform hover:rotate-[360deg]`,
}
