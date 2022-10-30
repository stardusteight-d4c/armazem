import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { error, success } from '../Toasters'
import { ConfirmEmail } from './ConfirmEmail'
import axios from 'axios'
import {
  emailConfirmation,
  register,
  registerGoogleAccount,
  validateSignUp,
  verifyEmailAddress,
} from '../../services/api-routes'
import bcryptjs from 'bcryptjs'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  clearRegisterValuesEntries,
  handleChangeRegisterValues,
} from '../../store'
import { useNavigate } from 'react-router-dom'

import { User } from 'firebase/auth'
import { ConfirmVerificationToken } from './ConfirmVerificationToken'
import {
  disableButton,
  handleValidation,
  signInWithGoogle,
} from '../../services/validate-form'

interface Props {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUp = ({ signIn, setSignIn }: Props) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState(undefined)
  const [userToken, setUserToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [proceedToConfirmEmail, setProceedToConfirmEmail] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [emailAvailable, setEmailAvailable] = useState(false)
  const [user, setUser] = useState<User>({} as User)
  const dispatch = useAppDispatch()
  const registerValues = useAppSelector((state) => state.armazem.registerValues)

  const handleConfirmEmail = async (event: React.FormEvent) => {
    event.preventDefault()
    if (handleValidation(registerValues, setProceedToConfirmEmail)) {
      setLoading(true)
      const { email, firstName, lastName } = registerValues
      const name = firstName + ' ' + lastName
      const { data } = await axios.post(emailConfirmation, {
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

  const verifyUsername = async (username: string) => {
    try {
      const { data } = await axios.post(validateSignUp, {
        username,
      })
      if (data.status === false) {
        error(data.msg)
        setUsernameAvailable(false)
      } else {
        success(data.msg)
        setUsernameAvailable(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const emailConfirmed = await verifyToken(userToken)
    if (
      handleValidation(registerValues, setProceedToConfirmEmail) &&
      emailConfirmed
    ) {
      setLoading(true)
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
        sessionStorage.setItem('session', JSON.stringify(data.session))
        navigate('/')
      }
    }
  }

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
        sessionStorage.setItem('session', JSON.stringify(data.session))
        navigate('/')
      }
    }
  }

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

  const confirmEmailProps = {
    handleConfirmEmail,
    loading,
    setProceedToConfirmEmail,
  }

  const verifyTokenProps = {
    handleSubmit,
    setUserToken,
    verifyToken,
    userToken,
  }

  const emailVerification = () => {
    if (proceedToConfirmEmail && !token)
      return <ConfirmEmail {...confirmEmailProps} />
    if (proceedToConfirmEmail && token)
      return <ConfirmVerificationToken data={verifyTokenProps} />
    if (!proceedToConfirmEmail) return false
  }

  return (
    <AnimatePresence>
      {user.metadata && emailAvailable ? (
        <motion.form
          onSubmit={(e) => handleGoogleSubmit(e)}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className="mx-auto max-w-md"
        >
          <i
            onClick={() => setUser({} as User)}
            className="ri-arrow-left-line absolute top-5 left-5 text-3xl p-2 cursor-pointer"
          />
          <h1 className="text-4xl font-semibold">Choose username</h1>
          <span className="text-sm text-dawn-weak dark:text-dusk-weak">
            *Choose how you want to be called in the app
          </span>
          <div className="my-4">
            <label
              htmlFor="username"
              className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              placeholder="Choose a username"
              onChange={(e) => dispatch(handleChangeRegisterValues(e))}
              className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
            />
          </div>
          <Button
            type="submit"
            title="Finish"
            className="mt-2 bg-prime-purple"
          />
        </motion.form>
      ) : (
        <>
          {proceedToConfirmEmail ? (
            emailVerification()
          ) : (
            <motion.form
              onSubmit={(e) => handleSubmit(e)}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              className={style.wrapper}
            >
              <div className="relative">
                <i className="ri-user-add-line absolute text-2xl top-0 right-0" />
                <h1 className="text-4xl font-semibold">Sign up</h1>
                <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
                  <span className="text-dawn-weak dark:text-dusk-weak">
                    Already a user?
                  </span>
                  <span
                    onClick={() => (
                      setSignIn(!signIn), dispatch(clearRegisterValuesEntries())
                    )}
                    className="text-prime-blue cursor-pointer p-1 hover:underline"
                  >
                    Login now
                  </span>
                </div>
                <div className="flex gap-3 justify-between mt-2 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      placeholder="First name"
                      onChange={(e) => dispatch(handleChangeRegisterValues(e))}
                      className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      placeholder="Last name"
                      onChange={(e) => dispatch(handleChangeRegisterValues(e))}
                      className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
                    />
                  </div>
                </div>
                <div className="sm:block md:flex 2xl:block gap-3 justify-between my-4">
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      required
                      onBlur={() => verifyUsername(registerValues.username)}
                      placeholder="Choose a username"
                      onChange={(e) => dispatch(handleChangeRegisterValues(e))}
                      className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        required
                        placeholder="•••••••••••••"
                        onChange={(e) =>
                          dispatch(handleChangeRegisterValues(e))
                        }
                        className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
                      />
                      {registerValues.password.trim() && (
                        <>
                          {showPassword ? (
                            <i
                              onClick={() => setShowPassword(false)}
                              className="ri-eye-2-line text-lg cursor-pointer absolute right-5 top-[50%] translate-y-[-20%] p-1 text-dusk-main dark:text-dawn-main"
                            />
                          ) : (
                            <i
                              onClick={() => setShowPassword(true)}
                              className="ri-eye-close-line text-lg cursor-pointer absolute right-5 top-[50%] translate-y-[-20%] p-1 text-dusk-main dark:text-dawn-main"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                title="Continue"
                className="mt-2 bg-prime-purple"
                disabled={disableButton(registerValues) || !usernameAvailable}
              />
              <span className="text-dawn-weak mr-auto dark:text-dusk-weak block my-4 font-medium">
                Sign up by Open ID
              </span>
              <Button
                type="button"
                title="Google"
                className="bg-prime-blue"
                onClick={() => signInWithGoogle(setUser)}
              />
            </motion.form>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

const style = {
  wrapper: `flex flex-col items-center justify-center w-full md:min-w-[400px] xl:w-[550px] 2xl:w-[650px] max-h-fit h-screen relative z-10 p-12 bg-fill-weak dark:bg-fill-strong`,
}
