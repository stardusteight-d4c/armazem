import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  askToRequestAgain,
  handleOpenModal,
} from '../../../store'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Button } from '../../Button'
import axios from 'axios'
import { updateProfileImage } from '../../../services/api-routes'
import { Overlay } from '../../modals/Overlay'

interface Props {}

export const EditProfileImageModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<string | null>('')
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const reader = new FileReader()

  const convertFileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      const file = readerEvent.target?.result
      if (file) {
        setSelectedFile(readerEvent.target.result as string)
      }
    }
    setLoading(false)
  }

  const updateProfileImageById = async () => {
    setLoading(true)
    await axios
      .put(updateProfileImage, {
        user_img: selectedFile,
        id: currentUser?._id,
      })
      .then(() => {
        dispatch(askToRequestAgain())
        dispatch(handleOpenModal(null))
      })
      .catch((error) => console.log(error.toJSON()))
    setLoading(false)
  }

  const motionSectionProperties = {
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
      <motion.section {...motionSectionProperties}>
        <div className={style.header}>
          <h1 className={style.title}>Send a profile picture</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className={style.closeIcon}
          />
        </div>
        <div className={style.contentContainer}>
          <div>
            {selectedFile ? (
              <div className={style.selectedFileContainer}>
                <img src={selectedFile} className={style.selectedFileImg} />
                <i
                  onClick={() => setSelectedFile(null)}
                  className={style.removeSelectedFileIcon}
                />
                <Button
                  title="Submit"
                  loading={loading}
                  onClick={() => updateProfileImageById()}
                  className={style.buttonSubmit}
                />
              </div>
            ) : (
              <>
                <div className={style.ghostSquare} />
                <Button
                  title="Upload picture"
                  loading={loading}
                  onClick={() => filePickerRef.current.click()}
                  className={style.buttonUploadPicture}
                />
              </>
            )}
            <div>
              <input
                type="file"
                ref={filePickerRef}
                accept=".jpg,.png,.jpeg"
                size={5000000} // 5 MB
                hidden
                onChange={(e) => convertFileToBase64(e)}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

const style = {
  wrapper: `fixed border border-dawn-weak/20 dark:border-dusk-weak/20 shadow-md p-4 z-50 w-[95vw] md:w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-fill-weak dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`,
  header: `flex items-center justify-between`,
  title: `text-2xl font-semibold`,
  closeIcon: `ri-close-circle-fill text-4xl cursor-pointer`,
  contentContainer: `mt-4 flex items-center justify-center`,
  selectedFileContainer: `relative`,
  selectedFileImg: `w-40 h-40 border border-dawn-weak/20 dark:border-dusk-weak/20`,
  removeSelectedFileIcon: `ri-close-line dark:text-dusk-main w-10 h-10 text-dawn-main cursor-pointer dark:bg-white/50 bg-black/50 flex items-center p-2 rounded-full text-2xl absolute right-2 top-2`,
  buttonSubmit: `bg-prime-blue md:!w-full my-4 py-2 text-white rounded-lg`,
  ghostSquare: `w-40 h-40 border border-dashed flex items-center justify-center`,
  buttonUploadPicture: `bg-prime-blue md:!w-full my-4 py-2 text-white rounded-l`,
}
