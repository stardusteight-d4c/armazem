import { Menu } from '@headlessui/react'
import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { addConnection, rejectConnection } from '../../services/api-routes'
import { askToRequestAgain } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

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
    try {
      const { data } = await axios.post(addConnection, {
        to: userConnection,
        from: currentUser?._id,
      })
      dispatch(askToRequestAgain())
      setTimeout(() => {
        setRequestAgainFromAccept(true)
      }, 200)
    } catch (error) {
      console.log(error)
    }
  }

  const rejectRequestConnection = async (userConnection: string) => {
    try {
      const { data } = await axios.post(rejectConnection, {
        to: userConnection,
        from: currentUser?._id,
      })
      dispatch(askToRequestAgain())
      setTimeout(() => {
        setRequestAgainFromAccept(true)
      }, 200)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {active === 'accept' && (
        <div className="p-4 space-y-4">
          {accept.map((accept: User, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="transition-all px-4 duration-200 cursor-pointer flex justify-between border-y border-dawn-weak/20 dark:border-dusk-weak/20 rounded-sm p-2"
            >
              <Link to={`/${accept.username}`} className="flex">
                <img
                  src={accept.user_img}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <div className="flex flex-col px-2 -mt-1">
                  <span className="text-2xl">{accept.name}</span>
                  <span>{accept.username}</span>
                </div>
              </Link>
              <div className="flex relative items-center space-x-2 justify-end">
                <Menu>
                  <Menu.Button>
                    <i className="ri-check-fill text-green border border-dawn-weak/20 dark:border-dusk-weak/20 transition-all duration-200 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-xl cursor-pointer" />
                  </Menu.Button>
                  <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong right-5 -bottom-[45px]">
                    <Menu.Item>
                      <span
                        onClick={() => createConnection(accept._id)}
                        className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                      >
                        Accept
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                        Cancel
                      </span>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                <Menu>
                  <Menu.Button>
                    <i className="ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
                  </Menu.Button>
                  <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[23px] -bottom-[45px]">
                    <Menu.Item>
                      <span
                        onClick={() => rejectRequestConnection(accept._id)}
                         className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                      >
                        Reject
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span  className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
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
