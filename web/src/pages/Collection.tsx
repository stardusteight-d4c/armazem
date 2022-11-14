import { Menu } from '@headlessui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navbar, Sidebar } from '../components'
import { Card } from '../components/collection/Card'
import { Loader } from '../components/Loader'
import {
  mangaByGenre,
  mangaByGenreAndTitle,
  mangaByPagination,
  searchByTitle,
} from '../services/api-routes'
import { useAppSelector } from '../store/hooks'
import { genresFilter } from '../utils/genres'

interface Props {}

export const Collection = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [mangas, setMangas] = useState<[Manga] | any>()
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')
  const [filterValue, setFilterValue] = useState<string>('All')
  const [all, setAll] = useState<boolean>(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [page, setPage] = useState(1)

  // const handleScroll = () => {
  //   const position = window.pageYOffset
  //   setScrollPosition(position)
  // }

  useEffect(() => {
    window.onscroll = function () {
      console.log('document.body.offsetHeight',  Math.ceil(document.body.offsetHeight))
      console.log(
        'window.innerHeight + window.scrollY',
       Math.ceil(window.innerHeight + window.scrollY)
      )

      if (Math.ceil(window.innerHeight + window.scrollY) >= Math.ceil(document.body.offsetHeight)) {
        // window is scrolled to bottom
        console.log('TEEEEEEEEEEEEEEEEEEEEEEEEEI');
        
        setPage(page => page + 1)
      }
    }
  }, [])
  console.log(mangas)

  useEffect(() => {
    if (all && term === '') {
      ;(async () => {
        const { data } = await axios.get(`${mangaByPagination}/${page}`)
        if (data.status === true && page === 1) {
          setMangas(data.mangas)
        } else if (data.status === true && page > 1) {
          setMangas([
            ...(mangas !== undefined ? mangas : []),
            ...(data.mangas !== undefined ? data.mangas : []),
          ])
        }
        setLoading(false)
      })()
    } else if (filterValue === 'All') {
      search(term)
    }
  }, [all, term, page])

console.log(page);


  useEffect(() => {
    if (filterValue !== 'All' && term !== '') {
      ;(async () => {
        const { data } = await axios.get(
          `${mangaByGenreAndTitle}/${filterValue}/${term}`
        )
        setMangas(data.mangas)
        setLoading(false)
      })()
    } else if (filterValue !== 'All') {
      ;(async () => {
        const { data } = await axios.get(`${mangaByGenre}/${filterValue}`)
        setMangas(data.mangas)
        setLoading(false)
      })()
    }
  }, [term])

  useEffect(() => {
    if (filterValue !== 'All') {
      setLoading(true)
      setAll(false)
      ;(async () => {
        const { data } = await axios.get(`${mangaByGenre}/${filterValue}`)
        setMangas(data.mangas)
        setLoading(false)
      })()
    } else {
      setAll(true)
    }
  }, [filterValue])

  const search = async (query: string) => {
    const { data } = await axios.post(searchByTitle, {
      query,
    })
    setMangas(data.mangas)
  }

  console.log('term', term)

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    setTerm(eventValue)
  }

  // Fazer infinite scroll, -> scrollbar chega no limite da página, gera um novo token de paginação 1 -> 2,
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
          <div>
            <Menu>
              <div className="flex flex-col space-y-10">
                <Menu.Button>
                  <div className="rounded-sm hover:brightness-125 transition duration-300 cursor-pointer text-lg font-semibold px-4 py-[2px] text-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20">
                    {filterValue}
                  </div>
                </Menu.Button>
                <Menu.Items className="shadow-2xl h-52 overflow-hidden overflow-y-scroll border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong">
                  {genresFilter.map((genre, index) => (
                    <Menu.Item key={index}>
                      <span
                        onClick={() => setFilterValue(genre)}
                        className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                      >
                        {genre}
                      </span>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </div>
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
                {mangas?.map((manga: Manga) => (
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
