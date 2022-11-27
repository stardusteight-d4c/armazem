import { useEffect, useState } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import {
  Favorites,
  Header,
  LastPosts,
  LastUpdates,
  SharedPosts,
  StatusBar,
} from '../components'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import axios from 'axios'
import { dataByUsername } from '../services/api-routes'
import { useParams } from 'react-router-dom'
import { Comments } from '../components/account/Comments'
import { handleUserMetadata } from '../store'

export const Account = () => {
  const dispatch = useAppDispatch()
  const { username } = useParams()
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${dataByUsername}/${username}`)
        .then(({ data }) => dispatch(handleUserMetadata(data.user)))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [username, requestAgain])

  const dataLoaded =
    currentAccount.user !== undefined && userMetadata !== null && username

  if (!dataLoaded) {
    return
  }

  return (
    <GridWrapper loading={loading}>
      <main className="w-screen md:w-full">
        <Header userMetadata={userMetadata} currentAccount={currentAccount} />
        <div className="mt-6 md:mt-0 p-2 md:p-4 pb-16 md:pb-14">
          <StatusBar userMetadata={userMetadata} />
          <Favorites />
          <LastPosts userMetadata={userMetadata} />
          <SharedPosts userMetadata={userMetadata} />
          <LastUpdates />
          <Comments userMetadata={userMetadata} />
        </div>
      </main>
    </GridWrapper>
  )
}
