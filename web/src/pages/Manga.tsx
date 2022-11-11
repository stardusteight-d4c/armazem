import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { Button, Navbar, Sidebar } from '../components'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const Manga = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  // gerar um id para os mangas

  return (
    <div
      className={`${style.gridContainer} ${
        minimizeSidebar ? 'grid-cols-18' : 'grid-cols-5'
      }`}
    >
      <Sidebar />
      <div
        className={`${style.mainContent} ${
          minimizeSidebar ? 'col-span-17' : 'col-span-4'
        }`}
      >
        <Navbar />
        <main>
          <div className="py-2 px-4 flex items-center justify-between bg-prime-blue text-fill-weak text-2xl font-semibold">
            <span>Akira</span>
            <span className="text-xl font-medium">Katsuhiro Otomo</span>
          </div>
          <div className="p-4 pb-14">
            <div className="flex">
              <div className="max-w-[225px]">
                <img
                  src="https://cdn.myanimelist.net/images/manga/3/271629.jpg"
                  className="min-w-[225px] max-w-[225px] min-h-[304px] max-h-[304px]"
                />

                <form>
                  <h3 className="text-xl font-medium mt-2">Edit status</h3>
                  <div className="flex flex-col gap-y-1 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                    <div className="flex justify-between text-lg">
                      <span>Status</span>
                      <div className="relative">
                        <Menu>
                          <Menu.Button>
                            <span className="text-prime-blue">Completed</span>
                          </Menu.Button>
                          <Menu.Items className="drop-shadow-2xl whitespace-nowrap z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[21px] -bottom-[105px]">
                            <Menu.Item>
                              <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                                Completed
                              </span>
                            </Menu.Item>
                            <Menu.Item>
                              <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                                Reading
                              </span>
                            </Menu.Item>
                            <Menu.Item>
                              <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                                Plan to Read
                              </span>
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Chap. Read:</span>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="text"
                          placeholder="120"
                          maxLength={4}
                          className="w-[50px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center px-[2px] outline-none h-fit bg-transparent rounded-sm border border-prime-blue/50"
                        />
                        <span className="text-2xl">/</span>120
                      </div>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Your Score:</span>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="text"
                          placeholder="8"
                          maxLength={2}
                          className="w-[50px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center px-[2px] outline-none h-fit bg-transparent rounded-sm border border-prime-blue/50"
                        />
                      </div>
                    </div>
                    <Button
                      title="Submit"
                      className="bg-prime-blue mt-1 !rounded-sm !px-2 !py-1"
                    />
                  </div>
                </form>
                <h3 className="text-xl font-medium mt-2">Information</h3>
                <div className="flex text-base flex-col gap-[2px] border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                  <div className="flex justify-between">
                    <span>Chapters:</span>
                    <span>120</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>Finished</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Genres:</span>
                    <span>Action, Sci-Fi</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serialization:</span>
                    <span>Young Magazine (Weekly)</span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="text-lg flex items-center justify-between w-full border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 ml-4 p-2 pr-4 font-medium">
                  <div className="flex items-center gap-x-2">
                    <i className="ri-star-s-fill" /> Score
                  </div>
                  <span className="text-xl font-semibold">9.7</span>
                </div>
                <div className="text-lg flex items-center justify-between w-full border-y border-y-dawn-weak/20 dark:border-y-dusk-weak/20 ml-4 p-2 pr-4 font-medium">
                  <div className="flex items-center gap-x-2">
                    <i className="ri-book-3-fill" /> Readers
                  </div>
                  <span className="text-xl font-semibold">28</span>
                </div>
                <div className="text-lg flex items-center justify-between w-full ml-4 py-2 font-medium">
                  Resume
                </div>
                <div className="ml-4">
                  <p
                    className={`${showMore ? '' : 'line-clamp-6'} font-medium`}
                  >
                    1988: It is World War III. Tokyo is decimated by a
                    mysterious black explosion, unmatched in magnitude. 2019:
                    Fast forward 31 years. Neo-Tokyo, hastily built on the ruins
                    of old Tokyo, is a sprawling cityscape of neon extravaganza.
                    It is a fusion of towering skyscrapers and cutting-edge
                    technology that is permeated through and through with an
                    explosive, hyper-violent cocktail of biker gangs, poverty,
                    and revolutionaries. In this derelict metropolis live Tetsuo
                    Shima and Shoutarou Kaneda, two bikers who are the best of
                    friends and the fiercest of rivals, despite being affiliated
                    with the same gang. Desperate to prove himself as Kaneda's
                    equal, Tetsuo unwittingly pulls a stunt that culminates in
                    the awakening of a cryptic existence that threatens to
                    change both the face of Neo-Tokyo and the lives of those who
                    call the city their home—the awakening of a government
                    secret simply known as Akira.
                  </p>
                  <div>
                    {!showMore ? (
                      <span
                        onClick={() => setShowMore(!showMore)}
                        className="font-semibold hover:underline cursor-pointer text-prime-blue"
                      >
                        Show more
                      </span>
                    ) : (
                      <span
                        onClick={() => setShowMore(!showMore)}
                        className="font-semibold hover:underline cursor-pointer text-prime-blue"
                      >
                        Show less
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
