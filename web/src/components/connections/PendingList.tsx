import { Menu } from '@headlessui/react'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { rejectConnection } from '../../services/api-routes'
import { askToRequestAgain } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

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
    try {
      const { data } = await axios.post(rejectConnection, {
        to: currentUser?._id,
        from: userRequest,
      })
      dispatch(askToRequestAgain())
      setTimeout(() => {
        setRequestAgainFromPending(true)
      }, 200)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {active === 'pending' && (
        <div className="p-4 space-y-4">
          {pending.map((pending: User, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="transition-all px-4 duration-200 hover:brightness-105 cursor-pointer flex justify-between border-y border-dawn-weak/20 dark:border-dusk-weak/20 rounded-sm p-2"
            >
              <Link to={`/${pending.username}`} className="flex">
                <img
                  src={pending.user_img}
                  alt=""
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex flex-col px-2 -mt-1">
                  <span className="text-2xl">{pending.name}</span>
                  <span>{pending.username}</span>
                </div>
              </Link>
              <div className="flex relative items-center space-x-2 justify-end">
                <Menu>
                  <Menu.Button>
                    <i className="ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
                  </Menu.Button>
                  <Menu.Items className="transition-all duration-200 hover:brightness-125 drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20 rounded-md p-1 absolute flex flex-col items-startS justify-start -right-7 -bottom-[55px] z-50 h-fit text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong">
                    <Menu.Item>
                      <span
                        className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer"
                        onClick={() => unsendRequestConnection(pending._id)}
                      >
                        Unsend
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
                        Cancel
                      </span>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
