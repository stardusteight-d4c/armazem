import { Menu } from '@headlessui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navbar, Sidebar } from '../components'
import { Card } from '../components/collection/Card'
import { Loader } from '../components/Loader'
import { mangaByPagination, searchByTitle } from '../services/api-routes'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const Collection = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [mangas, setMangas] = useState<[Manga]>()
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')


  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByPagination}/1`)
      setMangas(data.mangas)
      setLoading(false)
    })()
  }, [])

  const search = async (query: string) => {
    const { data } = await axios.post(searchByTitle, {
      query,
    })
    setMangas(data.mangas)
  }

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    setTerm(eventValue)
    if (term) {
      search(term)
    }
  }


  // Fazer infinite scroll, -> scrolbar chega no limite da página, gera um novo token de paginação 1 -> 2,
  // função no useEffect com o token como dependência -> fazer nova requisição -> pegar novos dados e icrementar no array
  // array.length <= 150 -> e atinge limite

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
        <div className="flex gap-x-2 px-4 py-1 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20">
          <input
            type="text"
            onChange={(e) => handleSearchTerm(e)}
            placeholder="Search by title"
            className="p-1 outline-none focus:ring-1 focus:ring-prime-blue rounded-sm bg-transparent border border-dawn-weak/20 dark:border-dusk-weak/20"
          />
          <div className="relative">
            <Menu>
              <Menu.Button>
                <div className="rounded-sm hover:brightness-125 transition duration-300 cursor-pointer text-lg font-semibold px-4 py-[2px] text-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20">
                  All
                </div>
              </Menu.Button>
              <Menu.Items className="shadow-2xl border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[6px] -bottom-[100px]">
                <Menu.Item>
                  <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                    Action
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                    Sci-fi
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                    Horror
                  </span>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <main>
          <div
            className={`${
              minimizeSidebar ? 'grid-cols-5' : 'grid-cols-4'
            } pb-14 grid p-4 gap-4 w-full`}
          >
            {!loading ? (
              <>
                {mangas?.map((manga) => (
                  <Card manga={manga} />
                ))}
              </>
            ) : (
              <div className="w-full col-span-5 h-screen -mt-28 flex items-center justify-center">
                <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
              </div>
            )}
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
