import React from 'react'
import { Button } from '../Button'
import { motion } from 'framer-motion'

interface Props {
  signIn: boolean
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUp = ({ signIn, setSignIn }: Props) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className={style.wrapper}
    >
      <div className="relative">
        <i className="ri-user-add-line absolute text-2xl top-0 right-0"></i>
        <h1 className="text-4xl font-semibold">Sign up</h1>
        <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
          <span className="text-dark-gray-matte-YA">Already a user?</span>
          <span
            onClick={() => setSignIn(!signIn)}
            className="text-secondary-shade-400 cursor-pointer p-1 hover:underline"
          >
            Login now
          </span>
        </div>
        <div className="flex gap-3 justify-between mt-2 mb-4">
          <div>
            <label
              htmlFor="firstName"
              className="text-dark-gray-matte-YA text-sm w-full block font-semibold"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="text-dark-gray-matte-YA text-sm w-full block font-semibold"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
            />
          </div>
        </div>
        <div className="flex 2xl:block gap-3 justify-between my-4">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="text-dark-gray-matte-YA text-sm w-full block font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[2px] focus:ring-secondary-main rounded-lg"
            />
          </div>

          <div className="mb-4">
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
        </div>
      </div>
      <Button
        title="Continue"
        className="mt-2 bg-[#4D3BC9] hover:bg-[#5b4bbe]"
      />
      <span className="text-dark-gray-matte-YA block my-4 font-medium">
        Sign up by Open ID
      </span>
      <Button title="Google" className="bg-[#4b8ef3] hover:bg-[#5f98ee]" />
    </motion.form>
  )
}

const style = {
  wrapper: `w-full min-w-[550px] 2xl:min-w-[700px] relative max-h-fit z-10 p-12 bg-[#242731]`,
}
