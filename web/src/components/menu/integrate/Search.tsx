import React, { useState } from 'react'
import axios from 'axios'
import { searchByTitle, searchUsersByQuery } from '../../../services/api-routes'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { Dropdown } from '../../Dropdown'

interface Props {}

export const Search = (props: Props) => {
  const [usersSearch, setUsersSearch] = useState<[User] | null>(null)
  const [mangaSearch, setMangaSearch] = useState<[Manga] | null>(null)
  const [activeFilter, setActiveFilter] = useState('Manga')
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  const search = async (query: string) => {
    if (activeFilter === 'User') {
      await axios
        .post(searchUsersByQuery, {
          query,
        })
        .then(({ data }) => setUsersSearch([data.users]))
        .catch((error) => console.log(error.toJSON()))
    } else if (activeFilter === 'Manga') {
      await axios
        .post(searchByTitle, {
          query,
        })
        .then(({ data }) => setMangaSearch(data.mangas))
        .catch((error) => console.log(error.toJSON()))
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
    <div {...style.wrapper}>
      <div className={style.inputContainer}>
        <i className={style.searchIcon} />
        <input
          type="text"
          placeholder={`Search by ${activeFilter}`}
          onChange={(e) => handleSearchTerm(e)}
          className={`${
            minimizeSidebar ? style.largeWidth : style.smallWidth
          } ${style.input}`}
        />
        <Dropdown
          title="filter"
          position="-bottom-[80px] -left-[60px]"
          items={filterItems}
        >
          <i className={style.filterIcon} />
        </Dropdown>
      </div>
      {usersSearch && usersSearch[0] !== null && (
        <div
          onClick={() => setUsersSearch(null)}
          className={`${
            minimizeSidebar ? style.largeWidth : style.smallWidth
          } ${style.defaultContainer}`}
        >
          {usersSearch.map((user: User, index: React.Key) => (
            <Link key={index} className={style.link} to={`/${user?.username}`}>
              {user?.username}
            </Link>
          ))}
        </div>
      )}
      {mangaSearch && (
        <div
          onClick={() => setMangaSearch(null)}
          className={`${
            minimizeSidebar ? style.largeWidth : style.smallWidth
          } ${style.defaultContainer}`}
        >
          {mangaSearch.map((manga: Manga, index: React.Key) => (
            <Link key={index} className={style.link} to={`/manga/${manga.uid}`}>
              {manga.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const style = {
  wrapper: { className: 'hidden md:flex flex-col space-y-12' },
  inputContainer: `flex group relative items-center`,
  searchIcon: `ri-search-line group-focus-within:text-prime-blue left-2 absolute text-dusk-main dark:text-dawn-main text-3xl`,
  largeWidth: `max-w-[522px] min-w-[522px]`,
  smallWidth: `max-w-[337px] min-w-[337px]`,
  input: `h-full border border-dawn-weak/20 dark:border-dusk-weak/20 outline-none py-3 px-12 bg-transparent`,
  filterIcon: `ri-equalizer-line right-3 text-2xl -mt-4 absolute`,
  defaultContainer: `shadow-2xl overflow-hidden overflow-y-scroll border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-40 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  link: `min-w-full block truncate p-2 cursor-pointer`,
}
