import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import { userData } from '../../services/api-routes'
import { Chat } from './Chat'
import { Overlay } from '../modals/Overlay'

interface Props {}

export const DesktopChatModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const [connections, setConnections] = useState<[User] | any>([])
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (currentAccount.connections !== undefined && connections.length === 0) {
      const user: any[] = []
      setConnections([])
      if (connections.length < currentAccount.connections.length) {
        currentAccount.connections.map(async (connection: { with: any }) => {
          const { data } = await axios.get(`${userData}/${connection.with}`)
          user.push(data.user)
          setConnections(user)
        })
      }
    }
  }, [])

  const motionProps = {
    initial: {
      y: -500,
      opacity: 0,
      translateX: '-50%',
      translateY: '-50%',
    },
    transition: { type: 'spring', duration: 0.8 },
    animate: { y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' },
    className: style.wrapper,
  }

  return (
    <>
      <Overlay />
      <motion.section {...motionProps}>
        {connections.length > 0 ? (
          <>
            <section className={style.connectionsContainer}>
              {connections.map((connection: any) => (
                <div
                  onClick={() => setCurrentChat(connection)}
                  className={style.connection}
                >
                  {connection.username}
                </div>
              ))}
            </section>
            {currentChat ? (
              <section className={style.chatContainer}>
                <Chat currentChat={currentChat} />
              </section>
            ) : (
              <div className={style.noChat}>No chat was selected</div>
            )}
          </>
        ) : (
          <div className={style.noConnections}>
            <span className={style.spanText}>Add users and start chatting</span>
            <div
              onClick={() => dispatch(handleOpenModal(null))}
              className={style.goBackLink}
            >
              Go back to exploring
            </div>
          </div>
        )}
      </motion.section>
    </>
  )
}

const style = {
  wrapper: `fixed grid grid-cols-7 overflow-hidden border border-dawn-weak/20 dark:border-dusk-weak/20 shadow-md z-50 w-[1000px] h-[546px] text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`,
  connectionsContainer: `col-span-2 overflow-hidden overflow-y-scroll p-8 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20`,
  connection: `text-lg cursor-pointer w-[219px] truncate font-medium py-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  chatContainer: `col-start-3 relative col-span-5 overflow-hidden`,
  noChat: `flex min-w-[200px] col-span-5 items-center justify-center text-2xl my-8`,
  noConnections: `flex flex-col min-w-[200px] col-span-7 items-center justify-center text-2xl my-8`,
  spanText: `text-4xl`,
  goBackLink: `hover:underline text-prime-blue mt-1 cursor-pointer`,
}
