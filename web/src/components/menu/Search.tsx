import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import axios from 'axios'
import { searchByTitle, searchUsersByQuery } from '../../services/api-routes'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

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
        <Menu>
          <Menu.Button
            title="Filter"
            className="right-3 mt-[4px] cursor-pointer absolute text-dusk-main dark:text-dawn-main text-2xl"
          >
            <i className="ri-equalizer-line" />
          </Menu.Button>
          <Menu.Items className="shadow-md border border-dawn-weak/20 dark:border-dusk-weak/20 z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[14px] -bottom-[55px]">
            <Menu.Item>
              <a
                onClick={() => {
                  setUsersSearch(null)
                  setActiveFilter('Manga')
                }}
                className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
              >
                Manga
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => {
                  setMangaSearch(null)
                  setActiveFilter('User')
                }}
                className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
              >
                User
              </a>
            </Menu.Item>
          </Menu.Items>
        </Menu>
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
