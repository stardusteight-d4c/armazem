import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { sharedPosts } from '../../services/api-routes'
import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../Button'
import { SharedPost } from './integrate/SharedPost'

interface Props {}

export const SharedPosts = ({}: Props) => {
  const [sharedPostsData, setSharedPostsData] = useState([])
  const dispatch = useAppDispatch()
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  if (!userMetadata) {
    return <></>
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${sharedPosts}/${userMetadata.account}`)
      if (data.status === true) {
        setSharedPostsData(data.sharedPosts)
      }
    })()
  }, [userMetadata])

  return (
    <section className={style.sectionWrapperEffect}>
      <h2 className={style.title}>Shared posts</h2>
      {sharedPostsData.length > 0 ? (
        <>
          <div className={style.container}>
            {sharedPostsData
              .slice(0, 3)
              .reverse()
              .map((post: Post, index: React.Key) => (
                <SharedPost key={index} post={post} />
              ))}
          </div>
          <div className={style.buttonContainer}>
            <Button
              title="See all"
              onClick={() => dispatch(handleOpenModal('SharedPosts'))}
              className={style.button}
            />
          </div>
        </>
      ) : (
        <div className={style.noPostShared}>No posts shared yet</div>
      )}
    </section>
  )
}

const style = {
  sectionWrapperEffect: `break-all`,
  title: `text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  container: `flex flex-col gap-y-5`,
  buttonContainer: `flex items-center justify-center`,
  button: `bg-prime-blue my-5 !text-xl p-4 px-16`,
  noPostShared: `flex items-center justify-center text-2xl my-8 mb-14 md:mb-0`,
}
