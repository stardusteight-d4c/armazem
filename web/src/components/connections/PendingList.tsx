import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { rejectConnection } from '../../services/api-routes'
import { askToRequestAgain } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Dropdown } from '../Dropdown'

interface Props {
  active: string
  pending: User[]
  setRequestAgainFromPending: React.Dispatch<React.SetStateAction<boolean>>
}

export const PendingList = ({
  active,
  pending,
  setRequestAgainFromPending,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const unsendRequestConnection = async (userRequest: string) => {
    await axios
      .post(rejectConnection, {
        to: currentUser?._id,
        from: userRequest,
      })
      .then(() => {
        dispatch(askToRequestAgain())
        setTimeout(() => {
          setRequestAgainFromPending(true)
        }, 200)
      })
      .catch((error) => console.log(error.toJSON()))
  }

  return (
    <>
      {active === 'pending' && (
        <div className={style.wrapper}>
          {pending.map((pending: User, index: React.Key) => (
            <div key={index} className={style.itemContainer}>
              <Link
                to={`/${pending.username}`}
                className={style.pendingContainer}
              >
                <img
                  src={pending.user_img}
                  alt="user/img"
                  className={style.userImg}
                />
                <div className={style.userInfo}>
                  <span className={style.userName}>{pending.name}</span>
                  <span>@{pending.username}</span>
                </div>
              </Link>
              <div className={style.actionsContainer}>
                <Dropdown
                  title="Unsend"
                  space="space-y-10"
                  items={[
                    {
                      item: 'Unsend',
                      function: () => unsendRequestConnection(pending._id),
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
  pendingContainer: `flex`,
  userImg: `w-14 h-14 md:w-20 md:h-20 object-cover`,
  userInfo: `flex flex-col px-2 -mt-1`,
  userName: `text-2xl truncate w-60 md:w-96`,
  actionsContainer: `flex relative items-center space-x-2 justify-end`,
  deleteIcon: `ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 w-8 h-8 flex justify-center items-center p-2 shadow-sm rounded-sm text-lg cursor-pointer`,
}
