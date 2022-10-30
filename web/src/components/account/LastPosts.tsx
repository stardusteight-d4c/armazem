import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { lastFivePostsOfAccount } from '../../services/api-routes'
import { askToRequestAgain } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { LastPostFirstSection, LastPostSecondSection } from './LastPost'

interface Props {
  userMetadata: User
}

export const LastPosts = ({ userMetadata }: Props) => {
  const [posts, setPosts] = useState<[Posts] | undefined>(undefined)
  const requestAgain = useAppSelector((state) => state.armazem.requestAgain)
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${lastFivePostsOfAccount}/${userMetadata.account}`
      )
      if (data.posts.length > 0) {
        setPosts(data.posts)
      } else {
        setPosts(undefined)
      }
    })()
  }, [userMetadata, requestAgain])

  console.log(posts)

  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Last posts
      </h2>
      {posts !== undefined ? (
        <>
          <div className="flex gap-5">
            <div className="flex flex-col gap-y-5 max-w-[50%]">
              {posts.slice(0, 2).map((post) => (
                <LastPostFirstSection post={post.post} />
              ))}
            </div>

            <div className="flex flex-col gap-y-5 max-w-[50%]">
              {posts.slice(2, 4).map((post) => (
                <LastPostSecondSection post={post.post} />
              ))}
            </div>
          </div>
            <div className="flex items-center justify-center">
              <Button
                title="See all"
                className="bg-prime-blue my-5 !text-xl p-4 px-16 "
              />
            </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-2xl my-8">
          No posts here yet
        </div>
      )}
    </section>
  )
}
