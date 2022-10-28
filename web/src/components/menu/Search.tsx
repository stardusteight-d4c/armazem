import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import axios from 'axios'
import { searchUsersByQuery } from '../../services/api-routes'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { handleOpenModal, handleResultUsersSearch } from '../../store'

interface Props {}

export const Search = (props: Props) => {
  // const [usersSearch, setUsersSearch] = useState<any>([])
  const dispatch = useAppDispatch()
  const usersSearch = useAppSelector((state) => state.armazem.usersSearch)

  const search = async (query: string) => {
    const { data } = await axios.post(searchUsersByQuery, {
      query,
    })
    dispatch(handleResultUsersSearch([data.users]))
  }

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    if (term.length >= 3) {
      search(term)
    } else {
      dispatch(handleResultUsersSearch(undefined))
    }
  }

  return (
    <div className="flex relative items-center rounded-full">
      <i className="ri-search-2-line left-2 absolute text-dusk-main dark:text-dawn-main text-3xl" />
      <input
        type="text"
        placeholder="Search by manga or user"
        onChange={(e) => handleSearchTerm(e)}
        className="w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main rounded-md outline-none py-4 px-12 bg-transparent"
      />
      {usersSearch && usersSearch[0] !== null && (
        <div
          onClick={() => dispatch(handleResultUsersSearch(undefined))}
          className="text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong z-50 w-[403px] rounded-md absolute -bottom-10"
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
      <Menu>
        <Menu.Button
          title="Filter"
          className="right-3 cursor-pointer absolute text-dusk-main dark:text-dawn-main text-2xl"
        >
          <i className="ri-equalizer-line" />
        </Menu.Button>
        <Menu.Items className="transition-all duration-200 hover:brightness-125 drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20  absolute rounded-md p-1 z-20 flex flex-col text-dusk-main dark:text-dawn-main bg-white dark:bg-fill-strong -right-4 -bottom-14">
          <Menu.Item>
            <a className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
              Manga
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className="hover:bg-prime-blue rounded-sm transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer">
              User
            </a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}
