import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { askToRequestAgain, handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import axios from 'axios'
import { createPostAndAddToUserAccount } from '../../services/api-routes'
import { Button } from '../Button'
import { success } from '../Toasters'

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
    try {
      const { data } = await axios.post(createPostAndAddToUserAccount, {
        title: postMetadata.title,
        body: postMetadata.body,
        userId: currentUser?._id,
      })
      if (data.status === true) {
        dispatch(askToRequestAgain())
        success(data.msg)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    dispatch(handleOpenModal(null))
  }

  const disabledButton =
    postMetadata.body.length < 50 || postMetadata.title.length < 10

  return (
    <>
      <motion.div
        onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="fixed z-40 inset-0 w-screen h-screen dark:bg-fill-weak/10 bg-fill-strong/10"
      />
      <motion.section
        initial={{
          y: -500,
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        animate={{ y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' }}
        className="fixed border border-dawn-weak/20 dark:border-dusk-weak/20 drop-shadow-2xl px-14 pt-4 pb-16 z-50 w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New post</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className="ri-close-circle-fill text-4xl cursor-pointer"
          />
        </div>
        <div className="mt-4 flex flex-col items-start">
          <div className="flex gap-x-2 items-center font-semibold">
            <label className="text-xl">Title</label>
            <div className="font-inter text-xs text-dawn-weak dark:text-dusk-weak">(min. 10)</div>
          </div>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            id="title"
            maxLength={200}
            placeholder="What do you want to comment on?"
            className="p-2 bg-transparent w-full focus:outline-none border border-dawn-weak/20 dark:border-dusk-weak/20"
          />
        </div>
        <div className="flex mt-14 border min-h-[80px] max-h-[325px] border-dawn-weak/20 dark:border-dusk-weak/20 relative">
          <span className="-top-6 left-10 absolute font-semibold text-[#707070] dark:text-[#9B9B9B]">
            {currentUser?.name}
          </span>
          <img
            src={currentUser?.user_img}
            className="w-16 h-16 rounded-md absolute -top-8 -left-8 border-[2px] border-dawn-weak/20 dark:border-dusk-weak/20 "
            alt=""
          />
          <div className="relative w-full">
            <textarea
              onChange={(e) => handleChange(e)}
              id="body"
              maxLength={855}
              placeholder="Type your text"
              className="w-full max-h-full min-h-[80px] px-10 py-4 bg-transparent outline-none"
            />
            <span
              className={`font-semibold absolute items-center flex gap-x-2 left-0 -bottom-7 font-inter ${
                postTextLength >= 750 && 'text-orange'
              } ${postTextLength >= 830 && 'text-red'}`}
            >
              {postTextLength}/855
              <div className="text-xs text-dawn-weak dark:text-dusk-weak">(min. 50)</div>
            </span>
          </div>
          <Button
            loading={loading}
            disabled={disabledButton}
            title="Submit"
            onClick={() => createPost()}
            className="bg-prime-blue !w-28 py-2 text-white rounded-md absolute -bottom-[52px] right-0"
          />
        </div>
      </motion.section>
    </>
  )
}
