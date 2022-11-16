import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import axios from 'axios'
import { searchByTitle, searchUsersByQuery } from '../../services/api-routes'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { Dropdown } from '../Dropdown'

interface Props {}

export const Search = (props: Props) => {
  const [usersSearch, setUsersSearch] = useState<any>(null)
  const [mangaSearch, setMangaSearch] = useState<any>(null)
  const [activeFilter, setActiveFilter] = useState('Manga')
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

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
    <div className="flex flex-col space-y-12">
      <div className="flex group relative items-center">
        <i className="ri-search-line group-focus-within:text-prime-blue left-2 absolute text-dusk-main dark:text-dawn-main text-3xl" />
        <input
          type="text"
          placeholder={`Search by ${activeFilter}`}
          onChange={(e) => handleSearchTerm(e)}
          className={`${
            minimizeSidebar
              ? 'max-w-[522px] min-w-[522px]'
              : 'max-w-[337px] min-w-[337px]'
          } h-full border border-dawn-weak/20 dark:border-dusk-weak/20 outline-none py-3 px-12 bg-transparent`}
        />
        <Dropdown title="filter" position='-bottom-[80px] -left-[60px]' items={filterItems}>
          <i className="ri-equalizer-line right-3 text-2xl -mt-4 absolute" />
        </Dropdown>
      </div>
      {usersSearch && usersSearch[0] !== null && (
        <div
          onClick={() => setUsersSearch(null)}
          className={`${
            minimizeSidebar
              ? 'max-w-[522px] min-w-[522px]'
              : 'max-w-[337px] min-w-[337px]'
          } shadow-2xl overflow-hidden overflow-y-scroll border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-40 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`}
        >
          {usersSearch.map((user: any, index: React.Key | null | undefined) => (
            <Link
              key={index}
              className="min-w-full block p-2 cursor-pointer"
              to={`/${user?.username}`}
            >
              {user?.username}
            </Link>
          ))}
        </div>
      )}
      {mangaSearch && (
        <div
          onClick={() => setMangaSearch(null)}
          className={`${
            minimizeSidebar
              ? 'max-w-[522px] min-w-[522px]'
              : 'max-w-[337px] min-w-[337px]'
          } shadow-2xl overflow-hidden overflow-y-scroll border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-40 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`}
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
    </div>
  )
}
