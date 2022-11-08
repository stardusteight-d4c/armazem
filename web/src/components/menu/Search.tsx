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
      <i className="ri-search-line left-2 absolute text-dusk-main dark:text-dawn-main text-3xl" />
      <input
        type="text"
        placeholder="Search by manga or user"
        onChange={(e) => handleSearchTerm(e)}
        className="w-full h-full border border-dawn-weak/20 dark:border-dusk-weak/20 placeholder:text-dusk-main dark:placeholder:text-dawn-main outline-none py-4 px-12 bg-transparent"
      />
      {usersSearch && usersSearch[0] !== null && (
        <div
          onClick={() => dispatch(handleResultUsersSearch(undefined))}
          className="text-dusk-main drop-shadow-xl border border-dawn-weak/20 dark:border-dusk-weak/20 dark:text-dawn-main bg-fill-weak dark:bg-fill-strong z-50 min-w-[337px] max-w-[403px] absolute -bottom-10"
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
          className="right-3 mt-[4px] cursor-pointer absolute text-dusk-main dark:text-dawn-main text-2xl"
        >
          <i className="ri-equalizer-line" />
        </Menu.Button>
        <Menu.Items className="drop-shadow-2xl z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[14px] -bottom-[50px]">
          <Menu.Item>
            <a className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
              Manga
            </a>
          </Menu.Item>
          <Menu.Item>
            <a className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
              User
            </a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}
