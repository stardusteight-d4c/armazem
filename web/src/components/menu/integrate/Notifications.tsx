import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { notifications } from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../../store'

const formatDate = (date: Date) => (
  <>
    {new Date(date).getFullYear()}/{new Date(date).getMonth() + 1}/
    {new Date(date).getDate()} • {new Date(date).getHours()}:
    {new Date(date).getMinutes() <= 9
      ? '0' + new Date(date).getMinutes()
      : new Date(date).getMinutes()}
  </>
)

export const DesktopNotifications = () => {
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [showNotification, setShowNotification] = useState(false)
  const [disableHookEffect, setDisableHookEffect] = useState(false)
  const [userNotifications, setUserNotifications] = useState<any>([])
  const [prevNotifyLength, setPrevNotifyLength] = useState<number | string>(0)

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

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!")
          !disableHookEffect && setShowNotification(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref, disableHookEffect])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const handleNotification = () => {
    setShowNotification(!showNotification)
    localStorage.setItem('notifyLength', userNotifications.length)
    const notifyLength = localStorage.getItem('notifyLength')
    notifyLength && setPrevNotifyLength(notifyLength)
  }

  return (
    <div className="flex flex-col space-y-12 items-center">
      <div className="relative">
        <i
          title="Notifications"
          onMouseEnter={() => setDisableHookEffect(true)}
          onMouseLeave={() => setDisableHookEffect(false)}
          onClick={handleNotification}
          className="ri-notification-2-line hidden md:block  text-3xl p-2 cursor-pointer"
        />
        {userNotifications.length > 0 &&
          prevNotifyLength < userNotifications.length && (
            <i className="w-2 h-2 hidden md:block rounded-full bg-red absolute top-1 right-2 animate-bounce" />
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
                        {formatDate(item.createdAt)}
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
                          {formatDate(item.createdAt)}
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
                          {formatDate(item.createdAt)}
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
  )
}

export const MobileNotifications = () => {
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const openModal = useAppSelector((state) => state.armazem.openModal)
  const [showNotification, setShowNotification] = useState(false)
  const [disableHookEffect, setDisableHookEffect] = useState(false)
  const [userNotifications, setUserNotifications] = useState<any>([])
  const [prevNotifyLength, setPrevNotifyLength] = useState<any>(null)
  const dispatch = useAppDispatch()

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!")
          setTimeout(() => {
            !disableHookEffect && setShowNotification(false)
          }, 200)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref, disableHookEffect])
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

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

  function handleNotification() {
    setDisableHookEffect(true)
    setShowNotification(!showNotification)
    localStorage.setItem('notifyLength', userNotifications.length)
    setPrevNotifyLength(localStorage.getItem('notifyLength'))
    setDisableHookEffect(false)
  }

  const html = document.querySelector('html')
  if (html) {
    showNotification || openModal === 'PostInput' || openModal === 'ChatMobile'
      ? (html.style.overflow = 'hidden')
      : (html.style.overflow = 'auto')
  }

  return (
    <>
      {showNotification && (
        <motion.div
          onClick={() => dispatch(handleOpenModal(null))}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          animate={{ opacity: 1 }}
          className="fixed z-40 inset-0 w-screen h-screen dark:bg-fill-weak/10 bg-fill-strong/10"
        />
      )}
      <div className="flex flex-col -space-y-[410px] items-center">
        <div className="relative">
          <i
            onClick={handleNotification}
            className={`${
              showNotification
                ? 'text-prime-blue ri-notification-2-fill'
                : 'ri-notification-2-line'
            }   text-3xl p-2 cursor-pointer`}
          />
          {userNotifications.length > 0 &&
            prevNotifyLength < userNotifications.length && (
              <i className="w-2 h-2 rounded-full bg-red absolute top-1 right-2 animate-bounce" />
            )}
        </div>
        {showNotification && (
          <div
            ref={wrapperRef}
            className="absolute left-1/2 -translate-x-1/2 shadow-md flex flex-col overflow-x-hidden overflow-y-scroll w-[300px] h-[400px] bg-fill-weak dark:bg-fill-strong z-50 border border-dawn-weak/20 dark:border-dusk-weak/20"
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
                          {formatDate(item.createdAt)}
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
                            {formatDate(item.createdAt)}
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
                            {formatDate(item.createdAt)}
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
    </>
  )
}
