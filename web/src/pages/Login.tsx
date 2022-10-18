import React, { useState } from 'react'
import background from '../assets/background.jpg'
import { SignIn, SignUp } from '../components'
import { AnimatePresence } from 'framer-motion'

interface Props {}

export const Login = (props: Props) => {
  const [signIn, setSignIn] = useState(true)

  const switchForm = {
    signIn: signIn,
    setSignIn: setSignIn,
  }

  return (
    <div className={style.wrapper}>
      <section className="grid grid-cols-5 tem origin-center text-white relative">
        <span className="absolute bottom-1 left-1 text-primary-shade-100 z-10">
          Artist: The Magnetic Cat
        </span>
        <div className="col-span-3 relative h-screen flex flex-col justify-center items-center">
          <img
            src={background}
            alt="background/img"
            className="w-screen h-screen absolute inset-0 object-cover object-top"
          />
          <div className="z-10">Trending Mangas</div>
        </div>
        <div className="col-span-2 flex justify-center mx-auto items-center">
          <AnimatePresence>
            {signIn ? <SignIn {...switchForm} /> : <SignUp {...switchForm} />}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

const style = {
  wrapper: `w-screen relative h-screen overflow-hidden bg-[#242731]`,
}
