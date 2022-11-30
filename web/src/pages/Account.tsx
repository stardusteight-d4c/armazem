import { useEffect, useState } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import axios from 'axios'
import { dataByUsername } from '../services/api-routes'
import { useParams } from 'react-router-dom'
import { handleUserMetadata } from '../store'
import {
  Comments,
  Favorites,
  Header,
  LastPosts,
  LastUpdates,
  SharedPosts,
  StatusBar,
} from '../components/account'

interface Props {}

export const Account = (props: Props) => {
  const dispatch = useAppDispatch()
  const { username } = useParams()
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)

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
    return <></>
  }

  return (
    <GridWrapper>
      <main className={style.mainWrapper}>
        <Header />
        <div className={style.accountFeed}>
          <StatusBar />
          <Favorites />
          <LastPosts />
          <SharedPosts />
          <LastUpdates />
          <Comments />
        </div>
      </main>
    </GridWrapper>
  )
}

const style = {
  mainWrapper: `w-screen md:w-full`,
  accountFeed: `mt-6 md:mt-0 p-2 md:p-4 pb-16 mb-7 md:mb-0 md:pb-14`,
}
