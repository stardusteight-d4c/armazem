import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Sidebar } from '../components'
import { Loader } from '../components/Loader'
import { removeConnection, userData } from '../services/api-routes'
import { askToRequestAgain } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface Props {}

export const Connections = (props: Props) => {
  const currentAccount: Account = useAppSelector(
    (state) => state.armazem.currentAccount
  )
  const [connectionsMetadata, setConnectionsMetadata] = useState<[User] | any>(
    []
  )
  const dispatch = useAppDispatch()
  const [active, setActive] = useState('connections')

  const deleteUserConnection = async (
    connection: string,
    currentAccount: string
  ) => {
    try {
      const { data } = await axios.post(removeConnection, {
        to: connection,
        from: currentAccount,
      })
      dispatch(askToRequestAgain())
    } catch (error) {
      console.log(error)
    }
  }

  // Mockar os dados, e talvez fazer rota especifica para pegar os metadados de connections
  if (
    currentAccount.connections !== undefined &&
    connectionsMetadata.length < currentAccount.connections.length
  ) {
    const user: any[] = []
    if (connectionsMetadata.length < currentAccount.connections.length) {
      currentAccount.connections.map(async (connection) => {
        const { data } = await axios.get(`${userData}/${connection.with}`)
        user.push(data.user)
        setConnectionsMetadata(user)
      })
    }
  }

  return (
    <>
    {/* mandar pra baixo com !== 0 */}
      {connectionsMetadata.length === 0 && (
        <div className={style.gridContainer}>
          <Sidebar />
          <div className={style.mainContent}>
            <Navbar />
            <main>
              <div>
                <ul
                  className={`flex gap-x-5 border-b ${
                    active === 'connections' && 'border-b-green'
                  } ${active === 'pending' && 'border-b-orange'} ${
                    active === 'accept' && 'border-b-prime-blue'
                  }`}
                >
                  <li
                    onClick={() => setActive('connections')}
                    className={`cursor-pointer px-4 py-2 transition-all duration-200 hover:brightness-125 ${
                      active === 'connections' && 'bg-green text-white'
                    }`}
                  >
                    My connections
                  </li>
                  <li
                    onClick={() => setActive('pending')}
                    className={`cursor-pointer px-4 py-2 transition-all duration-200 hover:brightness-125 ${
                      active === 'pending' && 'bg-orange text-white '
                    }`}
                  >
                    Pending requests
                  </li>
                  <li
                    onClick={() => setActive('accept')}
                    className={`cursor-pointer px-4 py-2 transition-all duration-200 hover:brightness-125 ${
                      active === 'accept' && 'bg-prime-blue text-white '
                    }`}
                  >
                    Accept connection
                  </li>
                </ul>
              </div>
              <div className="p-4 space-y-4">
                {active === 'connections' && (
                  <>
                    {connectionsMetadata.map(
                      (
                        connection: User,
                        index: React.Key | null | undefined
                      ) => (
                        <div
                          key={index}
                          className="transition-all duration-200 hover:brightness-105 cursor-pointer flex justify-between border-y border-dawn-weak/20 dark:border-dusk-weak/20 rounded-sm p-2"
                        >
                          <Link to={`/${connection.username}`} className="flex">
                            <img
                              src={connection.user_img}
                              alt=""
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <div className="flex flex-col px-2 -mt-1">
                              <span className="text-2xl">
                                {connection.name}
                              </span>
                              <span>{connection.username}</span>
                            </div>
                          </Link>
                          <div className="flex items-center space-x-2 justify-end">
                            <i className="ri-message-3-line border border-dawn-weak/20 dark:border-dusk-weak/20 text-dusk-main dark:text-dusk-weak transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer" />
                            <i
                              onClick={() =>
                                deleteUserConnection(
                                  connection._id,
                                  currentAccount._id
                                )
                              }
                              className="ri-delete-bin-6-fill border border-dawn-weak/20 dark:border-dusk-weak/20 text-red transition-all duration-200 hover:brightness-125 w-8 h-8 flex justify-center items-center p-2 drop-shadow-sm rounded-sm text-lg cursor-pointer"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto  text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
