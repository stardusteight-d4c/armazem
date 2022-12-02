import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { askToRequestAgain, handleOpenModal } from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import axios from 'axios'
import { createPostAndAddToUserAccount } from '../../../services/api-routes'
import { Button } from '../../Button'
import { success } from '../../Toasters'
import { Overlay } from '../../modals/Overlay'

interface Props {}

export const PostInputModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [postMetadata, setPostMetadata] = useState<any>({ title: '', body: '' })
  const [postTextLength, setPostTextLength] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostMetadata({
      ...postMetadata,
      [event.target.id]: event.target.value,
    })
  }

  useEffect(() => {
    setPostTextLength(postMetadata?.body?.length || 0)
  }, [postMetadata.body])

  const createPost = async () => {
    setLoading(true)
    await axios
      .post(createPostAndAddToUserAccount, {
        title: postMetadata.title,
        body: postMetadata.body,
        userId: currentUser?._id,
      })
      .then(({ data }) => {
        dispatch(askToRequestAgain())
        success(data.msg)
      })
      .catch((error) => console.log(error.toJSON()))
    setLoading(false)
    dispatch(handleOpenModal(null))
  }

  const disabledButton =
    postMetadata.body.length < 50 || postMetadata.title.length < 10

  const motionProps = {
    initial: {
      y: -500,
      opacity: 0,
      translateX: '-50%',
      translateY: '-50%',
    },
    transition: { type: 'spring', duration: 0.8 },
    animate: { y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' },
    className: style.wrapper,
  }

  return (
    <>
      <Overlay />
      <motion.section {...motionProps}>
        <div className={style.header}>
          <h1 className={style.title}>New post</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className={style.closeIcon}
          />
        </div>
        <div className={style.inputTitleContainer}>
          <div className={style.titleContainer}>
            <label className={style.titleLabel}>Title</label>
            <span className={style.spanMin}>(min. 10)</span>
          </div>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            id="title"
            maxLength={200}
            placeholder="What do you want to comment on?"
            className={style.inputTitle}
          />
        </div>
        <div className={style.textareaWrapper}>
          <span className={style.userName}>{currentUser?.name}</span>
          <img
            src={currentUser?.user_img}
            className={style.userImg}
            alt="user/img"
          />
          <div className={style.textareaContainer}>
            <textarea
              onChange={(e) => handleChange(e)}
              id="body"
              maxLength={855}
              placeholder="Type your text"
              className={style.textarea}
            />
            <span
              className={`${style.charsCounter} ${
                postTextLength >= 750 && 'text-orange'
              } ${postTextLength >= 830 && 'text-red'}`}
            >
              {postTextLength}/855
              <div className={style.spanMin}>(min. 50)</div>
            </span>
          </div>
          <Button
            loading={loading}
            disabled={disabledButton}
            title="Submit"
            onClick={() => createPost()}
            className={style.buttonSubmit}
          />
        </div>
      </motion.section>
    </>
  )
}

const style = {
  wrapper: `fixed border border-dawn-weak/20 dark:border-dusk-weak/20 shadow-md md:px-14 pt-4 pb-16 z-50 w-full h-full md:w-[800px] md:h-fit text-dusk-main dark:text-dawn-main  bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`,
  header: `flex px-4 md:px-0 items-center justify-between`,
  title: `text-2xl font-semibold`,
  closeIcon: `ri-close-circle-fill text-4xl cursor-pointer`,
  inputTitleContainer: `mt-4 px-4 md:px-0 flex flex-col items-start`,
  titleContainer: `flex gap-x-2 items-center font-semibold`,
  titleLabel: `text-xl`,
  spanMin: `font-inter text-xs text-dawn-weak dark:text-dusk-weak`,
  inputTitle: `p-2 bg-transparent w-full focus:outline-none border border-dawn-weak/20 dark:border-dusk-weak/20`,
  textareaWrapper: `flex mx-4 md:mx-0 mt-14 border min-h-[80px] max-h-[325px] border-dawn-weak/20 dark:border-dusk-weak/20 relative`,
  userName: `-top-6 left-0 md:left-10 absolute font-semibold text-neutral-weak dark:text-neutral-main`,
  userImg: `w-16 h-16 hidden md:block rounded-md absolute -top-8 -left-8 border-[2px] border-dawn-weak/20 dark:border-dusk-weak/20`,
  textareaContainer: `relative w-full`,
  textarea: `w-full h-[100px] md:h-fit max-h-full min-h-[80px] p-2 md:px-10 md:py-4 bg-transparent outline-none`,
  charsCounter: `font-semibold absolute items-center flex gap-x-2 left-0 -bottom-7 font-inter`,
  buttonSubmit: `bg-prime-blue !w-28 py-2 text-white rounded-md absolute -bottom-[52px] right-0`,
}
