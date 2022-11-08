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
import { User } from 'firebase/auth'
import { signInWithGoogle } from './integrate/validate-form'
import { inputSignInData } from './integrate/input-data'
import { Input } from './integrate/Input'

interface Props {
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignIn = ({ setSignIn }: Props) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({} as User)
  const [registerValues, setRegisterValues] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    ;(async () => {
      if (user.metadata) {
        const email = user.email
        const { data } = await axios.post(verifyEmailAddress, {
          email,
        })
        data.status === false && error('Email does not exist, try sign up')
        if (data.status === true) {
          const email = data.user.email
          const id = data.user._id
          const { data: authData } = await axios.post(loginByGoogleProvider, {
            email,
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
      console.error(err)
    }
  }

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

  return (
    <motion.form
      onSubmit={(e) => handleSubmit(e)}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={style.wrapper}
    >
      <div className={style.formContainer}>
        <i className={style.enterUserIcon} />
        <h1 className={style.signIn}>Sign in</h1>
        <div className={style.newUserContainer}>
          <span className={style.span}>New user?</span>
          <span
            tabIndex={0}
            title="Create an account"
            onKeyDown={(e) => e.key === 'Enter' && setSignIn(false)}
            onClick={() => setSignIn(false)}
            className={style.link}
          >
            Create an account
          </span>
        </div>
        <div className={style.flexContainer}>
          {inputSignInData.map((input) => (
            <Input {...input} onChange={(e) => handleChange(e)} />
          ))}
        </div>
        <Button
          type="submit"
          title="Continue"
          className="mt-2 bg-prime-purple"
        />
        <span className={style.alternativeSignIn}>Or continue with</span>
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
  formContainer: `relative w-full`,
  enterUserIcon: `ri-user-shared-line absolute text-2xl top-0 right-0`,
  signIn: `text-4xl font-bold`,
  newUserContainer: `flex items-center space-x-4 font-medium text-sm pt-5 pb-4`,
  span: `text-dawn-weak dark:text-dusk-weak`,
  link: `text-prime-blue cursor-pointer p-1 hover:underline`,
  flexContainer: `flex flex-col gap-3 mt-2 mb-4`,
  alternativeSignIn: `text-dawn-weak dark:text-dusk-weak block my-4 font-medium`,
}
