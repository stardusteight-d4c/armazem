import React, { useState } from 'react'
import background from '../assets/background.jpg'
import { SignIn, SignUp } from '../components'
import { AnimatePresence } from 'framer-motion'
import { Card } from '../components/login/Card'
import { SwitchTheme } from '../components/SwitchTheme'
import { trending } from '../../mockData'

interface Props {}

export const Login = (props: Props) => {
  const [signIn, setSignIn] = useState(true)

  const switchForm = {
    signIn: signIn,
    setSignIn: setSignIn,
  }

  return (
    <div className={style.wrapper}>
      <div className="absolute bottom-4 z-30 left-[50%] translate-x-[-50%]">
        <SwitchTheme />
      </div>
      <section className="sm:grid grid-cols-2 xl:grid-cols-5 tem origin-center text-dusk-main dark:text-dawn-main relative">
        <div className="col-span-1 hidden xl:col-span-3 relative h-screen sm:flex pl-5 flex-col justify-center items-start">
          <img
            src={background}
            alt="background/img"
            className="w-screen h-screen absolute inset-0 object-cover object-top opacity-90"
          />
          <div className="z-10 bg-fill-weak dark:bg-fill-strong p-5 hidden xl:block">
            <h2 className="text-lg font-bold pb-4 text-dusk-main dark:text-dawn-main">
              Popular on the platform
            </h2>
            <div className="flex flex-col gap-5">
              {trending.map((item, index) => (
                <Card {...item} key={index} />
              ))}
            </div>
            <div className="flex justify-start gap-2 text-dusk-main dark:text-dawn-main items-center pt-4 cursor-pointer text-lg">
              <i className="ri-add-box-line " />
              <span>Discover more</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-full relative xl:col-span-2 flex justify-center mx-auto items-center">
          <AnimatePresence>
            {signIn ? <SignIn {...switchForm} /> : <SignUp {...switchForm} />}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

const style = {
  wrapper: `w-screen relative min-h-screen overflow-x-hidden bg-fill-weak dark:bg-fill-strong`,
}
