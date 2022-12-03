import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { success } from '../../components/Toasters'
import {
  deletePost,
  likePost,
  sharePost,
  unlikedPost,
  unsharePost,
  updatePost,
} from '../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { askToRequestAgain } from '../../store'
import { Header } from './integrate/Header'
import { Dropdown } from '../Dropdown'

interface Props {
  post: Post
  authorUser: User
}

export const Article = ({ post, authorUser }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()
  const [editValue, setEditValue] = useState(post?.body)
  const currentAccount = useAppSelector((state) => state.armazem.currentAccount)
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('')

  const handleLikePost = async () => {
    if (likedByUser()) {
      await axios.put(unlikedPost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      dispatch(askToRequestAgain())
    } else {
      await axios.put(likePost, {
        userId: currentUser?._id,
        postId: post?._id,
      })
      dispatch(askToRequestAgain())
    }
  }

  const editPost = async () => {
    await axios
      .put(updatePost, {
        postId: post?._id,
        body: editValue,
      })
      .then(({ data }) => {
        success(data.msg)
        dispatch(askToRequestAgain())
        setActiveItem('')
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const addPostToSharedPosts = async () => {
    await axios
      .put(sharePost, {
        postId: post?._id,
        accountId: currentUser?.account,
      })
      .then(({ data }) => {
        success(data.msg)
        dispatch(askToRequestAgain())
        setActiveItem('')
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const removePostToSharedPosts = async () => {
    await axios
      .put(unsharePost, {
        postId: post?._id,
        accountId: currentUser?.account,
      })
      .then(({ data }) => {
        success(data.msg)
        dispatch(askToRequestAgain())
        setActiveItem('')
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const removePost = async () => {
    await axios
      .delete(deletePost, {
        params: {
          postId: post?._id,
          accountId: currentUser?.account,
        },
      })
      .then(({ data }) => {
        success(data.msg)
        navigate(`/${authorUser?.username}`)
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const handleActiveItemEditOnClick = () => {
    activeItem === post?._id + 'EDIT'
      ? setActiveItem('')
      : setActiveItem(post?._id + 'EDIT')
  }

  const likedByUser = () => {
    if (post && currentUser) {
      const verificationResult = post?.likes.map(
        (like: { by: string | undefined }) => {
          if (like.by == currentUser?._id) {
            return true
          } else {
            return false
          }
        }
      )
      return verificationResult.includes(true)
    }
  }

  const sharedPosts = currentAccount?.sharedPosts?.map(
    (postShared: any) => postShared.id
  )
  const isSharedPosts = currentAccount && sharedPosts?.includes(post?._id)

  const shareItems = {
    share: [
      {
        item: 'Share',
        function: () => addPostToSharedPosts(),
      },
      {
        item: 'Cancel',
      },
    ],
    unShare: [
      {
        item: 'Unshare',
        function: () => removePostToSharedPosts(),
      },
      {
        item: 'Cancel',
      },
    ],
  }

  const deleteItems = [
    {
      item: 'Delete',
      function: () => removePost(),
    },
    {
      item: 'Cancel',
    },
  ]

  const rendersEditArticle = () => (
    <div className={style.editArticle}>
      <textarea
        value={editValue}
        maxLength={855}
        minLength={50}
        onChange={(e) => setEditValue(e.target.value)}
        className={style.editTextAreaInput}
      />
      <div className={style.submitEditContainer}>
        <Button
          disabled={editValue?.trim() === '' && editValue?.length <= 50}
          title="Submit"
          onClick={() => editPost()}
          className={style.buttonSubmitEdit}
        />
      </div>
    </div>
  )

  const rendersLike = () => (
    <div className={style.wrapperLike}>
      <div onClick={handleLikePost} className={style.likeContainer}>
        {likedByUser && (
          <i className={likedByUser() ? style.likedIcon : style.likeIcon} />
        )}
        <span className={style.likeSpan}>
          {post?.likes.length} {post?.likes.length <= 1 ? 'Like' : 'Likes'}
        </span>
      </div>
    </div>
  )

  const rendersShare = () => (
    <>
      {isSharedPosts ? (
        <div className={style.shareContainer}>
          <Dropdown
            title="Unshare"
            items={shareItems.unShare}
            space="space-x-2 space-y-8"
          >
            <div className={style.sharedSpanContainer}>
              <i className={style.shareIcon} />
              <span className={style.spanText}>Shared</span>
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className={style.shareContainer}>
          <Dropdown
            title="Share"
            items={shareItems.share}
            space="space-x-2 space-y-8"
          >
            <div className={style.shareContainer}>
              <i className={style.shareIcon} />
              <span className={style.spanText}>Share</span>
            </div>
          </Dropdown>
        </div>
      )}
    </>
  )

  const rendersAuthorActions = () => (
    <>
      <div
        onClick={handleActiveItemEditOnClick}
        className={style.editSpanContainer}
      >
        <i className={style.editIcon} />
        <span className={style.spanText}>Edit</span>
      </div>
      <Dropdown title="Share" items={deleteItems} space="space-x-2 space-y-8">
        <div className={style.deleteSpanContainer}>
          <i className={style.deleteIcon} />
          <span className={style.spanText}>Delete</span>
        </div>
      </Dropdown>
    </>
  )

  return (
    <article className={style.wrapper}>
      <Header post={post} authorUser={authorUser} />
      {activeItem === post?._id + 'EDIT' ? (
        rendersEditArticle()
      ) : (
        <pre className={style.postBody}>{post!.body}</pre>
      )}
      <div className={style.divider} />
      <div className={style.postActionsContainer}>
        {rendersLike()}
        <div className={style.deleteShareEditContainer}>
          {authorUser?._id !== currentUser?._id
            ? rendersShare()
            : rendersAuthorActions()}
        </div>
      </div>
    </article>
  )
}

const style = {
  wrapper: `px-4 pb-3 border border-dawn-weak/20 dark:border-dusk-weak/20 bg-white dark:bg-fill-strong pt-4 mt-4`,
  editArticle: `flex flex-col`,
  editTextAreaInput: `p-1 mt-1 text-lg outline-none bg-transparent border-prime-blue border max-h-56 min-h-[180px] text-dusk-main/90 dark:text-dawn-main/90`,
  submitEditContainer: `flex justify-end`,
  buttonSubmitEdit: `!bg-prime-blue my-2 px-4 py-2 !w-fit`,
  postBody: `py-2 font-inter break-words break-all whitespace-pre-wrap text-xl leading-9 mt-2`,
  divider: `h-[1px] w-[full] my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  postActionsContainer: `flex items-center justify-between text-dusk-main dark:text-dawn-main`,
  wrapperLike: `flex items-center gap-x-5`,
  likeContainer: `flex items-center cursor-pointer`,
  likedIcon: `ri-heart-3-fill text-prime-blue text-2xl pr-1`,
  likeIcon: `ri-heart-3-line text-2xl pr-1`,
  likeSpan: `text-xl`,
  deleteShareEditContainer: `flex items-center gap-x-5 cursor-pointer`,
  shareContainer: `relative flex items-center`,
  sharedSpanContainer: `text-orange flex items-center cursor-pointer`,
  shareIcon: `ri-share-box-line pr-1 text-2xl`,
  spanText: `text-xl`,
  shareSpanContainer: `flex items-center w-full cursor-pointer`,
  editSpanContainer: `flex items-center cursor-pointer`,
  editIcon: `ri-edit-2-fill p-1 text-2xl`,
  deleteSpanContainer: `flex relative items-center cursor-pointer`,
  deleteIcon: `ri-delete-bin-2-fill p-1 text-2xl`,
}
