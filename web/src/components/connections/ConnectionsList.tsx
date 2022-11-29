import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { removeConnection } from '../../services/api-routes'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Dropdown } from '../Dropdown'

interface Props {
  active: string
  connections: User[]
  setRequestAgainFromConnections: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConnectionsList = ({
  active,
  connections,
  setRequestAgainFromConnections,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const deleteUserConnection = async (userConnection: string) => {
    await axios
      .post(removeConnection, {
        to: userConnection,
        from: currentUser?._id,
      })
      .then(() => {
        dispatch(askToRequestAgain())
        setTimeout(() => {
          setRequestAgainFromConnections(true)
        }, 200)
      })
      .catch((error) => console.log(error.toJSON()))
  }

  return (
    <>
      {active === 'connections' && (
        <div className={style.wrapper}>
          {connections.map((connection: User, index: React.Key) => (
            <div key={index} className={style.itemContainer}>
              <Link
                to={`/${connection?.username}`}
                className={style.connectionContainer}
              >
                <img
                  src={connection?.user_img}
                  alt="user/img"
                  className={style.userImg}
                />
                <div className={style.userInfo}>
                  <span className={style.userName}>{connection?.name}</span>
                  <span>@{connection?.username}</span>
                </div>
              </Link>
              <div className={style.actionsContainer}>
                <i
                  onClick={() => dispatch(handleOpenModal('Chat'))}
                  className={style.messageIcon}
                />
                <Dropdown
                  title="Remove"
                  space="space-y-10"
                  items={[
                    {
                      item: 'Remove',
                      function: () => deleteUserConnection(connection?._id),
                    },
                    { item: 'Cancel' },
                  ]}
                >
                  <i className={style.deleteIcon} />
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

const style = {
  wrapper: `p-4 space-y-4`,
  itemContainer: `transition-all px-4 duration-200 cursor-pointer flex justify-between border-y border-dawn-weak/20 dark:border-dusk-weak/20 rounded-sm p-2`,
  connectionContainer: `flex`,
  userImg: `w-14 h-14 md:w-20 md:h-20 object-cover`,
  userInfo: `flex flex-col px-2 -mt-1`,
  userName: `text-2xl truncate w-60 md:w-96`,
  actionsContainer: `flex relative items-center space-x-2 justify-end`,
  messageIcon: `ri-message-3-line border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 w-8 h-8 flex justify-center items-center p-2 shadow-sm rounded-sm text-lg cursor-pointer`,
  deleteIcon: `ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 w-8 h-8 flex justify-center items-center p-2 shadow-sm rounded-sm text-lg cursor-pointer`,
}
