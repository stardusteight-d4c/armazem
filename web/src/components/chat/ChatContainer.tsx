import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { addMessage, allMessages } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { error } from '../Toasters'
import { Messages } from './Messages'

interface Props {
  currentChat: any
}

export const ChatContainer = ({ currentChat }: Props) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any>([])
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

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
    // socket.current.emit('send-msg', {
    //   to: currentChat._id,
    //   from: currentUser._id,
    //   message: msg,
    // })

    // const msgs = [...messages]
    // msgs.push({ fromSelf: true, message: msg })
    // setMessages(msgs)
  }

  console.log(messages)

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
  }, [currentChat])

  return (
    <>
      <div className="flex items-center gap-x-2 px-4 bg-dawn-weak/20 dark:bg-dusk-weak/20 h-[78px]">
        <img src={currentChat.user_img} className="w-14 h-14 rounded-sm" />
        <div className="text-lg font-medium">{currentChat.username}</div>
      </div>
      <div className="p-2 overflow-hidden overflow-y-scroll h-[410px]">
        {messages.map((message: any) => (
          <Messages message={message} currentChat={currentChat} />
        ))}
      </div>
      <div className="absolute flex items-center bottom-0 w-full p-2">
        <input
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
          type="text"
          className="bg-transparent w-full px-4 py-2 focus:!border-prime-blue outline-none border border-dawn-weak/20 dark:border-dusk-weak/20"
        />
        <button
          onClick={handleSendMsg}
          className="bg-prime-blue py-2 px-4 border font-medium text-white border-prime-blue"
        >
          Submit
        </button>
      </div>
    </>
  )
}
