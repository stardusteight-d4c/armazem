import React from 'react'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  clearRegisterValuesEntries,
  handleChangeRegisterValues,
} from '../../store'
import { disableButton } from '../../services/validate-form'

interface Props {
  handleConfirmEmail: (event: React.FormEvent) => Promise<void>
  loading: boolean
  setProceedToConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmEmail = ({
  handleConfirmEmail,
  loading,
  setProceedToConfirmEmail,
}: Props) => {
  const registerValues = useAppSelector(
    (state) => state.armazem.registerValues
  )
  const dispatch = useAppDispatch()

  return (
    <motion.form
      onSubmit={(e) => handleConfirmEmail(e)}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-md"
    >
      <i
        onClick={() => (
          dispatch(clearRegisterValuesEntries()),
          setProceedToConfirmEmail(false)
        )}
        className="ri-arrow-left-line absolute top-5 left-5 text-3xl p-2 cursor-pointer"
      />

      <Toaster position="top-left" />
      <h1 className="text-4xl font-semibold">Enter your email</h1>
      <span className="text-sm text-dawn-weak dark:text-dusk-weak">
        *so that in the future you can recover your credentials
      </span>
      <div className="py-4">
        <label
          htmlFor="email"
          className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          required
          placeholder="Your e-mail address"
          onChange={(e) => dispatch(handleChangeRegisterValues(e))}
          className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
        />
      </div>
      <Button
        type="submit"
        title="Send me confirmation code"
        loading={loading}
        className="mt-2 bg-prime-purple"
        disabled={disableButton(registerValues)}
      />
    </motion.form>
  )
}
