import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { addConnection, rejectConnection } from '../../services/api-routes'
import { askToRequestAgain } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Dropdown } from '../Dropdown'

interface Props {
  active: string
  accept: User[]
  setRequestAgainFromAccept: React.Dispatch<React.SetStateAction<boolean>>
}

export const AcceptList = ({
  active,
  accept,
  setRequestAgainFromAccept,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const createConnection = async (userConnection: string) => {
    await axios
      .post(addConnection, {
        to: userConnection,
        from: currentUser?._id,
      })
      .then(() => {
        dispatch(askToRequestAgain())
        setTimeout(() => {
          setRequestAgainFromAccept(true)
        }, 200)
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const rejectRequestConnection = async (userConnection: string) => {
    await axios
      .post(rejectConnection, {
        to: userConnection,
        from: currentUser?._id,
      })
      .then(() => {
        dispatch(askToRequestAgain())
        setTimeout(() => {
          setRequestAgainFromAccept(true)
        }, 200)
      })
      .catch((error) => console.log(error.toJSON()))
  }

  return (
    <>
      {active === 'accept' && (
        <div className={style.wrapper}>
          {accept.map((accept: User, index: React.Key) => (
            <div key={index} className={style.itemContainer}>
              <Link to={`/${accept.username}`} className={style.acceptList}>
                <img
                  src={accept.user_img}
                  alt="user/img"
                  className={style.userImg}
                />
                <div className={style.userInfo}>
                  <span className={style.userName}>{accept.name}</span>
                  <span>@{accept.username}</span>
                </div>
              </Link>
              <div className={style.actionsContainer}>
                <Dropdown
                  title="Accept connection"
                  space="space-y-10"
                  items={[
                    {
                      item: 'Accept',
                      function: () => createConnection(accept._id),
                    },
                    { item: 'Cancel' },
                  ]}
                >
                  <i className={style.connectionIcon} />
                </Dropdown>
                <Dropdown
                  title="Reject connection"
                  space="space-y-10"
                  items={[
                    {
                      item: 'Reject',
                      function: () => rejectRequestConnection(accept._id),
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
  acceptList: `flex`,
  userImg: `w-14 h-14 md:w-20 md:h-20 object-cover`,
  userInfo: `flex flex-col px-2 -mt-1`,
  userName: `text-2xl truncate w-60 md:w-96`,
  actionsContainer: `flex relative items-center space-x-2 justify-end`,
  connectionIcon: `ri-check-fill text-green border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 w-8 h-8 flex justify-center items-center p-2 shadow-sm rounded-sm text-xl cursor-pointer`,
  deleteIcon: `ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 shadow-sm rounded-sm text-lg cursor-pointer`,
}
