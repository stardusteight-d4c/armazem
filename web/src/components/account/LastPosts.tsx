import React from 'react'
import { Button } from '../Button'

interface Props {}

export const LastPosts = (props: Props) => {
  return (
    <section>
      <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
        Last posts
      </h2>
      <div className="flex gap-5">
        <div className="flex flex-col gap-y-5 max-w-[50%]">
          <article className="transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110 w-full cursor-pointer h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://avatars.githubusercontent.com/u/87643260?v=4"
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                  Gabriel Sena
                </span>
              </div>
              <span>3 hours ago</span>
            </div>
            <div>
              <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
                Man, I wish smoker was not treated like an "Example dummy".
              </h2>
            </div>
            <p>
              I like this man so much but holy damn he's basically on the Great,
              send in smoker to catch some fists with his face...
            </p>
            <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
            <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
              <div className="flex items-center gap-x-5">
                <div className="flex items-center cursor-pointer">
                  <i className="ri-heart-3-line p-1 text-xl" />
                  <span className="text-xl">25 Likes</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <i className="ri-discuss-line p-1 text-xl" />
                  <span className="text-xl">Discuss</span>
                </div>
              </div>
              <div className="flex items-center cursor-pointer">
                <i className="ri-share-box-line p-1 text-xl" />
                <span className="text-xl">Share</span>
              </div>
            </div>
          </article>
          <article className="transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110 w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://avatars.githubusercontent.com/u/87643260?v=4"
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                  Gabriel Sena
                </span>
              </div>
              <span>3 hours ago</span>
            </div>
            <div>
              <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
                Man, I wish smoker was not treated like an "Example dummy".
              </h2>
            </div>
            <p>
              I like this man so much but holy damn he's basically on the show
              just to be used as a punching bag. They need to introduce a new
              strong pirate? Great, send in smoker to catch some fists with his
              face. I like this man so much but holy damn he's...
            </p>
            <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
            <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
              <div className="flex items-center gap-x-5">
                <div className="flex items-center cursor-pointer">
                  <i className="ri-heart-3-line p-1 text-xl" />
                  <span className="text-xl">25 Likes</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <i className="ri-discuss-line p-1 text-xl" />
                  <span className="text-xl">Discuss</span>
                </div>
              </div>
              <div className="flex items-center cursor-pointer">
                <i className="ri-share-box-line p-1 text-xl" />
                <span className="text-xl">Share</span>
              </div>
            </div>
          </article>
        </div>

        <div className="flex flex-col gap-y-5 max-w-[50%]">
          <article className="transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110 w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://avatars.githubusercontent.com/u/87643260?v=4"
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                  Gabriel Sena
                </span>
              </div>
              <span>3 hours ago</span>
            </div>
            <div>
              <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
                Man, I wish smoker was not treated like an "Example dummy".
              </h2>
            </div>
            <p>
              I like this man so much but holy damn he's basically on the show
              just to be used as a punching bag. They need to introduce a new
              strong pirate? Great, send in smoker to catch some fists with his
              face. I like this man so much but holy damn he's basically on the
              show just to be used as a punching bag. They need to introduce a
              new strong pirate? Great, send in smoker to catch some fists with
              his face...
            </p>
            <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
            <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
              <div className="flex items-center gap-x-5">
                <div className="flex items-center cursor-pointer">
                  <i className="ri-heart-3-line p-1 text-xl" />
                  <span className="text-xl">25 Likes</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <i className="ri-discuss-line p-1 text-xl" />
                  <span className="text-xl">Discuss</span>
                </div>
              </div>
              <div className="flex items-center cursor-pointer">
                <i className="ri-share-box-line p-1 text-xl" />
                <span className="text-xl">Share</span>
              </div>
            </div>
          </article>
          <article className="transition-all ease-in-out duration-200 border-b-[4px] border-b-transparent hover:border-b-black dark:hover:border-b-white hover:scale-105 hover:brightness-110 w-full cursor-pointer h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-fill-strong">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://avatars.githubusercontent.com/u/87643260?v=4"
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                  Gabriel Sena
                </span>
              </div>
              <span>3 hours ago</span>
            </div>
            <div>
              <h2 className="font-semibold text-xl py-2 text-dusk-main dark:text-dawn-main">
                Man, I wish smoker was not treated like an "Example dummy".
              </h2>
            </div>
            <p>
              I like this man so much but holy damn he's basically on the Great,
              send in smoker to catch some fists with his face...
            </p>
            <div className="h-[1px] w-full my-2 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20" />
            <div className="flex items-center justify-between text-dusk-main dark:text-dawn-main">
              <div className="flex items-center gap-x-5">
                <div className="flex items-center cursor-pointer">
                  <i className="ri-heart-3-line p-1 text-xl" />
                  <span className="text-xl">25 Likes</span>
                </div>
                <div className="flex items-center cursor-pointer">
                  <i className="ri-discuss-line p-1 text-xl" />
                  <span className="text-xl">Discuss</span>
                </div>
              </div>
              <div className="flex items-center cursor-pointer">
                <i className="ri-share-box-line p-1 text-xl" />
                <span className="text-xl">Share</span>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          title="See all"
          className="bg-prime-blue my-5 !text-xl p-4 px-16 "
        />
        {/* Vai para posts do usuário (páginação de 5 em 5) */}
      </div>
    </section>
  )
}
