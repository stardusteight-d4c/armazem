import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { error, success } from '../Toasters'
import { ConfirmEmail } from './ConfirmEmail'
import axios from 'axios'
import {
  emailConfirmation,
  registerRoute,
  validateSignUp,
} from '../../utils/api-routes'
import bcryptjs from 'bcryptjs'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { handleChangeRegisterValues } from '../../store'
import { useNavigate } from 'react-router-dom'

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
  const dispatch = useAppDispatch()
  const registerValues = useAppSelector(
    (state) => state.anistorage.registerValues
  )

  // AO CLICAR EM 'CONTINUE', TROCAR O COMPONENTE E SOLICITAR A INSERSÃO DO EMAIL PARA RECUPERAÇÃO DE SENHA
  // ADICIONAR O EMAIL EM 'REGISTERVALUES' E ENVIAR O EMAIL PARA ROTA DE REGISTRO,
  // ENVIAR E UM EMAIL COM UMA STRING ALEÁTORIA E ENVIAR TAL STRING PARA O BANCO DE DADOS
  // POSTERIORMENTE SOLICITAR A INSERÇÃO DA STRING E NO INPUT AO CLICAR EM 'ENVIAR' COMPARAR AMBAS STRINGS
  // EXIBIR MENSAGEM DE EMAIL CONFIRMADO E INSERIR OS DADOS NO BANCO DE DADOS, ISTO NO COMPONENTE DE SIGNUP

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  const handleConfirmEmail = async (event: React.FormEvent) => {
    event.preventDefault()
    if (handleValidation()) {
      setLoading(true)
      // console.log('in validation', confirmEmail)
      const { email, firstName, lastName } = registerValues
      const name = firstName + ' ' + lastName
      const { data } = await axios.post(emailConfirmation, {
        name,
        email,
      })
      console.log(data)
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

  const handleValidation = () => {
    const { firstName, lastName, username, password, email } = registerValues
    if (firstName.length < 2) {
      error('First name must contain at least 2 characters')
      return false
    } else if (lastName.length < 2) {
      error('Last name must contain at least 2 characters')
      return false
    } else if (username.length <= 3) {
      error('Username must contain more than 3 characters')
      return false
    } else if (password.length < 8) {
      error('Password must contain at least 8 characters')
      return false
    } else if (email !== '<empty>' && !validateEmail(email)) {
      error('Enter a valid email address')
      return false
    }
    setProceedToConfirmEmail(true)
    return true
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
    console.log('call handlesubmit');
    
    if (handleValidation() && emailConfirmed) {
      setLoading(true)
      console.log('Registering user', registerRoute)
      const { firstName, lastName, username, email, password } = registerValues
      const name = firstName + ' ' + lastName
      const { data } = await axios.post(registerRoute, {
        name,
        username,
        email,
        password,
      })
      console.log(data)
      if (data.status === false) {
        error(data.msg)
      }
      if (data.status === true) {
        localStorage.setItem('session', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const disableButton = () => {
    const booleanValues = []
    for (const [key, value] of Object.entries(registerValues)) {
      booleanValues.push(value.trim() == '')
    }
    const emptyInput = booleanValues.includes(true)
    return emptyInput
  }

  console.log(registerValues)

  const confirmEmail = {
    handleSubmit: handleSubmit,
    disableButton: disableButton,
    handleConfirmEmail: handleConfirmEmail,
    loading: loading,
    setProceedToConfirmEmail: setProceedToConfirmEmail,
  }

  return (
    <AnimatePresence>
      {proceedToConfirmEmail ? (
        <>
          {token ? (
            <motion.form
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => handleSubmit(e)}
              className=" bg-fill-weak dark:bg-fill-strong w-[30vw]"
            >
              <Toaster position="top-left" />
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
                type='submit'
                onClick={() => verifyToken(userToken)}
                title="Confirm email"
                className="mt-2 bg-prime-purple"
              />
            </motion.form>
          ) : (
            <ConfirmEmail {...confirmEmail} />
          )}
        </>
      ) : (
        <motion.form
          onSubmit={(e) => handleSubmit(e)}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className={style.wrapper}
        >
          <Toaster position="top-left" />
          <div className="relative">
            <i className="ri-user-add-line absolute text-2xl top-0 right-0" />
            <h1 className="text-4xl font-semibold">Sign up</h1>
            <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
              <span className="text-dawn-weak dark:text-dusk-weak">
                Already a user?
              </span>
              <span
                onClick={() => setSignIn(!signIn)}
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
                  className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
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
                  className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
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
                  className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
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
                    onChange={(e) => dispatch(handleChangeRegisterValues(e))}
                    className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
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
            // type="submit"
            title="Continue"
            className="mt-2 bg-prime-purple"
            disabled={disableButton() && usernameAvailable}
          />
          <span className="text-dawn-weak dark:text-dusk-weak block my-4 font-medium">
            Sign up by Open ID
          </span>
          <Button title="Google" className="bg-prime-blue" />
        </motion.form>
      )}
    </AnimatePresence>
  )
}

const style = {
  wrapper: `md:min-w-[400px] relative max-h-fit z-10 p-12 bg-fill-weak dark:bg-fill-strong`,
}
