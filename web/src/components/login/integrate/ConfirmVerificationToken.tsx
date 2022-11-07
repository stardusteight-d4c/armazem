import React from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Button } from '../../Button'

interface Props {
  handleSubmit: (event: React.FormEvent) => Promise<void>
  setUserToken: React.Dispatch<React.SetStateAction<string>>
}

export const ConfirmVerificationToken = ({ data }: { data: Props }) => {
  const { handleSubmit, setUserToken } = data
  return (
    <motion.form
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      onSubmit={(e) => handleSubmit(e)}
      className=" bg-fill-weak dark:bg-fill-strong w-[30vw]"
    >
      <label
        htmlFor="token"
        className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
      >
        Confirm email
      </label>
      <input
        type="text"
        id="token"
        required
        onChange={(e) => setUserToken(e.target.value)}
        placeholder="Paste token"
        className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
      />
      <Button
        type="submit"
        title="Confirm email"
        className="mt-2 bg-prime-purple"
      />
    </motion.form>
  )
}
