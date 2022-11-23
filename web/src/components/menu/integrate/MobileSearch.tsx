import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dropdown } from '../../Dropdown'

interface Props {}

export const MobileSearch = (props: Props) => {
  const [showSearch, setShowSearch] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Manga')
  const [usersSearch, setUsersSearch] = useState<any>(null)
  const [mangaSearch, setMangaSearch] = useState<any>(null)

  const filterItems = [
    {
      item: 'Manga',
      function: () => {
        setUsersSearch(null)
        setActiveFilter('Manga')
      },
    },
    {
      item: 'User',
      function: () => {
        setMangaSearch(null)
        setActiveFilter('User')
      },
    },
  ]

  return (
    <div
      className={`${
        showSearch && 'w-screen'
      } flex items-center bg-fill-weak/60 backdrop-blur-sm dark:bg-fill-strong/60 absolute left-0 -bottom-[43px] cursor-pointer rounded-r-md  md:hidden border border-dawn-weak/20 dark:border-dusk-weak/20`}
    >
      <i
        onClick={() => setShowSearch(!showSearch)}
        className="ri-search-line py-2 px-3"
      />
      {showSearch && (
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          className="relative items-center w-full mr-9"
        >
          <input
            type="text"
            placeholder={`Search by ${activeFilter}`}
            className="outline-none w-full rounded-md bg-transparent py-1 pl-2 pr-12 border border-dawn-weak/20 dark:border-dusk-weak/20 "
          />
          <div className="absolute right-5 top-1">
            <Dropdown title="filter" space="space-y-8" items={filterItems}>
              <i className="ri-equalizer-line w-fit text-xl" />
            </Dropdown>
          </div>
        </motion.div>
      )}
    </div>
  )
}
