import React, { useState } from 'react'
import { Button } from '../Button'
import { motion } from 'framer-motion'

interface Props {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUp = ({ signIn, setSignIn }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [registerValues, setRegisterValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterValues({
      ...registerValues,
      [event.target.id]: event.target.value,
    })
  }

  console.log(registerValues)

  return (
    <motion.form
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={style.wrapper}
    >
      <div className="relative">
        <i className="ri-user-add-line absolute text-2xl top-0 right-0"></i>
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
              placeholder="First name"
              onChange={(e) => handleChange(e)}
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
              placeholder="Last name"
              onChange={(e) => handleChange(e)}
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
              placeholder="Choose a username"
              onChange={(e) => handleChange(e)}
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
                placeholder="•••••••••••••"
                onChange={(e) => handleChange(e)}
                className="w-full p-4 mt-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
              />
              {registerValues.password.trim() && (
                <>
                  {showPassword ? (
                    <i
                      onClick={() => setShowPassword(false)}
                      className="ri-eye-2-line text-lg cursor-pointer absolute right-5 top-[50%] translate-y-[-20%] p-1 text-dusk-main dark:text-dawn-main"
                    ></i>
                  ) : (
                    <i
                      onClick={() => setShowPassword(true)}
                      className="ri-eye-close-line text-lg cursor-pointer absolute right-5 top-[50%] translate-y-[-20%] p-1 text-dusk-main dark:text-dawn-main"
                    ></i>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button title="Continue" className="mt-2 bg-prime-purple" />
      <span className="text-dawn-weak dark:text-dusk-weak block my-4 font-medium">
        Sign up by Open ID
      </span>
      <Button title="Google" className="bg-prime-blue" />
    </motion.form>
  )
}

const style = {
  wrapper: `w-full md:min-w-[400px] xl:min-w-[550px] 2xl:min-w-[650px] relative max-h-fit z-10 p-12 bg-fill-weak dark:bg-fill-strong`,
}
