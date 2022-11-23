import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import {
  createPostAndAddToUserAccount,
  userData,
} from '../../services/api-routes'
import { Button } from '../Button'
import { success } from '../Toasters'
import { ChatContainer } from './ChatContainer'

interface Props {}

export const MobileChatModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const [connections, setConnections] = useState<[User] | any>([])
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
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

  return (
    <>
      <motion.div
        onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="fixed z-40 inset-0 w-screen h-screen dark:bg-fill-weak/10 bg-fill-strong/10"
      />
      <motion.section
        initial={{
          y: -500,
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        animate={{ y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' }}
        className="fixed flex flex-col items-start overflow-hidden border border-dawn-weak/20 dark:border-dusk-weak/20 drop-shadow-2xl z-50 w-screen h-screen text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div className="flex w-full items-center p-2 justify-between">
          {currentChat && (
            <i
              onClick={() => setCurrentChat(undefined)}
              className="ri-arrow-left-circle-line text-2xl cursor-pointer"
            />
          )}
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className="ri-close-circle-fill text-2xl cursor-pointer ml-auto"
          />
        </div>
        {connections.length > 0 ? (
          <>
            {!currentChat && (
              <section className="relative h-full overflow-hidden overflow-y-scroll py-8 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20">
                {connections.map((connection: any) => (
                  <>
                    <div
                      onClick={() => setCurrentChat(connection)}
                      className="text-lg cursor-pointer w-screen truncate font-medium p-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20"
                    >
                      {connection.username}
                    </div>
                  </>
                ))}
              </section>
            )}
            {currentChat ? (
              <section className="overflow-hidden">
                <ChatContainer currentChat={currentChat} />
              </section>
            ) : (
              <div className="f/lex hidden min-w-[200px] items-center justify-center text-2xl my-8">
                No chat was selected
              </div>
            )}
          </>
        ) : (
          <div className="flex text-center mt-24 flex-col min-w-[200px] col-span-7 items-center justify-center text-2xl">
            <span className="text-4xl">Add users and start chatting</span>
            <div
              onClick={() => dispatch(handleOpenModal(null))}
              className="hover:underline text-prime-blue mt-1 cursor-pointer"
            >
              Go back to exploring
            </div>
          </div>
        )}
      </motion.section>
    </>
  )
}
