import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { ConnectionStatus } from '../../ConnectionStatus'

interface Props {
  post: Post
  authorUser: User
}

export const Header = ({ post, authorUser }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)

  return (
    <header>
      <div className={style.titleContainer}>
        <span className={style.spanTitle}>{post?.title}</span>
        <span className={style.spanDate}>
          {new Date(post!.createdAt).toLocaleString('en-US')}
        </span>
      </div>
      <section className={style.userInfosContainer}>
        <Link to={`/${authorUser?.username}`} className={style.authorLink}>
          <img
            className={style.authorImage}
            src={authorUser?.user_img}
            alt="author/img"
          />
          <div className={style.authorSpanContainer}>
            <span className={style.authorName}>{authorUser?.name}</span>
            <span className={style.authorUsername}>
              @{authorUser?.username}
            </span>
          </div>
        </Link>
        <div className={style.connectionStatus}>
          {authorUser?._id !== currentUser?._id && (
            <ConnectionStatus
              userMetadata={authorUser!}
              currentAccount={currentAccount}
            />
          )}
        </div>
      </section>
    </header>
  )
}

const style = {
  titleContainer: `flex flex-col md:flex-row md:justify-between pb-4 md:items-center`,
  spanTitle: `text-3xl text-left md:text-left md:text-4xl break-all font-inter font-semibold md:w-[700px]`,
  spanDate: `text-lg w-fit mt-2`,
  userInfosContainer: `flex justify-between items-center`,
  authorLink: `flex items-start justify-start gap-x-2`,
  authorImage: `w-14 h-14 rounded-md`,
  authorSpanContainer: `flex flex-col -mt-1 text-dusk-main/90 dark:text-dawn-main/90`,
  authorName: `text-2xl font-semibold`,
  authorUsername: `text-lg`,
  connectionStatus: `hidden md:inline-block`,
}
