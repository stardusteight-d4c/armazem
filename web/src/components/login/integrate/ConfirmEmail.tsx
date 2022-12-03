import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  clearRegisterValuesEntries,
  handleChangeRegisterValues,
} from '../../../store'
import { emailInputData } from './input-data'
import { Input } from './Input'
import { disableButton, handleValidation } from './validate-form'
import axios from 'axios'
import { emailConfirmation } from '../../../services/api-routes'
import { error, success } from '../../Toasters'

interface Props {
  setToken: React.Dispatch<React.SetStateAction<undefined>>
  setProceedToConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmEmail = ({ setProceedToConfirmEmail, setToken }: Props) => {
  const registerValues = useAppSelector((state) => state.armazem.registerValues)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)

  const handleConfirmEmail = async (event: React.FormEvent) => {
    event.preventDefault()
    if (handleValidation(registerValues, setProceedToConfirmEmail)) {
      setLoading(true)
      const { email, firstName, lastName } = registerValues
      const name = firstName + ' ' + lastName
      const { data } = await axios.put(emailConfirmation, {
        name,
        email,
      })
      if (data.status === false) {
        setLoading(false)
        error(data.msg)
      }
      if (data.status === true) {
        setLoading(false)
        setToken(data.token)
        success(data.msg)
      }
    }
  }

  const isDisableButton =
    disableButton(registerValues) ||
    inputValue?.trim() === '' ||
    inputValue === undefined

  return (
    <>
      <i
        tabIndex={0}
        title="Back"
        onKeyDown={(e) =>
          e.key === 'Enter' &&
          (dispatch(clearRegisterValuesEntries()),
          setProceedToConfirmEmail(false))
        }
        onClick={() => (
          dispatch(clearRegisterValuesEntries()),
          setProceedToConfirmEmail(false)
        )}
        className={style.arrowBack}
      />
      <motion.form
        onSubmit={(e) => handleConfirmEmail(e)}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={style.wrapper}
      >
        <div className="mb-5">
          <h1 className={style.title}>Enter your email</h1>
          <span className={style.span}>
            *so that in the future you can recover your credentials
          </span>
        </div>
        <Input
          {...emailInputData}
          onChange={(e) => {
            dispatch(handleChangeRegisterValues(e))
            setInputValue(e.target.value)
          }}
        />
        <Button
          type="submit"
          title="Send me confirmation code"
          loading={loading}
          className="mt-2 bg-prime-purple"
          disabled={isDisableButton}
        />
      </motion.form>
    </>
  )
}

const style = {
  arrowBack: `ri-arrow-left-line z-30 absolute top-5 left-5 text-3xl p-2 cursor-pointer`,
  wrapper: `flex flex-col items-start justify-center w-full md:min-w-[400px] xl:w-[550px] 2xl:w-[650px] max-h-fit h-screen z-10 px-6 sm:p-12 bg-fill-weak dark:bg-fill-strong`,
  title: `text-4xl font-semibold`,
  span: `text-sm text-dawn-weak dark:text-dusk-weak`,
}
