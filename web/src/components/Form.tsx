import React, { useState } from 'react'
import { Button } from './Button'

interface Props {}

export const Form = (props: Props) => {
  const [signUp, setSignUp] = useState(false)

  return (
    <form className={style.wrapper}>
      <div>
        <i
          className={`${
            signUp ? 'ri-user-add-line' : 'ri-user-shared-line'
          } absolute text-2xl top-8 right-10`}
        ></i>
        <h1 className="text-4xl font-semibold">
          {signUp ? 'Sign Up' : 'Sign in'}
        </h1>
        <div className="flex items-center space-x-4 font-medium text-sm pt-5 pb-4">
          <span className="text-dark-gray-matte-YA">
            {signUp ? 'Already a user' : 'New user?'}
          </span>
          <span
            onClick={() => setSignUp(!signUp)}
            className="text-secondary-shade-400 cursor-pointer p-1 hover:underline"
          >
            {signUp ? 'Login now' : 'Create an account'}
          </span>
        </div>
        <div className="my-4">
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
            className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[1px] focus:ring-secondary-main rounded-lg"
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
            className="w-full p-4 mt-4 bg-[#2d3039] text-sm placeholder:text-dark-gray-matte-YA outline-none focus:ring-[1px] focus:ring-secondary-main rounded-lg"
          />
        </div>
      </div>
      <Button title="Continue" className="mt-2 bg-[#4D3BC9]" />
      <span className="text-dark-gray-matte-YA block my-4 font-medium">
        Or continue with
      </span>
      <Button title="Google" className="bg-[#4b8ef3]" />
    </form>
  )
}

const style = {
  wrapper: `w-[405px] relative h-[585px] 2xl:w-[465px] 2xl:h-[645px] z-10 p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-[#242731] rounded-[8%]`,
}
