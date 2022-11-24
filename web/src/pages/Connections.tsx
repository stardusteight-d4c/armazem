import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AcceptList,
  ConnectionsList,
  Filter,
  Navbar,
  PendingList,
  Sidebar,
} from '../components'
import { Loader } from '../components/Loader'
import { MobileNav } from '../components/menu'
import { MobileSearch } from '../components/menu/MobileSearch'
import { removeConnection, userData } from '../services/api-routes'
import { askToRequestAgain } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface Props {}

export const Connections = (props: Props) => {
  const currentAccount: Account = useAppSelector(
    (state) => state.armazem.currentAccount
  )
  const [connections, setConnections] = useState<[User] | any>([])
  const [pending, setPending] = useState<[User] | any>([])
  const [accept, setAccept] = useState<[User] | any>([])
  const [active, setActive] = useState('connections')
  const [requestAgainFromPending, setRequestAgainFromPending] = useState(false)
  const [requestAgainFromAccept, setRequestAgainFromAccept] = useState(false)
  const [requestAgainFromConnections, setRequestAgainFromConnections] =
    useState(false)
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  const requestAgain =
    requestAgainFromPending ||
    requestAgainFromAccept ||
    requestAgainFromConnections

  useEffect(() => {
    if (currentAccount.connections !== undefined || requestAgain) {
      const user: any[] = []
      setConnections([])
      if (
        connections.length < currentAccount.connections.length ||
        requestAgainFromConnections
      ) {
        currentAccount.connections.map(async (connection) => {
          const { data } = await axios.get(`${userData}/${connection.with}`)
          user.push(data.user)
          setConnections(user)
        })
      }
    }

    if (currentAccount.requestsSent !== undefined || requestAgain) {
      const user: any[] = []
      setPending([])
      if (pending.length < currentAccount.requestsSent.length || requestAgain) {
        currentAccount.requestsSent.map(async (request) => {
          const { data } = await axios.get(`${userData}/${request.to}`)
          user.push(data.user)
          setPending(user)
        })
      }
    }

    if (currentAccount.requestsReceived !== undefined || requestAgain) {
      const user: any[] = []
      setAccept([])
      if (
        accept.length < currentAccount.requestsReceived.length ||
        requestAgainFromAccept
      ) {
        currentAccount.requestsReceived.map(async (requests) => {
          const { data } = await axios.get(`${userData}/${requests.from}`)
          user.push(data.user)
          setAccept(user)
        })
      }
    }
    setRequestAgainFromPending(false)
    setRequestAgainFromAccept(false)
    setRequestAgainFromConnections(false)
  }, [requestAgain])

  return (
    <>
      <div
        className={`${style.gridContainer} ${
          minimizeSidebar
            ? 'grid-cols-1 md:grid-cols-18'
            : 'grid-cols-1 md:grid-cols-5'
        }`}
      >
        <Sidebar />
        <div
          className={`${style.mainContent} ${
            minimizeSidebar
              ? 'col-span-1 md:col-span-17'
              : 'col-span-1 md:col-span-4'
          }`}
        >
          <Navbar />
          <MobileSearch />
          <MobileNav />
          <main className="min-h-screen">
            <Filter active={active} setActive={setActive} accept={accept} />
            {active === 'connections' && connections.length === 0 && (
              <div className="text-3xl mt-28 text-center h-full text-dusk-main dark:text-dawn-main flex items-center justify-center">
                You don't have connections yet
              </div>
            )}
            {connections.length !== 0 && (
              <ConnectionsList
                active={active}
                connections={connections}
                setRequestAgainFromConnections={setRequestAgainFromConnections}
              />
            )}

            {active === 'pending' && pending.length === 0 && (
              <div className="text-3xl mt-28 text-center h-full text-dusk-main dark:text-dawn-main flex items-center justify-center">
                There are no requests sent
              </div>
            )}
            {pending.length !== 0 && (
              <PendingList
                active={active}
                pending={pending}
                setRequestAgainFromPending={setRequestAgainFromPending}
              />
            )}

            {active === 'accept' && accept.length === 0 && (
              <div className="text-3xl mt-28 text-center h-full text-dusk-main dark:text-dawn-main flex items-center justify-center">
                There are no requests received
              </div>
            )}
            {accept.length !== 0 && (
              <AcceptList
                active={active}
                accept={accept}
                setRequestAgainFromAccept={setRequestAgainFromAccept}
              />
            )}
          </main>
        </div>
      </div>
    </>
  )
}

const style = {
  gridContainer: `grid overflow-hidden lg:max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
