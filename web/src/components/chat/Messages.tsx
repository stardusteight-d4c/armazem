import { useAppSelector } from '../../store/hooks'

interface Props {
  message: any
  currentChat: User
}

export const Messages = ({ message, currentChat }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  return (
    <>
      {message.fromSelf ? (
        <div className={style.fromSelfContainer}>
          <div>
            <div className={style.fromSelfUsername}>
              @{currentUser?.username}
            </div>
            <div className={style.fromSelfMessage}>{message.message}</div>
          </div>
        </div>
      ) : (
        <div className={style.receivedContainer}>
          <div>
            <div className={style.receivedUsername}>
              @{currentChat.username}
            </div>
            <div className={style.receivedMessage}>{message.message}</div>
          </div>
        </div>
      )}
    </>
  )
}

const style = {
  fromSelfContainer: `flex justify-end`,
  fromSelfUsername: `text-right`,
  fromSelfMessage: `bg-dawn-weak/20 dark:bg-dusk-weak/20 ml-auto  p-2 w-fit h-fi rounded-sm my-2`,
  receivedContainer: `flex justify-start w-full`,
  receivedUsername: `text-left`,
  receivedMessage: `bg-dawn-weak/20 dark:bg-dusk-weak/20 p-2 max-w-full h-fi rounded-sm my-2`,
}
