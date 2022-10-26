import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { Button } from '../Button'

interface Props {}

export const Comments = (props: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Comments
      </h2>
      <div>
        <div className="flex items-start gap-x-5">
          <img
            src={currentUser?.user_img}
            alt=""
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="flex flex-col w-full">
            <span className="font-medium text-2xl text-dusk-main dark:text-dawn-main">
              {currentUser?.name}
            </span>
            <textarea
              placeholder="Type your comment"
              className="w-full max-h-[180px] placeholder:text-lg placeholder:text-fill-strong/50 dark:placeholder:text-fill-weak/50 bg-transparent min-h-[80px] focus:border-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20 p-2 outline-none"
            />
          </div>
        </div>
        <div className=" flex justify-end ">
          <Button
            title="Submit"
            className="bg-prime-blue my-5 !w-fit px-4 py-2"
          />
        </div>
        <div className="flex border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            alt=""
            className="w-9 h-9 rounded-md object-cover"
          />
          <div className="flex flex-col w-full ">
            <span className="-mt-5 ml-auto">5 hours ago</span>
            <span className="font-medium -mt-[10px] text-lg text-dusk-main dark:text-dawn-main">
              Gabriel Sena
            </span>
            <span className="text-dusk-main/90 dark:text-dawn-main/90">
              I like this man so much but holy damn he's basically on the
              punching bag. They need to introduce a new strong pirate? Great,
              send in smoker to catch some fists with his face!
            </span>
          </div>
        </div>
        <div className="flex border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            alt=""
            className="w-9 h-9 rounded-md object-cover"
          />
          <div className="flex flex-col w-full ">
            <span className="-mt-5 ml-auto">5 hours ago</span>
            <span className="font-medium -mt-[10px] text-lg text-dusk-main dark:text-dawn-main">
              Gabriel Sena
            </span>
            <span className="text-dusk-main/90 dark:text-dawn-main/90">
              I like this man so much but holy damn he's basically on the
              punching bag. They need to introduce a new strong pirate? Great,
              send in smoker to catch some fists with his face!
            </span>
          </div>
        </div>
        <div className="flex border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            alt=""
            className="w-9 h-9 rounded-md object-cover"
          />
          <div className="flex flex-col w-full ">
            <span className="-mt-5 ml-auto">5 hours ago</span>
            <span className="font-medium -mt-[10px] text-lg text-dusk-main dark:text-dawn-main">
              Gabriel Sena
            </span>
            <span className="text-dusk-main/90 dark:text-dawn-main/90">
              I like this man so much but holy damn he's basically on the
              punching bag. They need to introduce a new strong pirate? Great,
              send in smoker to catch some fists with his face!
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
