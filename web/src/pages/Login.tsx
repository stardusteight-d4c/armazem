import React, { useState } from 'react'
import background from '../assets/background.jpg'
import { SignIn, SignUp } from '../components'
import { AnimatePresence } from 'framer-motion'
import { Card } from '../components/login/Card'
import { SwitchTheme } from '../components/SwitchTheme'

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
      <section className="sm:grid grid-cols-2 xl:grid-cols-5 tem origin-center text-[#3e3e3e] dark:text-[#E1E1E6] relative">
        <span className="absolute hidden sm:block bottom-1 left-1 text-sm text-primary-shade-100 z-10">
          Artist: The Magnetic Cat
        </span>
        <div className="col-span-1 hidden xl:col-span-3 relative h-screen sm:flex pl-5 flex-col justify-center items-start">
          <img
            src={background}
            alt="background/img"
            className="w-screen h-screen absolute inset-0 object-cover object-top opacity-90"
          />
          <div className="z-10 bg-white dark:bg-[#242731] p-5 hidden xl:block">
            <h2 className="text-lg font-bold pb-4 text-[#3e3e3e] dark:text-[#E1E1E6]">
              Popular on the platform
            </h2>
            <div className="flex flex-col gap-5">
              <Card
                img="https://img1.ak.crunchyroll.com/i/spire2/01dd5ce25dd59133d9060559655af3681655213731_main.png"
                title="Dragon Ball Super: Super Hero"
                tags="Action, Adventure"
              />
              <Card
                img="https://jovemnerd.com.br/wp-content/uploads/2022/09/one_piece_red_cartaz_brasileiro__2m0rwei0-760x1117.jpg"
                title="One Piece Film Red"
                tags="Action, Adventure"
              />
              <Card
                img="https://pop.proddigital.com.br/wp-content/uploads/sites/8/2022/07/chainsaw-man-poster-683x1024.png"
                title="Chainsaw Man"
                tags="Action, Dark Fantasy"
              />
            </div>
            <div className="flex justify-start gap-2 text-[#3e3e3e] dark:text-[#E1E1E6] items-center pt-4 cursor-pointer text-lg">
              <i className="ri-add-box-line " />
              <span>Discover more</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:col-span-2 flex justify-center mx-auto items-center">
          <AnimatePresence>
            {signIn ? <SignIn {...switchForm} /> : <SignUp {...switchForm} />}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

const style = {
  wrapper: `w-screen relative min-h-screen overflow-x-hidden bg-white dark:bg-[#242731]`,
}
