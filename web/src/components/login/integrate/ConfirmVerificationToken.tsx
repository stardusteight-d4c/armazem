import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../Button'
import bcryptjs from 'bcryptjs'
import { error, success } from '../../Toasters'
import axios from 'axios'
import { register } from '../../../services/api-routes'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { Input } from './Input'
import { tokenInputData } from './input-data'

interface Props {
  token: string | undefined
  setToken: React.Dispatch<React.SetStateAction<undefined>>
}

export const ConfirmVerificationToken = ({ data }: { data: Props }) => {
  const { token, setToken } = data
  const [userToken, setUserToken] = useState('')
  const navigate = useNavigate()
  const registerValues = useAppSelector((state) => state.armazem.registerValues)

  const verifyToken = async (userToken: string) => {
    if (token) {
      const isTokenValid = bcryptjs.compareSync(userToken, token)
      if (!isTokenValid) {
        error('Token is invalid')
        return false
      } else {
        success('Email successfully confirmed')
        return true
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const emailConfirmed = await verifyToken(userToken)
    if (emailConfirmed) {
      const { firstName, lastName, username, email, password } = registerValues
      const name = firstName + ' ' + lastName
      const { data } = await axios.post(register, {
        name,
        username,
        email,
        password,
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

  return (
    <>
      <i
        tabIndex={0}
        title="Back"
        onKeyDown={(e) => e.key === 'Enter' && setToken(undefined)}
        onClick={() => setToken(undefined)}
        className={style.arrowBack}
      />
      <motion.form
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        onSubmit={(e) => handleSubmit(e)}
        className={style.wrapper}
      >
        <Input
          {...tokenInputData}
          onChange={(e) => setUserToken(e.target.value)}
        />
        <Button
          type="submit"
          title="Confirm email"
          className="mt-2 bg-prime-purple"
        />
      </motion.form>
    </>
  )
}

const style = {
  arrowBack: `ri-arrow-left-line z-30 absolute top-5 left-5 text-3xl p-2 cursor-pointer`,
  wrapper: `flex flex-col items-start justify-center w-full md:min-w-[400px] xl:w-[550px] 2xl:w-[650px] max-h-fit h-screen z-10 px-6 sm:p-12 bg-fill-weak dark:bg-fill-strong`,
}
