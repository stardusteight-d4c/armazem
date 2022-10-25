import React, { useEffect, useRef, useState } from 'react'
import { Button, CardManga, Navbar, Sidebar } from '../components'
import { motion } from 'framer-motion'

interface Props {}

export const Account = (props: Props) => {
  const [favoritesWidth, setFavoritesCarouselWidth] = useState(0)
  const [onDragFavorites, setOnDragFavorites] = useState(0)
  // CAROUSEL FRAMER MOTION
  const favoritesCarousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    favoritesCarousel.current &&
      setFavoritesCarouselWidth(
        favoritesCarousel.current.scrollWidth -
          favoritesCarousel.current.offsetWidth
      )
  }, [onDragFavorites])

  let bar_width = '21.15%'

  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: bar_width,
      transition: {
        duration: 0.4,
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  }

  return (
    <div className={style.gridContainer}>
      <Sidebar />
      <div className={style.mainContent}>
        <Navbar />
        <main className="">
          <div className="relative">
            <img
              className="w-full h-[300px]"
              src="https://i.pinimg.com/originals/04/8e/d4/048ed48666ab08672b8d0da8602ed4e1.jpg"
              alt="cover/img"
            />
            <div className="ri-image-edit-fill  text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong flex items-center justify-center w-10 h-10 text-xl absolute top-5 right-5 cursor-pointer rounded-full"></div>
            <img
              className="w-40 h-40 ring-8 object-cover ring-fill-weak dark:ring-fill-strong absolute -bottom-20 left-4"
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
            />
            <div className="absolute left-[185px] -bottom-[75px]">
              <div className="flex items-center gap-x-4">
                <h2 className="text-4xl font-semibold mr-4 text-black dark:text-white">
                  Gabriel Sena
                </h2>
                <div className="flex cursor-pointer items-center">
                  <i className="ri-link mr-1" />
                  <span>Request</span>
                </div>
                <div className="flex cursor-pointer items-center">
                  <i className="ri-message-3-line mr-1" />
                  <span>Send message</span>
                </div>
              </div>
              <div className="flex items-center text-lg">@blackwive</div>
            </div>
          </div>
          <div className="p-4">
            <section className="mt-16 py-5">
              <div className="flex items-center text-lg font-semibold">
                <div className="flex gap-x-7">
                  <div className="flex justify-between gap-x-2 items-center cursor-pointer">
                    {/* clicar e abrir modal */}
                    <span className="text-green">Reading</span>
                    <span>11</span>
                  </div>
                  <div className="flex justify-between items-center gap-x-2 cursor-pointer">
                    <span className="text-prime-blue">Completed</span>
                    <span>17</span>
                  </div>
                  <div className="flex justify-between  items-center gap-x-2 cursor-pointer">
                    <span className="text-dusk-weak">Plan to Read</span>
                    <span>24</span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="bg-dusk-weak/10 rounded-full flex h-4  w-full relative">
                  {/* Regra de três: 52 está para 100% -> 11 está para x
                      52.x - 11.100
                      52.x = 1100
                      x = 1100 / 52 
                      x = 21.15%
                    */}
                  <motion.div
                    variants={variants}
                    animate="animate"
                    title="21.15%"
                    className="h-full text-layer-heavy flex items-center justify-center font-semibold rounded-l-full bg-green"
                  />
                  <div
                    title="32.69%"
                    className="w-[32.69%] h-full text-layer-heavy flex items-center justify-center  bg-prime-blue"
                  />

                  <div
                    title="46.15%"
                    className="w-[46.15%] h-full text-layer-heavy flex items-center justify-center rounded-r-full bg-dusk-weak"
                  />
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
                Favorites
              </h2>
              <motion.div
                drag="x"
                ref={favoritesCarousel}
                onDrag={(_event, info) => setOnDragFavorites(info.offset.x)}
                dragConstraints={{ right: 0, left: -favoritesWidth }}
                className="flex items-center gap-x-5 "
              >
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
                <CardManga className="!min-w-[200px] !max-w-[180px] !h-[290px]" />
              </motion.div>
            </section>
            <section>
              <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
                Last posts
              </h2>
              <div className="flex gap-5">
                <div className="flex flex-col gap-y-5 max-w-[50%]">
                  <article className="w-full cursor-pointer h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                        Man, I wish smoker was not treated like an "Example
                        dummy".
                      </h2>
                    </div>
                    <p>
                      I like this man so much but holy damn he's basically on
                      the Great, send in smoker to catch some fists with his
                      face...
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
                  <article className="w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                        Man, I wish smoker was not treated like an "Example
                        dummy".
                      </h2>
                    </div>
                    <p>
                      I like this man so much but holy damn he's basically on
                      the show just to be used as a punching bag. They need to
                      introduce a new strong pirate? Great, send in smoker to
                      catch some fists with his face. I like this man so much
                      but holy damn he's...
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
                  <article className="w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                        Man, I wish smoker was not treated like an "Example
                        dummy".
                      </h2>
                    </div>
                    <p>
                      I like this man so much but holy damn he's basically on
                      the show just to be used as a punching bag. They need to
                      introduce a new strong pirate? Great, send in smoker to
                      catch some fists with his face. I like this man so much
                      but holy damn he's basically on the show just to be used
                      as a punching bag. They need to introduce a new strong
                      pirate? Great, send in smoker to catch some fists with his
                      face...
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
                  <article className="w-full cursor-pointer h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                        Man, I wish smoker was not treated like an "Example
                        dummy".
                      </h2>
                    </div>
                    <p>
                      I like this man so much but holy damn he's basically on
                      the Great, send in smoker to catch some fists with his
                      face...
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
            <section>
              <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
                Shared posts
              </h2>
              <div className="flex flex-col gap-y-5">
                <article className="w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                      Man, I wish smoker was not treated like an "Example
                      dummy".
                    </h2>
                  </div>
                  <p>
                    I like this man so much but holy damn he's basically on the
                    show just to be used as a punching bag. They need to
                    introduce a new strong pirate? Great, send in smoker to
                    catch some fists with his face. I like this man so much but
                    holy damn he's basically on the show just to be used as a
                    punching bag. They need to introduce a new strong pirate?
                    Great, send in smoker to catch some fists with his face...
                  </p>
                </article>
                <article className="w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                      Man, I wish smoker was not treated like an "Example
                      dummy".
                    </h2>
                  </div>
                  <p>
                    I like this man so much but holy damn he's basically on the
                    show just to be used as a punching bag. They need to
                    introduce a new strong pirate? Great, send in smoker to
                    catch some fists with his face. I like this man so much but
                    holy damn he's basically on the show just to be used as a
                    punching bag. They need to introduce a new strong pirate?
                    Great, send in smoker to catch some fists with his face...
                  </p>
                </article>
                <article className="w-full cursor-pointer  h-fit p-4 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440]">
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
                      Man, I wish smoker was not treated like an "Example
                      dummy".
                    </h2>
                  </div>
                  <p>
                    I like this man so much but holy damn he's basically on the
                    punching bag. They need to introduce a new strong pirate?
                    Great, send in smoker to catch some fists with his face...
                  </p>
                </article>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  title="See all"
                  className="bg-prime-blue my-5 !text-xl p-4 px-16 "
                />
                {/* Vai para posts do usuário (páginação de 5 em 5) */}
              </div>
            </section>
            <section>
              <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
                Last updates
              </h2>
              <div className="flex flex-col gap-y-5">
                <div className="flex p-2 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-[500px] ">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      Gabriel Sena
                    </span>
                    <span className="text-dusk-weak  -mt-1">
                      Reading 491 of Dragon Ball
                    </span>
                  </div>
                  <div className="flex w-full self-center justify-end">
                    <span className="w-fit text-lg h-fit font-semibold">
                      11 hours ago
                    </span>
                  </div>
                </div>
                <div className="flex p-2 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-[500px] ">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      Gabriel Sena
                    </span>
                    <span className="text-dusk-weak  -mt-1">
                      Reading 491 of Dragon Ball
                    </span>
                  </div>
                  <div className="flex w-full self-center justify-end">
                    <span className="w-fit text-lg h-fit font-semibold">
                      11 hours ago
                    </span>
                  </div>
                </div>
                <div className="flex p-2 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-[500px] ">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      Gabriel Sena
                    </span>
                    <span className="text-dusk-weak  -mt-1">
                      Reading 491 of Dragon Ball
                    </span>
                  </div>
                  <div className="flex w-full self-center justify-end">
                    <span className="w-fit text-lg h-fit font-semibold">
                      11 hours ago
                    </span>
                  </div>
                </div>
                <div className="flex p-2 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-[500px] ">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      Gabriel Sena
                    </span>
                    <span className="text-dusk-weak  -mt-1">
                      Reading 491 of Dragon Ball
                    </span>
                  </div>
                  <div className="flex w-full self-center justify-end">
                    <span className="w-fit text-lg h-fit font-semibold">
                      11 hours ago
                    </span>
                  </div>
                </div>
                <div className="flex p-2 text-[#707070] dark:text-[#9B9B9B] bg-white dark:bg-[#2e3440] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-[500px] ">
                    <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
                      Gabriel Sena
                    </span>
                    <span className="text-dusk-weak  -mt-1">
                      Reading 491 of Dragon Ball
                    </span>
                  </div>
                  <div className="flex w-full self-center justify-end">
                    <span className="w-fit text-lg h-fit font-semibold">
                      11 hours ago
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
                Comments
              </h2>
              <div>
                <div className="flex items-start gap-x-5">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-2xl text-dusk-main dark:text-dawn-main">
                      Gabriel Sena
                    </span>
                    <textarea
                      placeholder="Type your text"
                      className="w-full max-h-[180px] placeholder:text-lg placeholder:text-dawn-main bg-transparent min-h-[80px] focus:border-prime-blue border p-2 outline-none"
                    />
                  </div>
                </div>
                <div className=' flex justify-end '>
                <Button title="Submit" className="bg-prime-blue my-5 !w-fit px-4 py-2" />

                </div>
                <div className="flex border-t py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-9 h-9 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-full ">
                    <span className="font-medium text-lg text-dusk-main dark:text-dawn-main">
                      @stardusteight
                    </span>
                    <span>
                      I like this man so much but holy damn he's basically on
                      the punching bag. They need to introduce a new strong
                      pirate? Great, send in smoker to catch some fists with his
                      face!
                    </span>
                  </div>
                </div>
                <div className="flex border-t py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-9 h-9 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-full ">
                    <span className="font-medium text-lg text-dusk-main dark:text-dawn-main">
                      @stardusteight
                    </span>
                    <span>
                      I like this man so much but holy damn he's basically on
                      the punching bag. They need to introduce a new strong
                      pirate? Great, send in smoker to catch some fists with his
                      face!
                    </span>
                  </div>
                </div>
                <div className="flex border-t py-8  px-2 text-[#707070] dark:text-[#9B9B9B] items-start gap-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/87643260?v=4"
                    alt=""
                    className="w-9 h-9 rounded-md object-cover"
                  />
                  <div className="flex flex-col w-full ">
                    <span className="font-medium text-lg text-dusk-main dark:text-dawn-main">
                      @stardusteight
                    </span>
                    <span>
                      I like this man so much but holy damn he's basically on
                      the punching bag. They need to introduce a new strong
                      pirate? Great, send in smoker to catch some fists with his
                      face!
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
