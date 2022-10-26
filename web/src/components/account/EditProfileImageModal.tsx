import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { handleOpenModal } from '../../store'
import { useAppDispatch } from '../../store/hooks'
import { Button } from '../Button'

interface Props {}

export const EditProfileImageModal = (props: Props) => {
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<string | null>('')
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const getFileMetadata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      const file = readerEvent.target?.result
      if (file) {
        setSelectedFile(readerEvent.target.result as string)
      }
    }
  }

  console.log(selectedFile)

  return (
    <>
      <motion.div
        onClick={() => dispatch(handleOpenModal(null))}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-fill-strong/30"
      />
      {/* Colocar a overlay/backdrop como componente que aceita children*/}
      <motion.section
        initial={{
          y: -500,
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        animate={{ y: 0, opacity: 1, translateX: '-50%', translateY: '-50%' }}
        className="absolute drop-shadow-2xl rounded-sm p-4  z-50 w-[800px] text-dusk-main dark:text-dawn-main h-fit bg-white dark:bg-fill-strong top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Send a profile picture</h1>
          <i
            onClick={() => dispatch(handleOpenModal(null))}
            className="ri-close-circle-fill text-4xl cursor-pointer"
          />
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div>
            {selectedFile ? (
              <div className="relative">
                <img src={selectedFile} className="w-40 h-40 border" />
                <i
                  onClick={() => setSelectedFile(null)}
                  className="ri-close-line dark:text-dusk-main w-10 h-10 text-dawn-main cursor-pointer dark:bg-white/50 bg-black/50 flex items-center p-2 rounded-full text-2xl absolute right-2 top-2"
                />
                <Button
                  title="Submit"
                  onClick={() => filePickerRef.current.click()}
                  className="bg-prime-blue !w-full my-4 py-2 text-white rounded-md"
                />
              </div>
            ) : (
              <>
                <div className="w-40 h-40 border rounded-md flex items-center justify-center" />
                <Button
                  title="Upload picture"
                  onClick={() => filePickerRef.current.click()}
                  className="bg-prime-blue !w-full my-4 py-2 text-white rounded-md"
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
                onChange={(e) => getFileMetadata(e)}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
