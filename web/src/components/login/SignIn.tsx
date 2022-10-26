import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { motion } from 'framer-motion'
import { error } from '../Toasters'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  login,
  loginByGoogleProvider,
  verifyEmailAddress,
} from '../../services/api-routes'
import { Toaster } from 'react-hot-toast'
import { User } from 'firebase/auth'
import { signInWithGoogle } from '../../services/validate-form'
import { useAppDispatch } from '../../store/hooks'
import { handleAuthSession } from '../../store'

interface Props {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignIn = ({ signIn, setSignIn }: Props) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({} as User)
  const [emailVerified, setEmailVerified] = useState(false)
  const [registerValues, setRegisterValues] = useState({
    username: '',
    password: '',
  })
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (handleValidation()) {
        const { username, password } = registerValues
        const { data } = await axios.post(login, {
          username,
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
    } catch (err) {
      error('Error, try to sign in with Google')
      console.log(err)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (user.metadata) {
        const email = user.email
        const { data } = await axios.post(verifyEmailAddress, {
          email,
        })
        data.status === false && error('Email does not exist, try sign up')
        if (data.status === true) {
          const username = data.user.username
          const id = data.user._id
          const { data: authData } = await axios.post(loginByGoogleProvider, {
            username,
            id,
          })
          if (authData.status === true) {
            sessionStorage.setItem('session', JSON.stringify(authData.session))
            navigate('/')
          }
        }
      }
    })()
  }, [user.metadata])

  const handleValidation = () => {
    const { username, password } = registerValues
    if (username === '') {
      error('Enter your username')
      return false
    } else if (password === '') {
      error('Enter a password')
      return false
    }
    return true
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValues({
      ...registerValues,
      [event.target.id]: event.target.value,
    })
  }

  console.log(registerValues)

  return (
    <motion.form
      onSubmit={(e) => handleSubmit(e)}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={style.wrapper}
    >
      <Toaster position="top-left" />
      <div className="relative w-full">
        <i className="ri-user-shared-line absolute text-2xl top-0 right-0" />
        <h1 className="text-4xl font-bold">Sign in</h1>
        <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
          <span className="text-dawn-weak dark:text-dusk-weak">New user?</span>
          <span
            onClick={() => setSignIn(!signIn)}
            className="text-prime-blue cursor-pointer p-1 hover:underline"
          >
            Create an account
          </span>
        </div>
        <div className="mt-2 mb-4">
          <label
            htmlFor="userId"
            className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
          >
            Username
          </label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            id="username"
            placeholder="Enter your username"
            className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="password"
            className="text-dusk-main dark:text-dawn-main text-sm w-full block font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => handleChange(e)}
            id="password"
            placeholder="•••••••••••••"
            className="w-full p-4 mt-4 bg-white dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
          />
        </div>
        <Button title="Continue" className="mt-2 bg-prime-purple" />
        <span className="text-dawn-weak dark:text-dusk-weak block my-4 font-medium">
          Or continue with
        </span>
      </div>
      <Button
        type="button"
        onClick={() => signInWithGoogle(setUser)}
        title="Google"
        className="bg-prime-blue"
      />
    </motion.form>
  )
}

const style = {
  wrapper: `flex flex-col items-center justify-center w-full md:min-w-[400px] xl:w-[550px] 2xl:w-[650px] max-h-fit h-screen relative z-10 p-12 bg-fill-weak dark:bg-fill-strong`,
}
