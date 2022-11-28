import axios from 'axios'
import { Key, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { notifications } from '../../../services/api-routes'
import { useAppSelector } from '../../../store/hooks'

interface Props {
  isMobile?: boolean
}

export const Notifications = ({ isMobile }: Props) => {
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [showNotification, setShowNotification] = useState(false)
  const [disableHookEffect, setDisableHookEffect] = useState(false)
  const [userNotifications, setUserNotifications] = useState<any>([])
  const [prevNotifyLength, setPrevNotifyLength] = useState<number | string>(0)

  useEffect(() => {
    const notifyLength = localStorage.getItem('notifyLength')
    notifyLength && setPrevNotifyLength(notifyLength)
  }, [])

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

  const formatDate = (date: Date) => (
    <>
      {new Date(date).getFullYear()}/{new Date(date).getMonth() + 1}/
      {new Date(date).getDate()} • {new Date(date).getHours()}:
      {new Date(date).getMinutes() <= 9
        ? '0' + new Date(date).getMinutes()
        : new Date(date).getMinutes()}
    </>
  )

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: { target: any }) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!")
          if (!isMobile) {
            !disableHookEffect && setShowNotification(false)
          } else {
            setTimeout(() => {
              !disableHookEffect && setShowNotification(false)
            }, 200)
          }
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
    if (!isMobile) {
      setShowNotification(!showNotification)
      localStorage.setItem('notifyLength', userNotifications.length)
      const notifyLength = localStorage.getItem('notifyLength')
      notifyLength && setPrevNotifyLength(notifyLength)
    } else {
      setDisableHookEffect(true)
      setShowNotification(!showNotification)
      localStorage.setItem('notifyLength', userNotifications.length)
      const notifyLength = localStorage.getItem('notifyLength')
      notifyLength && setPrevNotifyLength(notifyLength)
      setDisableHookEffect(false)
    }
  }

  const rendersShowNotifications = () => (
    <div
      ref={wrapperRef}
      className={`${
        isMobile && style.mobileShowNotificationsContainerPosition
      } ${style.showNotificationsContainer}`}
    >
      {userNotifications.length === 0 ? (
        <div className={style.noNotifications}>
          No notifications in the last week
        </div>
      ) : (
        <>
          {userNotifications.map((item: any, index: Key) => (
            <div key={index}>
              {(item.type === 'general' && (
                <div className={style.notificationContainer}>
                  <span className={style.date}>
                    {formatDate(item.createdAt)}
                  </span>
                  <div>
                    <Link to={`/manga/${item.infos[1]}`} className={style.link}>
                      {item.infos[0]}
                    </Link>{' '}
                    {item.message}
                  </div>
                </div>
              )) ||
                (item.type === 'direct' && (
                  <div className={style.notificationContainer}>
                    <span className={style.date}>
                      {formatDate(item.createdAt)}
                    </span>
                    <div>
                      <Link to={`/${item.infos[0]}`} className={style.link}>
                        {item.infos[0]}
                      </Link>{' '}
                      {item.message}
                    </div>
                  </div>
                )) ||
                (item.type === 'newDiscussion' && (
                  <div className={style.notificationContainer}>
                    <span className={style.date}>
                      {formatDate(item.createdAt)}
                    </span>
                    <div>
                      <Link to={`/${item.infos[0]}`} className={style.link}>
                        {item.infos[0]}
                      </Link>{' '}
                      <div>
                        {item.message}{' '}
                        <Link
                          to={`/post/${item.infos[1]}`}
                          className={style.link}
                        >
                          post
                        </Link>{' '}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </>
      )}
    </div>
  )

  return (
    <div
      className={`
      ${style.wrapper} ${isMobile ? style.spaceMobile : style.spaceDesktop}
      `}
    >
      <div className="relative">
        <i
          title="Notifications"
          onMouseEnter={() => setDisableHookEffect(true)}
          onMouseLeave={() => setDisableHookEffect(false)}
          onClick={handleNotification}
          className={style.notificationIcon}
        />
        {userNotifications.length > 0 &&
          prevNotifyLength < userNotifications.length && (
            <i className={style.notifyAlert} />
          )}
      </div>
      {showNotification && rendersShowNotifications()}
    </div>
  )
}

const style = {
  wrapper: `flex flex-col items-center `,
  spaceMobile: `-space-y-[410px]`,
  spaceDesktop: `space-y-12`,
  notificationIcon: `ri-notification-2-line  text-3xl p-2 cursor-pointer`,
  notifyAlert: `w-2 h-2 rounded-full bg-red absolute top-1 right-2 animate-bounce`,
  mobileShowNotificationsContainerPosition: `left-1/2 -translate-x-1/2`,
  showNotificationsContainer: `absolute shadow-md flex flex-col overflow-x-hidden overflow-y-scroll w-[300px] h-[400px] bg-fill-weak dark:bg-fill-strong z-50 border border-dawn-weak/20 dark:border-dusk-weak/20`,
  noNotifications: `text-center items-center px-1 h-fit my-auto justify-center text-2xl`,
  notificationContainer: `text-center font-medium py-1 px-2 border-b border-dawn-weak/20 dark:border-dusk-weak/20`,
  date: `block text-sm text-dusk-weak`,
  link: `hover:underline text-prime-blue cursor-pointer`,
}
