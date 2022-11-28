import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  lastFivePostsOfAccount,
  postMetadataById,
} from '../../services/api-routes'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { LastPost } from './integrate/LastPost'

interface Props {}

export const LastPosts = ({}: Props) => {
  const dispatch = useAppDispatch()
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const [postUpdatedData, setPostUpdatedData] = useState(false)
  const [lastPosts, setLastPosts] = useState<[Posts] | any>(undefined)

  if (!userMetadata) {
    return <></>
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${lastFivePostsOfAccount}/${userMetadata.account}`
      )
      data.status === true
        ? setLastPosts(data.lastPosts)
        : setLastPosts(undefined)
    })()
  }, [userMetadata, postUpdatedData])

  return (
    <section>
      <h2 className={style.title}>Last posts</h2>
      {lastPosts !== undefined ? (
        <>
          <div className={style.container}>
            <div className={style.sectionWrapper}>
              {lastPosts.slice(0, 2).map((post: Post, index: React.Key) => (
                <LastPost
                  post={post}
                  key={index}
                  setPostUpdatedData={setPostUpdatedData}
                  postUpdatedData={postUpdatedData}
                />
              ))}
            </div>

            <div className={style.sectionWrapper}>
              {lastPosts.slice(2, 4).map((post: any, index: React.Key) => (
                <LastPost
                  post={post}
                  key={index}
                  setPostUpdatedData={setPostUpdatedData}
                  postUpdatedData={postUpdatedData}
                />
              ))}
            </div>
          </div>
          <div className={style.buttonContainer}>
            <Button
              title="See all"
              onClick={() => dispatch(handleOpenModal('AllPosts'))}
              className={style.button}
            />
          </div>
        </>
      ) : (
        <div className={style.noPosts}>No posts yet</div>
      )}
    </section>
  )
}

const style = {
  title: `text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  container: `flex flex-col md:flex-row gap-5 min-w-full`,
  sectionWrapper: `flex flex-col gap-y-5 flex-grow md:max-w-[50%]`,
  buttonContainer: `flex items-center justify-center`,
  button: `bg-prime-blue my-5 !text-xl p-4 px-16`,
  noPosts: `flex items-center justify-center text-2xl my-8`,
}
