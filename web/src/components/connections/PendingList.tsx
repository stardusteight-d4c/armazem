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
              className="transition-all px-4 duration-200 cursor-pointer flex justify-between border-y border-dawn-weak/20 dark:border-dusk-weak/20 rounded-sm p-2"
            >
              <Link to={`/${pending.username}`} className="flex">
                <img
                  src={pending.user_img}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <div className="flex flex-col px-2 -mt-1">
                  <span className="text-2xl">{pending.name}</span>
                  <span>{pending.username}</span>
                </div>
              </Link>
              <div className="flex relative items-center space-x-2 justify-end">
                <Menu>
                  <Menu.Button>
                    <i className="ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
                  </Menu.Button>
                  <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[23px] -bottom-[45px]">
                    <Menu.Item>
                      <span
                        className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                        onClick={() => unsendRequestConnection(pending._id)}
                      >
                        Unsend
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
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
