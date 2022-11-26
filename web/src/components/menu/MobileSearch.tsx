import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dropdown } from '../Dropdown'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { searchByTitle, searchUsersByQuery } from '../../services/api-routes'

interface Props {}

export const MobileSearch = (props: Props) => {
  const [showSearch, setShowSearch] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Manga')
  const [usersSearch, setUsersSearch] = useState<any>(null)
  const [mangaSearch, setMangaSearch] = useState<any>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const search = async (query: string) => {
    if (activeFilter === 'User') {
      const { data } = await axios.post(searchUsersByQuery, {
        query,
      })
      setUsersSearch([data.users])
    } else if (activeFilter === 'Manga') {
      const { data } = await axios.post(searchByTitle, {
        query,
      })
      setMangaSearch(data.mangas)
    }
  }

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    if (term.length >= 3) {
      search(term)
    } else if (term === '') {
      setMangaSearch(null)
      setUsersSearch(null)
    }
  }

  function handleShowSearch() {
    setShowSearch(!showSearch)
    setMangaSearch(null)
    setUsersSearch(null)
  }

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
      } ${scrollPosition < 60 ? 'hidden' : 'flex' } items-center z-50 bg-fill-weak/60 backdrop-blur-sm dark:bg-fill-strong/60 fixed left-0 top-0 cursor-pointer rounded-r-md  md:hidden border border-dawn-weak/20 dark:border-dusk-weak/20`}
    >
      <i onClick={handleShowSearch} className="ri-search-line py-2 px-3" />
      {showSearch && (
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          className="relative items-center w-full mr-9"
        >
          <input
            type="text"
            onChange={(e) => handleSearchTerm(e)}
            placeholder={`Search by ${activeFilter}`}
            className="outline-none placeholder:text-dusk-main placeholder:dark:text-dawn-main w-full rounded-md bg-transparent py-1 pl-2 pr-12 border border-dawn-weak/20 dark:border-dusk-weak/20 "
          />
          <div className="absolute right-5 top-1">
            <Dropdown title="filter" space="space-y-8" items={filterItems}>
              <i className="ri-equalizer-line w-fit text-xl" />
            </Dropdown>
          </div>
          {usersSearch && usersSearch[0] !== null && (
            <div
              onClick={() => setUsersSearch(null)}
              className="shadow-2xl w-full overflow-hidden overflow-y-scroll rounded-md border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-40 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak/60 dark:bg-fill-strong/60 backdrop-blur-sm"
            >
              {usersSearch.map(
                (user: any, index: React.Key | null | undefined) => (
                  <Link
                    key={index}
                    className="min-w-full block p-2 cursor-pointer"
                    to={`/${user?.username}`}
                  >
                    {user?.username}
                  </Link>
                )
              )}
            </div>
          )}
          {mangaSearch && (
            <div
              onClick={() => setMangaSearch(null)}
              className="shadow-2xl w-full overflow-hidden overflow-y-scroll rounded-md border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-40 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak/60 dark:bg-fill-strong/60 backdrop-blur-sm"
            >
              {mangaSearch.map(
                (manga: any, index: React.Key | null | undefined) => (
                  <Link
                    key={index}
                    className="min-w-full block truncate p-2 cursor-pointer"
                    to={`/manga/${manga.uid}`}
                  >
                    {manga.title}
                  </Link>
                )
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
