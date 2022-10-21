import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../components/SwitchTheme'
import hero from '../assets/hero.jpg'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('session')
    if (user) {
      const dataSession = JSON.parse(user)
      setSession(dataSession)
    } else {
      navigate('/login')
    }
  }, [])

  console.log(session)
  // file:///home/sena/Downloads/Rectangle%201.svg
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
              <div className="flex items-center space-x-5">
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
                  className="w-[80vw] max-w-[1200px] mx-auto h-[375px]  cursor-pointer"
                />
              </div>
              <div className="w-[80vw] max-w-[1200px] mx-auto">
                <article className="w-[450px]  p-4 text-[#9B9B9B] bg-fill-strong">
                  <div className="flex items-center">
                    <img
                      src="https://avatars.githubusercontent.com/u/87643260?v=4"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">Gabriel Sena</span>
                    <span>3 hours ago</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-white">
                      Man, I wish smoker was not treated like an "Example
                      dummy".
                    </h2>
                  </div>
                  <p>
                    I like this man so much but holy damn he's basically on the
                    show just to be used as a punching bag. They need to
                    introduce a new strong pirate? Great, send in smoker to
                    catch some fists with his face. I mean....
                  </p>
                </article>
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
