import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  lastFivePostsOfAccount,
  postMetadataById,
} from '../../services/api-routes'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { LastPost } from './LastPost'

interface Props {
  userMetadata: User
}

export const LastPosts = ({ userMetadata }: Props) => {
  const dispatch = useAppDispatch()
  const [postUpdatedData, setPostUpdatedData] = useState(false)
  const [lastPosts, setLastPosts] = useState<[Posts] | undefined | any>(
    undefined
  )


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
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Last posts
      </h2>
      {lastPosts !== undefined ? (
        <>
          <div className="flex gap-5 min-w-full">
            <div className="flex flex-col gap-y-5 flex-grow max-w-[50%]">
              {lastPosts
                .slice(0, 2)
                .map((post: any, index: React.Key | null | undefined) => (
                  <LastPost post={post} key={index} setPostUpdatedData={setPostUpdatedData} postUpdatedData={postUpdatedData} />
                ))}
            </div>

            <div className="flex flex-col gap-y-5 flex-grow max-w-[50%]">
              {lastPosts
                .slice(2, 4)
                .map((post: any, index: React.Key | null | undefined) => (
                  <LastPost post={post} key={index} setPostUpdatedData={setPostUpdatedData} postUpdatedData={postUpdatedData} />
                ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              title="See all"
              onClick={() => dispatch(handleOpenModal('AllPosts'))}
              className="bg-prime-blue my-5 !text-xl p-4 px-16 "
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-2xl my-8">
          No posts yet
        </div>
      )}
    </section>
  )
}
