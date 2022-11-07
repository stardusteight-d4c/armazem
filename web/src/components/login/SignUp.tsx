import React, { useEffect, useState } from 'react'
import { User } from 'firebase/auth'

import {
  handleUsernameValidation,
  handleValidation,
  signInWithGoogle,
} from './integrate/validate-form'
import { inputData } from './integrate/input-data'
import { Input } from './integrate/Input'
import { ConfirmVerificationToken } from './integrate/ConfirmVerificationToken'
import { ConfirmEmail } from './integrate/ConfirmEmail'
import { ChooseUsername } from './integrate/ChooseUsername'
import { Button } from '../Button'
import { error } from '../Toasters'
import { AnimatePresence, motion } from 'framer-motion'

import axios from 'axios'
import { verifyEmailAddress } from '../../services/api-routes'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  clearRegisterValuesEntries,
  handleChangeRegisterValues,
} from '../../store'

interface Props {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUp = ({ signIn, setSignIn }: Props) => {
  const [token, setToken] = useState(undefined)
  const [proceedToConfirmEmail, setProceedToConfirmEmail] = useState(false)
  const [emailAvailable, setEmailAvailable] = useState(false)
  const [user, setUser] = useState<User>({} as User)
  const dispatch = useAppDispatch()
  const registerValues = useAppSelector((state) => state.armazem.registerValues)

  useEffect(() => {
    ;(async () => {
      if (user.metadata) {
        const email = user.email
        const { data } = await axios.post(verifyEmailAddress, {
          email,
        })
        if (data.status === true) {
          error(data.msg)
          setEmailAvailable(false)
        }
        if (data.status === false) {
          setEmailAvailable(true)
          return true
        }
      }
    })()
  }, [user.metadata])

  const handleSubmit = async (event: React.FormEvent) => {
    event.stopPropagation()
    event.preventDefault()
    if (await handleUsernameValidation(registerValues)) {
      handleValidation(registerValues, setProceedToConfirmEmail)
    }
  }

  const confirmEmailProps = {
    setToken,
    setProceedToConfirmEmail,
  }

  const verifyTokenProps = {
    setToken,
    token,
  }

  const emailVerification = () => {
    if (proceedToConfirmEmail && !token)
      return <ConfirmEmail {...confirmEmailProps} />
    if (proceedToConfirmEmail && token)
      return <ConfirmVerificationToken data={verifyTokenProps} />
    if (!proceedToConfirmEmail) return false
  }

  if (user.metadata && emailAvailable) {
    return <ChooseUsername />
  }

  if (proceedToConfirmEmail) {
    return <>{emailVerification()}</>
  }

  return (
    <AnimatePresence>
      <motion.form
        onSubmit={(e) => handleSubmit(e)}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={style.wrapper}
      >
        <div className={style.formContainer}>
          <i className={style.addUserIcon} />
          <h1 className={style.signUp}>Sign up</h1>
          <div className={style.alreadyUserContainer}>
            <span className={style.span}>Already a user?</span>
            <span
              onClick={() => (
                dispatch(clearRegisterValuesEntries()), setSignIn(!signIn)
              )}
              className={style.link}
            >
              Login now
            </span>
          </div>
          <div className={style.gridContainer}>
            {inputData.map((input, index) => (
              <Input
                key={index}
                {...input}
                onChange={(e) => dispatch(handleChangeRegisterValues(e))}
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          title="Continue"
          className="mt-2 bg-prime-purple"
        />
        <span className={style.optionalSignUp}>Sign up by Open ID</span>
        <Button
          type="button"
          title="Google"
          className="bg-prime-blue"
          onClick={() => signInWithGoogle(setUser)}
        />
      </motion.form>
    </AnimatePresence>
  )
}

const style = {
  wrapper: `flex flex-col items-center justify-center w-full md:min-w-[400px] xl:w-[550px] 2xl:w-[650px] max-h-fit h-screen relative z-10 p-12 bg-fill-weak dark:bg-fill-strong`,
  formContainer: `relative w-full`,
  addUserIcon: `ri-user-add-line absolute text-2xl top-0 right-0`,
  signUp: `text-4xl font-semibold`,
  alreadyUserContainer: `flex items-center space-x-4 font-medium text-sm pt-5 pb-4`,
  span: `text-dawn-weak dark:text-dusk-weak`,
  link: `text-prime-blue cursor-pointer p-1 hover:underline`,
  gridContainer: `grid grid-cols-2 gap-3 justify-between mt-2 mb-4`,
  optionalSignUp: `text-dawn-weak mr-auto dark:text-dusk-weak block my-4 font-medium`,
}
