import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  AcceptList,
  ConnectionsList,
  Filter,
  PendingList,
} from '../components/connections'
import { GridWrapper } from '../components/GridWrapper'
import { userData } from '../services/api-routes'
import { useAppSelector } from '../store/hooks'

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
    <GridWrapper>
      <main className={style.mainWrapper}>
        <Filter active={active} setActive={setActive} accept={accept} />
        {active === 'connections' && connections.length === 0 && (
          <div className={style.noContent}>You don't have connections yet</div>
        )}
        {connections.length !== 0 && (
          <ConnectionsList
            active={active}
            connections={connections}
            setRequestAgainFromConnections={setRequestAgainFromConnections}
          />
        )}

        {active === 'pending' && pending.length === 0 && (
          <div className={style.noContent}>There are no requests sent</div>
        )}
        {pending.length !== 0 && (
          <PendingList
            active={active}
            pending={pending}
            setRequestAgainFromPending={setRequestAgainFromPending}
          />
        )}

        {active === 'accept' && accept.length === 0 && (
          <div className={style.noContent}>There are no requests received</div>
        )}
        {accept.length !== 0 && (
          <AcceptList
            active={active}
            accept={accept}
            setRequestAgainFromAccept={setRequestAgainFromAccept}
          />
        )}
      </main>
    </GridWrapper>
  )
}

const style = {
  mainWrapper: `min-h-screen`,
  noContent: `text-3xl mt-28 text-center h-full text-dusk-main dark:text-dawn-main flex items-center justify-center`,
}
