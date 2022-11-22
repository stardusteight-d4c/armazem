import axios from 'axios'
import { User } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerGoogleAccount } from '../../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Button } from '../../Button'
import { error } from '../../Toasters'
import { motion } from 'framer-motion'
import { Input } from './Input'
import { chooseUsernameInputData } from './input-data'
import { handleChangeRegisterValues } from '../../../store'

interface Props {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const ChooseUsername = ({ user, setUser }: Props) => {
  const navigate = useNavigate()
  const registerValues = useAppSelector((state) => state.armazem.registerValues)
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)

  const handleGoogleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (user.metadata) {
      const name = user.displayName
      const email = user.email
      const image = user.photoURL
      const username = registerValues.username
      const { data } = await axios.post(registerGoogleAccount, {
        name,
        username,
        email,
        image,
      })
      if (data.status === false) {
        error(data.msg)
      }
      if (data.status === true) {
        localStorage.setItem('session', JSON.stringify(data.session))
        navigate('/')
      }
    }
  }

  const isDisableButton =
    inputValue?.trim() === '' ||
    inputValue === undefined ||
    inputValue.length <= 3

  return (
    <>
      <i
        tabIndex={0}
        title="Back"
        onKeyDown={(e) => e.key === 'Enter' && setUser({} as User)}
        onClick={() => setUser({} as User)}
        className={style.arrowBack}
      />
      <motion.form
        onSubmit={(e) => handleGoogleSubmit(e)}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={style.wrapper}
      >
        <div className="mb-5">
          <h1 className={style.title}>Choose username</h1>
          <span className={style.span}>
            *Choose how you want to be called in the app
          </span>
        </div>
        <Input
          {...chooseUsernameInputData}
          onChange={(e) => {
            dispatch(handleChangeRegisterValues(e))
            setInputValue(e.target.value)
          }}
          maxLength={20}
        />
        <Button
          type="submit"
          title="Finish"
          disabled={isDisableButton}
          className="mt-2 bg-prime-purple"
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
