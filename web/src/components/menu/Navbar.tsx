import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../SwitchTheme'
import { Menu } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  clearAuthSession,
  clearCurrentUser,
  handleOpenModal,
} from '../../store'
import { Search } from './Search'
import { Dropdown } from '../Dropdown'
import axios from 'axios'
import { notifications } from '../../services/api-routes'

interface Props {}

export const Navbar = (props: Props) => {
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const dispatch = useAppDispatch()
  const [showNotification, setShowNotification] = useState(false)
  const [disableHookEffect, setDisableHookEffect] = useState(false)
  const [userNotifications, setUserNotifications] = useState<any>([])
  const [prevNotifyLength, setPrevNotifyLength] = useState<any>(null)

  // Hook that alerts clicks outside of the passed ref
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!")
         !disableHookEffect && setShowNotification(false)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref, disableHookEffect])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const handleLogout = async () => {
    localStorage.clear()
    dispatch(clearAuthSession())
    dispatch(clearCurrentUser())
    navigate('/login')
  }

  useEffect(() => {
    if (currentAccount._id) {
      ;(async () => {
        const { data } = await axios.get(
          `${notifications}/${currentAccount._id}`
        )
        if (data.status === true) {
          setUserNotifications(data.notifications)
        }
      })()
    }
  }, [currentAccount])

  const accountItems = [
    {
      item: 'Account',
      function: () => navigate(`/${currentUser?.username}`),
    },
    {
      item: 'Logout',
      function: () => handleLogout(),
    },
  ]

  useEffect(() => {
    setPrevNotifyLength(localStorage.getItem('notifyLength') || 0)
  }, [])

  function handleNotification() {
    setShowNotification(!showNotification)
    localStorage.setItem('notifyLength', userNotifications.length)
    setPrevNotifyLength(localStorage.getItem('notifyLength'))
  }

  return (
    <nav className="bg-fill-weak dark:bg-fill-strong z-50 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between p-8 w-full flex items-center h-24">
      <Search />
      <div className="flex items-center gap-x-5">
        <SwitchTheme />
        <i
          title="New post"
          className="ri-article-line text-3xl p-2 cursor-pointer"
          onClick={() => dispatch(handleOpenModal('PostInput'))}
        />
        <i
          onClick={() => dispatch(handleOpenModal('Chat'))}
          className="ri-question-answer-line text-3xl p-2 cursor-pointer"
        />
        <div className="flex flex-col space-y-12 items-center">
          <div className="relative">
            <i
              onMouseEnter={() => setDisableHookEffect(true)}
              onMouseLeave={() => setDisableHookEffect(false)}
              onClick={handleNotification}
              className="ri-notification-2-line text-3xl p-2 cursor-pointer"
            />
            {userNotifications.length > 0 &&
              prevNotifyLength < userNotifications.length && (
                <i className="w-2 h-2 rounded-full bg-red absolute top-1 right-2 animate-bounce" />
              )}
          </div>
          {showNotification && (
            <div
              ref={wrapperRef}
              className="absolute shadow-md flex flex-col overflow-x-hidden overflow-y-scroll w-[300px] h-[400px] bg-fill-weak dark:bg-fill-strong z-50 border border-dawn-weak/20 dark:border-dusk-weak/20"
            >
              {userNotifications.length === 0 ? (
                <div className="text-center items-center px-1 h-fit my-auto justify-center text-2xl">
                  No notifications in the last week
                </div>
              ) : (
                <>
                  {userNotifications.map((item: any) => (
                    <>
                      {(item.type === 'general' && (
                        <div className="text-center font-medium py-1 px-2 border-b border-dawn-weak/20 dark:border-dusk-weak/20">
                          <span className="block text-sm text-dusk-weak">
                            {new Date(item.createdAt).getFullYear()}/
                            {new Date(item.createdAt).getMonth() + 1}/
                            {new Date(item.createdAt).getDate()} •{' '}
                            {new Date(item.createdAt).getHours()}:
                            {new Date(item.createdAt).getMinutes() <= 9
                              ? '0' + new Date(item.createdAt).getMinutes()
                              : new Date(item.createdAt).getMinutes()}
                          </span>
                          <div>
                            <Link
                              to={`/manga/${item.infos[1]}`}
                              className="hover:underline text-prime-blue cursor-pointer"
                            >
                              {item.infos[0]}
                            </Link>{' '}
                            {item.message}
                          </div>
                        </div>
                      )) ||
                        (item.type === 'direct' && (
                          <div className="text-center font-medium py-1 px-2 border-b border-dawn-weak/20 dark:border-dusk-weak/20">
                            <span className="block text-sm text-dusk-weak">
                              {new Date(item.createdAt).getFullYear()}/
                              {new Date(item.createdAt).getMonth() + 1}/
                              {new Date(item.createdAt).getDate()} •{' '}
                              {new Date(item.createdAt).getHours()}:
                              {new Date(item.createdAt).getMinutes() <= 9
                                ? '0' + new Date(item.createdAt).getMinutes()
                                : new Date(item.createdAt).getMinutes()}
                            </span>
                            <div>
                              <Link
                                to={`/${item.infos[0]}`}
                                className="hover:underline text-prime-blue cursor-pointer"
                              >
                                {item.infos[0]}
                              </Link>{' '}
                              {item.message}
                            </div>
                          </div>
                        )) ||
                        (item.type === 'newDiscussion' && (
                          <div className="text-center font-medium py-1 px-2 border-b border-dawn-weak/20 dark:border-dusk-weak/20">
                            <span className="block text-sm text-dusk-weak">
                              {new Date(item.createdAt).getFullYear()}/
                              {new Date(item.createdAt).getMonth() + 1}/
                              {new Date(item.createdAt).getDate()} •{' '}
                              {new Date(item.createdAt).getHours()}:
                              {new Date(item.createdAt).getMinutes() <= 9
                                ? '0' + new Date(item.createdAt).getMinutes()
                                : new Date(item.createdAt).getMinutes()}
                            </span>
                            <div>
                              <Link
                                to={`/${item.infos[0]}`}
                                className="hover:underline text-prime-blue cursor-pointer"
                              >
                                {item.infos[0]}
                              </Link>{' '}
                              <div>
                                {item.message}{' '}
                                <Link
                                  to={`/post/${item.infos[1]}`}
                                  className="hover:underline text-prime-blue"
                                >
                                  post
                                </Link>{' '}
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <i
          title="Settings"
          onClick={() => navigate('/settings')}
          className="ri-settings-2-line text-3xl  p-2 cursor-pointer transition duration-1000 transform hover:rotate-[360deg]"
        />

        <Dropdown title="Account" space="space-y-14" items={accountItems}>
          <img
            referrerPolicy="no-referrer"
            src={currentUser?.user_img}
            className="w-12 h-12 cursor-pointer"
            alt=""
          />
        </Dropdown>
      </div>
    </nav>
  )
}
