import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
// import { io } from 'socket.io-client'
import { addMessage, allMessages, hostServer } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { error } from '../Toasters'
import { Messages } from './Messages'

interface Props {
  currentChat: User
}

export const Chat = ({ currentChat }: Props) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any>([])
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [newMessage, setNewMessage] = useState<boolean>(false)
  // const socket = useRef<any>()
  const scrollRef = useRef<null | any | HTMLDivElement>()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // socket.current = io(hostServer)

  // useEffect(() => {
  //   if (currentChat) {
  //     socket.current.emit('enter-chat', {
  //       userId: currentUser?._id,
  //     })
  //   }
  // }, [currentUser, currentChat])

  // socket.current.on('chat-update', (data: any) => {
  //   if (data.status === true) {
  //     setNewMessage(true)
  //   }
  // })

  const handleSendMsg = async () => {
    if (message.length > 0) {
      await axios.post(addMessage, {
        from: currentUser?._id,
        to: currentChat._id,
        message,
      })
    } else {
      error('There are no messages to send')
    }
    setMessage('')
    setNewMessage(true)
    // socket.current.emit('chat-update', {
    //   to: currentChat._id,
    // })
  }

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(allMessages, {
        params: {
          from: currentUser?._id,
          to: currentChat._id,
        },
      })
      setMessages(response.data)
    })()
    setNewMessage(false)
  }, [currentChat, newMessage])

  return (
    <>
      <div className={style.wrapper}>
        <img src={currentChat.user_img} className={style.userImg} />
        <div className={style.username}>{currentChat.username}</div>
      </div>
      <div className={style.messagesContainer}>
        {messages.map((message: any, index: React.Key) => (
          <div ref={scrollRef}  key={index}>
            <Messages message={message} currentChat={currentChat} />
          </div>
        ))}
      </div>
      <div className={style.inputContainer}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
          value={message}
          className={style.input}
        />
        <button onClick={handleSendMsg} className={style.buttonSubmit}>
          Submit
        </button>
      </div>
    </>
  )
}

const style = {
  wrapper: `w-screen md:w-full flex items-center gap-x-2 px-4 bg-dawn-weak/20 dark:bg-dusk-weak/20 h-[78px]`,
  userImg: `w-14 h-14 rounded-sm`,
  username: `text-lg font-medium`,
  messagesContainer: `p-2 overflow-hidden overflow-y-scroll break-all w-full h-[90vh] pb-28 md:h-[410px]`,
  inputContainer: `absolute bg-fill-weak dark:bg-fill-strong  mt-auto flex items-center bottom-0 w-full p-2`,
  input: `bg-transparent w-full px-4 py-2 focus:!border-prime-blue outline-none border border-dawn-weak/20 dark:border-dusk-weak/20`,
  buttonSubmit: `bg-prime-blue py-2 px-4 border font-medium text-white border-prime-blue`,
}
