import { useNavigate } from 'react-router-dom'
import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { SwitchTheme } from '../SwitchTheme'
import { Notifications } from './integrate/Notifications'

export const MobileNav = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const openModal = useAppSelector((state) => state.armazem.openModal)

  const html = document.querySelector('html')
  if (html) {
    openModal === 'PostInput' || openModal === 'ChatMobile'
      ? (html.style.overflow = 'hidden')
      : (html.style.overflow = 'auto')
  }

  return (
    <aside className={style.wrapper}>
      <i
        title="New post"
        className={style.newPostIcon}
        onClick={() => dispatch(handleOpenModal('PostInput'))}
      />
      <Notifications isMobile={true} />
      <SwitchTheme />
      <i
        onClick={() => dispatch(handleOpenModal('ChatMobile'))}
        className={style.messagesIcon}
      />
      <i
        title="Settings"
        onClick={() => navigate('/settings')}
        className={style.settingsIcons}
      />
    </aside>
  )
}

const style = {
  wrapper: `bg-fill-weak fixed bottom-0 w-screen md:hidden dark:bg-fill-strong z-40 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 justify-between px-3 md:px-12 flex items-center h-14`,
  newPostIcon: `ri-article-line text-3xl p-2 cursor-pointer`,
  messagesIcon: `ri-question-answer-line text-3xl p-2 cursor-pointer`,
  settingsIcons: `ri-settings-2-line text-3xl p-2 cursor-pointer transition duration-1000 transform hover:rotate-[360deg]`,
}
