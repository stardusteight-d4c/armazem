import axios from 'axios'
import { User } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerGoogleAccount } from '../../../services/api-routes'
import { useAppSelector } from '../../../store/hooks'
import { Button } from '../../Button'
import { error } from '../../Toasters'
import { motion } from 'framer-motion'

interface Props {}

export const ChooseUsername = (props: Props) => {
  const [user, setUser] = useState<User>({} as User)
  const navigate = useNavigate()
  const registerValues = useAppSelector((state) => state.armazem.registerValues)

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

  return (
    <motion.form
          onSubmit={(e) => handleGoogleSubmit(e)}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className="mx-auto max-w-md"
        >
          <i
            // onClick={() => setUser(undefined!)}
            className="ri-arrow-left-line absolute top-5 left-5 text-3xl p-2 cursor-pointer"
          />
          <h1 className="text-4xl font-semibold">Choose username</h1>
          <span className="text-sm text-dawn-weak dark:text-dusk-weak">
            *Choose how you want to be called in the app
          </span>
          <div className="my-4">
            {/* <label htmlFor="username" className={style.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              placeholder="Choose a username"
              onChange={(e) => dispatch(handleChangeRegisterValues(e))}
              className={style.input}
            /> */}
          </div>
          <Button
            type="submit"
            title="Finish"
            className="mt-2 bg-prime-purple"
          />
        </motion.form>
  )
}