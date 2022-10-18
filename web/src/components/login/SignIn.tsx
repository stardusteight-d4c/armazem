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
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={style.wrapper}
    >
      <div className="relative">
        <i className="ri-user-shared-line absolute text-2xl top-0 right-0"></i>
        <h1 className="text-4xl font-bold">Sign in</h1>
        <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
          <span className="text-dark-gray-matte-YA">New user?</span>
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
            className="text-dark-gray-matte-YA text-sm w-full block font-semibold"
          >
            Username or email
          </label>
          <input
            type="text"
            id="userId"
            placeholder="Enter your username or email"
            className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="password"
            className="text-dark-gray-matte-YA text-sm w-full block font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="•••••••••••••"
            className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
          />
        </div>
        <Button
          title="Continue"
          className="mt-2 bg-[#4D3BC9] hover:bg-[#5b4bbe]"
        />
        <span className="text-dark-gray-matte-YA block my-4 font-medium">
          Or continue with
        </span>
        <Button title="Google" className="bg-[#4b8ef3] hover:bg-[#5f98ee]" />
      </div>
    </motion.form>
  )
}

const style = {
  wrapper: `w-full min-w-[550px] 2xl:min-w-[700px] relative max-h-fit z-10 p-12 bg-[#242731]`,
}
