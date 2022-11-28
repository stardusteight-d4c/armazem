import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { sharedPosts } from '../../services/api-routes'
import { handleOpenModal } from '../../store'
import { useAppDispatch } from '../../store/hooks'
import { Button } from '../Button'
import { SharedPost } from './integrate/SharedPost'

interface Props {
  userMetadata: User
}

export const SharedPosts = ({ userMetadata }: Props) => {
  const [sharedPostsData, setSharedPostsData] = useState([])
  const dispatch = useAppDispatch()

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
    <section className='break-all'>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Shared posts
      </h2>
      {sharedPostsData.length > 0 ? (
        <>
      <div className="flex flex-col gap-y-5">
        {sharedPostsData.slice(0,3).reverse().map((post, index) => (
          <SharedPost key={index} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Button
          title="See all"
          onClick={() => dispatch(handleOpenModal('SharedPosts'))}
          className="bg-prime-blue my-5 !text-xl p-4 px-16 "
        />
      </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-2xl my-8 mb-14 md:mb-0">
          No posts shared yet
        </div>
      )}
    </section>
  )
}
