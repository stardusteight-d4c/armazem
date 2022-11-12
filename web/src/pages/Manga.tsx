import { Menu } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, CardManga, Favorites, Navbar, Sidebar } from '../components'
import { useAppSelector } from '../store/hooks'
import { motion } from 'framer-motion'

interface Props {}

export const Manga = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [recommendationWidth, setRecommendationWidth] = useState(0)
  const [onDragRecommendations, setOnDragRecommendations] = useState(0)

  // CAROUSEL FRAMER MOTION
  const recommendationsCarrousel = useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
   recommendationsCarrousel.current &&
      setRecommendationWidth(
       recommendationsCarrousel.current.scrollWidth -
         recommendationsCarrousel.current.offsetWidth
      )
  }, [onDragRecommendations])

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
          <div className="py-2 cursor-default px-4 flex items-center justify-between bg-prime-blue text-fill-weak text-2xl font-semibold">
            <span>Akira</span>
            <span className="text-xl font-medium">Katsuhiro Otomo</span>
          </div>
          <div className="p-4 pb-14">
            <div className="flex">
              <div className="max-w-[225px]">
                <img
                  src="https://cdn.myanimelist.net/images/manga/3/271629.jpg"
                  className="min-w-[225px] max-w-[225px] min-h-[300px] max-h-[300px]"
                />
                <div className="flex items-center gap-x-2">
                  <div
                    title="Not listed"
                    className="ri-bookmark-line cursor-pointer"
                  />
                  <div
                    title="Add to favorites"
                    className="ri-star-line cursor-pointer"
                  />
                </div>
                <form>
                  {/* !mangaInMyList ? ('add to my list and open modal') : ('edit status') */}
                  <h3 className="text-xl font-medium mt-2">Edit status</h3>
                  <div className="flex flex-col gap-y-1 border-t-4 border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                    <div className="flex justify-between text-base">
                      <span>Status:</span>
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
                    <div className="flex justify-between text-base">
                      <span>Chap. Read:</span>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="number"
                          min={0}
                          max={120}
                          placeholder="120"
                          maxLength={4}
                          className="w-[50px] h-[18px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center outline-none bg-transparent rounded-sm border border-prime-blue/50"
                        />
                        <span>/</span>120
                      </div>
                    </div>
                    <div className="flex justify-between text-base">
                      <span>Your Score:</span>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          placeholder="8"
                          maxLength={2}
                          className="w-[50px] h-[18px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center outline-none bg-transparent rounded-sm border border-prime-blue/50"
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
                <div className="flex text-base flex-col gap-[2px] border-t-4 border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                  <div className="flex flex-col">
                    <span>Chapters:</span>
                    <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
                      120
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>Status:</span>
                    <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
                      Finished
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>Genres:</span>
                    <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
                      Action, Award Winning, Sci-Fi
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>Serialization:</span>
                    <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
                      Young Magazine (Weekly)
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full pl-4 cursor-default">
                <div className="text-base flex items-center justify-between w-full border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2 font-medium">
                  <div className="flex items-center gap-x-2">
                    <i className="ri-star-s-fill" /> Score
                  </div>
                  <span className="text-xl font-semibold">9.7</span>
                </div>
                <div className="text-base flex items-center justify-between w-full border-y border-y-dawn-weak/20 dark:border-y-dusk-weak/20 py-2 font-medium">
                  <div className="flex items-center gap-x-2">
                    <i className="ri-book-3-fill" /> Readers
                  </div>
                  <span className="text-xl font-semibold">28</span>
                </div>
                <div className="text-base flex items-center justify-between w-full py-2 font-medium">
                  Resume
                </div>
                <div>
                  <p
                    className={`${
                      showMore ? '' : 'line-clamp-4'
                    } cursor-default font-medium`}
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
                <div className="text-base border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 mt-2 flex items-center justify-between w-full py-2 font-medium">
                  <span>Reviews</span>
                  <div className="space-x-2">
                    <span className="text-sm hover:underline cursor-pointer text-prime-blue">
                      Add review
                    </span>
                    <span>•</span>
                    <span className="text-sm hover:underline cursor-pointer text-prime-blue">
                      More reviews
                    </span>
                  </div>
                </div>
                <div className="mb-5 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                  <div className="flex">
                    <img
                      src="https://github.com/stardusteight-d4c.png"
                      alt=""
                      className="w-14 h-14 object-cover"
                    />
                    <div className="flex flex-col pl-2">
                      <div className="flex justify-between -mt-1">
                        <span className="font-semibold">
                          @stardusteight-d4c
                        </span>
                        <span className="text-[#707070] dark:text-[#9B9B9B]">
                          12/11/2022
                        </span>
                      </div>
                      <p className="">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Architecto facere voluptatibus praesentium aliquam
                        alias ratione, distinctio, dignissimos, ea minima esse
                        pariatur quaerat. Et voluptatibus maxime beatae. Fugiat
                        odio sit illum. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Blanditiis atque ullam corporis
                        explicabo nobis minus cupiditate totam aliquam natus,
                        numquam quam voluptate, accusamus excepturi dolorum amet
                        laudantium illum dolore nostrum. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Itaque quidem dolores
                        nisi, rem sapiente quis. Suscipit ut, iusto voluptatem,
                        qui sunt deserunt hic magni obcaecati corporis, quisquam
                        quas saepe iure!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                  <div className="flex">
                    <img
                      src="https://github.com/stardusteight-d4c.png"
                      alt=""
                      className="w-14 h-14 object-cover"
                    />
                    <div className="flex flex-col pl-2">
                      <div className="flex justify-between -mt-1">
                        <span className="font-semibold">@pedroca</span>
                        <span className="text-[#707070] dark:text-[#9B9B9B]">
                          12/11/2022
                        </span>
                      </div>
                      <p className="">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Architecto facere voluptatibus praesentium aliquam
                        alias ratione, distinctio, dignissimos, ea minima esse
                        pariatur quaerat. Et voluptatibus maxime beatae. Fugiat
                        odio sit illum. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Blanditiis atque ullam corporis
                        explicabo nobis minus cupiditate totam aliquam natus,
                        numquam quam voluptate, accusamus excepturi dolorum amet
                        laudantium illum dolore nostrum. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Itaque quidem dolores
                        nisi, rem sapiente quis. Suscipit ut, iusto voluptatem,
                        qui sunt deserunt hic magni obcaecati corporis, quisquam
                        quas saepe iure!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
                  <div className="flex">
                    <img
                      src="https://github.com/stardusteight-d4c.png"
                      alt=""
                      className="w-14 h-14 object-cover"
                    />
                    <div className="flex flex-col pl-2">
                      <div className="flex justify-between -mt-1">
                        <span className="font-semibold">@pedroca</span>
                        <span className="text-[#707070] dark:text-[#9B9B9B]">
                          12/11/2022
                        </span>
                      </div>
                      <p className="">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Architecto facere voluptatibus praesentium aliquam
                        alias ratione, distinctio, dignissimos, ea minima esse
                        pariatur quaerat. Et voluptatibus maxime beatae. Fugiat
                        odio sit illum. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Blanditiis atque ullam corporis
                        explicabo nobis minus cupiditate totam aliquam natus,
                        numquam quam voluptate, accusamus excepturi dolorum amet
                        laudantium illum dolore nostrum. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Itaque quidem dolores
                        nisi, rem sapiente quis. Suscipit ut, iusto voluptatem,
                        qui sunt deserunt hic magni obcaecati corporis, quisquam
                        quas saepe iure!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Recomendação por genêro */}
            <section>
              <h2 className="text-2xl pb-4 text-dusk-main dark:text-dawn-main font-bold">
                Recommendations
              </h2>
              <motion.div
                drag="x"
                ref= {recommendationsCarrousel}
                onDrag={(_event, info) => setOnDragRecommendations(info.offset.x)}
                dragConstraints={{ right: 0, left: -recommendationWidth }}
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
