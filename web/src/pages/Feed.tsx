import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../components/SwitchTheme'
import hero from '../assets/hero.jpg'
import { Button, CardManga, PostInput, PreviewPost } from '../components'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [previewPostCarouselWidth, setPreviewPostCarouselWidth] = useState(0)
  const [cardCarouselWidth, setCardCarouselWidth] = useState(0)
  const [onDragPreviewPost, setOnDragPreviewPost] = useState(0)
  const [onDrag, setOnDrag] = useState(0)
  const [newPost, setNewPost] = useState(false)

  // CAROUSEL FRAMER MOTION
  const previewPostCarousel =
    useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    previewPostCarousel.current &&
      setPreviewPostCarouselWidth(
        previewPostCarousel.current.scrollWidth -
          previewPostCarousel.current.offsetWidth
      )
  }, [session, onDragPreviewPost])

  const cardCarousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    cardCarousel.current &&
      setCardCarouselWidth(
        cardCarousel.current.scrollWidth - cardCarousel.current.offsetWidth
      )
  }, [session, onDrag])

  useEffect(() => {
    const user = localStorage.getItem('session')
    if (user) {
      const dataSession = JSON.parse(user)
      setSession(dataSession)
    } else {
      navigate('/login')
    }
  }, [])

  // Hospedar imagens no IPFS

  // Verificar se o usuário existe no banco de dados através da sessão, pois se alterarmos o username,
  // O feed vai carregar do mesmo jeito, ou pior, se colarmos em localstorage session com um objeto vazio
  // tbm será possível acessar a aplicação, pois isso devemos verificar pelo id do usuário no banco de dados
  console.log(session)
  return (
    <>
      {newPost && <PostInput />}
      {session ? (
        <div className="grid grid-cols-5 max-w-screen-xl drop-shadow-sm dark:drop-shadow-2xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong">
          <div className="col-start-2 col-span-4 ">
            <nav className="bg-fill-weak dark:bg-fill-strong border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between p-8 w-full flex items-center h-24">
              <div className="flex relative items-center rounded-full">
                <i className="ri-search-2-line left-2 absolute text-dusk-main dark:text-dawn-main text-3xl" />
                <input
                  type="text"
                  placeholder="Search Everything"
                  className="w-full h-full placeholder:text-dusk-main dark:placeholder:text-dawn-main rounded-full outline-none py-4 px-12 bg-transparent"
                />
              </div>
              <div className="flex items-center gap-x-5">
                <SwitchTheme />
                <i
                  className="ri-article-line text-3xl p-2 cursor-pointer"
                  onClick={() => setNewPost(!newPost)}
                />
                <i className="ri-message-2-line text-3xl p-2 cursor-pointer" />
                <i className="ri-notification-2-line text-3xl p-2 cursor-pointer" />
                <i className="ri-settings-2-line text-3xl p-2 cursor-pointer" />

                <img
                  src="https://avatars.githubusercontent.com/u/87643260?v=4"
                  className="w-12 h-12 rounded-full cursor-pointer  auto-rows-auto"
                  alt=""
                />
              </div>
            </nav>

            <div className="p-8">
              <main className="max-w-[1200px] mx-auto">
                <header className="space-y-5 relative flex flex-col">
                  <div className="flex gap-4">
                    <img
                      src={hero}
                      alt=""
                      className="w-full mx-auto h-[300px] object-cover cursor-pointer"
                    />
                  </div>
                </header>

                <section>
                  <h2 className="text-2xl pb-4 pt-8 text-dusk-main dark:text-dawn-main font-bold">
                    Most energized posts
                  </h2>
                  <div className="w-full">
                    <motion.div
                      // whileTap={{ cursor: 'grabbing' }}
                      drag="x"
                      ref={previewPostCarousel}
                      onDrag={(_event, info) =>
                        setOnDragPreviewPost(info.offset.x)
                      }
                      dragConstraints={{
                        right: 0,
                        left: -previewPostCarouselWidth,
                      }}
                      className="flex items-center gap-x-5"
                    >
                      <PreviewPost />
                      <PreviewPost />
                      <PreviewPost />
                      <PreviewPost />
                      <PreviewPost />
                      <PreviewPost />
                    </motion.div>
                  </div>
                </section>
                <section>
                  <h2 className="text-2xl pb-4 pt-8 text-dusk-main dark:text-dawn-main font-bold">
                    Popular readings
                  </h2>
                  <motion.div
                    // whileTap={{ cursor: 'grabbing' }}
                    drag="x"
                    ref={cardCarousel}
                    onDrag={(_event, info) => setOnDrag(info.offset.x)}
                    dragConstraints={{ right: 0, left: -cardCarouselWidth }}
                    className="flex items-center gap-x-5 "
                  >
                    <CardManga />
                    <CardManga />
                    <CardManga />
                    <CardManga />
                    <CardManga />
                    <CardManga />
                    <CardManga />
                  </motion.div>
                </section>
              </main>
            </div>
          </div>

          <aside className="min-h-screen scrollbar-hide z-10 border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 col-span-1 row-start-1 col-start-1  text-dusk-main dark:text-dawn-main px-4 bg-fill-weak dark:bg-fill-strong">
            <div className="flex items-center py-8 -mt-[2px] gap-x-2">
              <i className="ri-server-fill text-2xl text-fill-strong dark:text-fill-weak" />
              <h1 className="text-3xl font-inter text-fill-strong dark:text-fill-weak font-bold">
                Armazem
              </h1>
            </div>
            <div>
              <span className="mb-4 block">New Feeds</span>
              <ul className="space-y-2">
                <li className="flex w-full cursor-pointer items-center justify-start p-4 bg-prime-blue rounded-xl gap-4">
                  <i className="ri-water-flash-fill text-white text-2xl" />
                  <span className="font-medium text-white text-lg">
                    New Feed
                  </span>
                </li>
                <li className="flex w-full cursor-pointer items-center justify-start p-4 rounded-2xl gap-4">
                  <i className="ri-line-chart-line text-2xl" />
                  <span className="font-medium text-lg">Trending</span>
                </li>
                <li className="flex w-full cursor-pointer items-center justify-start p-4 rounded-2xl gap-4">
                  <i className="ri-emotion-line text-2xl" />
                  <span className="font-medium text-lg">Following</span>
                </li>
                <li className="flex w-full cursor-pointer items-center justify-start p-4 rounded-2xl gap-4">
                  <i className="ri-book-mark-line text-2xl" />
                  <span className="font-medium text-lg">My list</span>
                </li>
              </ul>
            </div>
            <div className="h-[1px] w-[full] my-8 bg-dawn-weak/20 dark:bg-dusk-weak/20" />
            <div>
              <span className="mb-4 block">Following</span>
              <ul className="space-y-5">
                <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                  </div>
                  <i className="ri-wifi-line" />
                </li>{' '}
                <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                  </div>
                  <i className="ri-wifi-line" />
                </li>{' '}
                <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                  </div>
                  <i className="ri-wifi-line" />
                </li>
                <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                  </div>
                  <i className="ri-wifi-line" />
                </li>
                <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                  </div>
                  <i className="ri-wifi-line" />
                </li>
                <li className="flex justify-between w-full cursor-pointer items-center px-4 rounded-2xl gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                  </div>
                  <i className="ri-wifi-line" />
                </li>
              </ul>
            </div>
          </aside>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
