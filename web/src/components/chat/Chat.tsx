import axios from 'axios'
import { useEffect, useState } from 'react'
import { addMessage, allMessages } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { error } from '../Toasters'
import { Messages } from './Messages'

interface Props {
  currentChat: any
}

export const Chat = ({ currentChat }: Props) => {
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
      <div className={style.wrapper}>
        <img src={currentChat.user_img} className={style.userImg} />
        <div className={style.username}>{currentChat.username}</div>
      </div>
      <div className={style.messagesContainer}>
        {messages.map((message: any) => (
          <Messages message={message} currentChat={currentChat} />
        ))}
      </div>
      <div className={style.inputContainer}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
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
