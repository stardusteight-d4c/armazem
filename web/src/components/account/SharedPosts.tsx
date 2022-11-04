import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { sharedPosts } from '../../services/api-routes'
import { Button } from '../Button'
import { SharedPostCard } from './SharedPostCard'

interface Props {
  userMetadata: User
}

export const SharedPosts = ({ userMetadata }: Props) => {
  const [sharedPostsData, setSharedPostsData] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.post(sharedPosts, {
        accountId: userMetadata.account,
      })
      if (data.status === true) {
        setSharedPostsData(data.sharedPosts)
      }
    })()
  }, [userMetadata])


  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Shared posts
      </h2>
      <div className="flex flex-col gap-y-5">
        {sharedPostsData.map((post, index) => (
          <SharedPostCard key={index} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Button
          title="See all"
          className="bg-prime-blue my-5 !text-xl p-4 px-16 "
        />
      </div>
    </section>
  )
}
