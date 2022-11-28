import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userData } from '../../../services/api-routes'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'

timeago.register('en_short', en_short)

interface Props {
  post: Post
}

export const SharedPost = ({ post }: Props) => {
  const [authorPost, setAuthorPost] = useState<User>()

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${userData}/${post?.by}`)
        .then(({ data }) => setAuthorPost(data.user))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [])

  return (
    <article className={style.wrapper}>
      <div className={style.postMetadataContainer}>
        <Link to={`/${authorPost?.username}`} className={style.authorContainer}>
          <img
            src={authorPost?.user_img}
            alt="author/img"
            className={style.authorImg}
          />
          <span className={style.authorName}>{authorPost?.name}</span>
        </Link>
        <TimeAgo datetime={post.createdAt} locale="en_short" />
      </div>
      <Link to={`/post/${post?._id}`}>
        <div>
          <h2 className={style.title}>{post?.title}</h2>
        </div>
        <p>{post?.body}</p>
      </Link>
    </article>
  )
}

const style = {
  wrapper: `w-full cursor-pointer h-fit text-neutral-weak dark:text-neutral-main bg-fill-weak dark:bg-fill-strong`,
  postMetadataContainer: `flex items-center justify-between`,
  authorContainer: `flex items-center gap-3`,
  authorImg: `w-12 h-12 object-cover`,
  authorName: `font-medium text-xl text-dusk-main dark:text-dawn-main`,
  title: `font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main`,
}
