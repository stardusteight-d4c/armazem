import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../components/SwitchTheme'
import hero from '../assets/hero.jpg'
import { PreviewPost } from '../components'
import { motion } from 'framer-motion'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [width, setWidth] = useState(0)
  const [onDrag, setOnDrag] = useState(0)

  // CARROUSEL FRAMER MOTION
  const carousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    carousel.current &&
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
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

  // Verificar se o usuário existe no banco de dados através da sessão, pois se alterarmos o username,
  // O feed vai carregar do mesmo jeito, crie uma tela de loading mais elaborada

  console.log(session)
  return (
    <>
      {session ? (
        <div className="grid grid-cols-5 overflow-x-hidden text-dawn-main bg-[#eceff4] dark:bg-[#2e3440]">
          <div className="col-start-2 col-span-4 ">
            <nav className="bg-fill-strong justify-between p-8 w-full flex items-center h-24">
              <div className="flex relative items-center  rounded-full">
                <i className="ri-search-2-line left-2 absolute text-dawn-main text-3xl" />
                <input
                  type="text"
                  placeholder="Search Everything"
                  className="w-full h-full text-[#81838f] rounded-full outline-none py-4 px-12 bg-fill-strong"
                />
              </div>
              <div className="flex items-center gap-x-5">
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
            <header className="col-start-2 space-y-5 relative col-span-4 p-8 flex flex-col">
              <div className="flex gap-4">
                <img
                  src={hero}
                  alt=""
                  className="w-full max-w-[1200px] mx-auto h-[375px] cursor-pointer"
                />
              </div>
              <div className="w-full overflow-hidden max-w-[1200px] mx-auto">
                <motion.div
                  whileTap={{ cursor: 'grabbing' }}
                  drag="x"
                  ref={carousel}
                  onDrag={(_event, info) =>
                    setOnDrag(info.offset.x)
                  }
                  dragConstraints={{ right: 0, left: -width }}
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
            </header>
          </div>

          <aside className="col-span-1 row-start-1 col-start-1 text-dawn-main px-4 bg-fill-strong">
            <div className="flex items-center py-8 -mt-[2px] gap-x-2">
              <i className="ri-server-fill text-2xl text-white" />
              <h1 className="text-3xl text-white font-inter font-bold">
                ANiStorage
              </h1>
            </div>
            <div>
              <span className="mb-4 block">New Feeds</span>
              <ul className="space-y-2">
                <li className="flex w-full cursor-pointer items-center justify-start p-4 bg-prime-purple rounded-xl gap-4">
                  <i className="ri-gamepad-fill text-white text-2xl" />
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
            <div className="h-[1px] w-[full] my-8 bg-dusk-weak/50" />
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
