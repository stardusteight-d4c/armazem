import React from 'react'
import { Button } from '../Button'
import { motion } from 'framer-motion'

interface Props {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignIn = ({ signIn, setSignIn }: Props) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={style.wrapper}
    >
      <div className="relative">
        <i className="ri-user-shared-line absolute text-2xl top-0 right-0"></i>
        <h1 className="text-4xl font-bold">Sign in</h1>
        <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
          <span className="text-[#3e3e3e] dark:text-[#a7a7a7]">New user?</span>
          <span
            onClick={() => setSignIn(!signIn)}
            className="text-secondary-shade-400 cursor-pointer p-1 hover:underline"
          >
            Create an account
          </span>
        </div>
        <div className="mt-2 mb-4">
          <label
            htmlFor="userId"
            className="text-[#3e3e3e] dark:text-[#a7a7a7] text-sm w-full block font-semibold"
          >
            Username or email
          </label>
          <input
            type="text"
            id="userId"
            placeholder="Enter your username or email"
            className="w-full p-4 mt-4 bg-[#f0f0f0] dark:bg-[#2d3039] text-sm placeholder:text-[#a7a7a7] outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="password"
            className="text-[#3e3e3e] dark:text-[#a7a7a7] text-sm w-full block font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="•••••••••••••"
            className="w-full p-4 mt-4 bg-[#f0f0f0] dark:bg-[#2d3039] text-sm placeholder:text-[#a7a7a7] outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
          />
        </div>
        <Button
          title="Continue"
          className="mt-2 bg-[#4D3BC9]"
        />
        <span className="text-[#3e3e3e] dark:text-[#a7a7a7] block my-4 font-medium">
          Or continue with
        </span>
        <Button title="Google" className="bg-[#4b8ef3]" />
      </div>
    </motion.form>
  )
}

const style = {
  wrapper: `w-full md:min-w-[400px] xl:min-w-[550px] 2xl:min-w-[650px] relative max-h-fit z-10 p-12 bg-white dark:bg-[#242731]`,
}
