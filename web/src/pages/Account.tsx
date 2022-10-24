import React, { useEffect, useRef, useState } from 'react'
import { CardManga, Navbar, Sidebar } from '../components'
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

            <img
              className="w-40 h-40 ring-8 object-cover ring-fill-weak dark:ring-fill-strong absolute -bottom-20 left-10"
              src="https://avatars.githubusercontent.com/u/87643260?v=4"
              alt=""
            />
            <div className="absolute left-[215px] -bottom-20">
              <div className="flex items-center gap-x-4">
                <h2 className="text-4xl mr-4 text-black dark:text-white">
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
            <section className="mt-16">
              <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
                Stats
              </h2>
              <div className="flex items-center  bg-layer-heavy text-lg font-semibold">
                <div className="flex flex-col w-48">
                  <div className="flex justify-between bg-dusk-weak/10 p-2 items-center cursor-pointer">
                    {/* clicar e abrir modal */}
                    <span className="text-green">Reading</span>
                    <span>11</span>
                  </div>
                  <div className="flex justify-between items-center p-2 cursor-pointer">
                    <span className="text-prime-blue">Completed</span>
                    <span>17</span>
                  </div>
                  <div className="flex justify-between bg-dusk-weak/10 p-2 items-center cursor-pointer">
                    <span className="text-dusk-weak">Plan to Read</span>
                    <span>24</span>
                  </div>
                </div>
              
                <div className="w-full p-4">
                  <div className="bg-dusk-weak/10 flex rounded-full h-8  w-full relative">
                    <span className="absolute right-5">Total</span>
                    {/* Regra de três 52 está para 100% -> 11 está para x
                      52.x - 11.100
                      52.x = 1100
                      x = 1100 / 52 
                      x = 21.15%
                    */}
                    <motion.div variants={variants} animate="animate" className="h-full  rounded-l-full bg-gradient-to-tl from-green to-[#85ff99ee]" />
                    <div className="w-[32.69%] h-full bg-gradient-to-tl from-prime-blue to-[#85f7ffee]" />
                    <div className="w-[46.15%] h-full rounded-r-full bg-gradient-to-tl from-dusk-weak to-[#e6e6e6ee]" />
                  </div>
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
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
                <CardManga />
              </motion.div>
            </section>
          </div>
          {/* LAST UPDATES */}
          {/* deixar um comentário no perfil */}
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid grid-cols-5 overflow-hidden max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2 col-span-4`,
}
