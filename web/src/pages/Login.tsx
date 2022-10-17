import React from 'react'
import background from '../assets/background.svg'
import { Form } from '../components/Form'

interface Props {}

export const Login = (props: Props) => {

  return (
    <div className={style.wrapper}>
      <img
        src={background}
        alt="background/img"
        className="w-screen h-screen absolute inset-0 object-cover"
      />
      <section className="grid grid-cols-2 origin-center text-white ">
        <div className="col-span-1 w-[50vw] z-10 h-screen flex flex-col justify-center items-center">
          <h1 className="text-7xl font-inter font-semibold">ANiStorage</h1>
        </div>
        <div className="col-span-1 w-[50vw] h-screen flex items-center">
          <Form />
        </div>
      </section>
    </div>
  )
}

const style = {
  wrapper: `w-screen relative h-screen overflow-hidden bg-[#111111]`,
}
