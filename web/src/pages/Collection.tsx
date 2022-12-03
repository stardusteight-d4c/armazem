import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card } from '../components/collection/Card'
import { Dropdown } from '../components/Dropdown'
import { GridWrapper } from '../components/GridWrapper'
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
  const [mangas, setMangas] = useState<[Manga] | any>([])
  const [term, setTerm] = useState('')
  const [filterValue, setFilterValue] = useState<string>('All')
  const [all, setAll] = useState<boolean>(true)
  const [page, setPage] = useState(1)

  window.onscroll = function () {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.ceil(document.body.offsetHeight)
    ) {
      // window is scrolled to bottom
      setPage((page) => page + 1)
    }
  }

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
      })()
    } else if (filterValue === 'All') {
      search(term)
    }
  }, [all, term, page])

  useEffect(() => {
    if (filterValue !== 'All' && term !== '') {
      ;(async () => {
        const { data } = await axios.get(
          `${mangaByGenreAndTitle}/${filterValue}/${term}`
        )
        setMangas(data.mangas)
      })()
    } else if (filterValue !== 'All') {
      ;(async () => {
        const { data } = await axios.get(`${mangaByGenre}/${filterValue}`)
        setMangas(data.mangas)
      })()
    }
  }, [term])

  useEffect(() => {
    if (filterValue !== 'All') {
      setAll(false)
      ;(async () => {
        const { data } = await axios.get(`${mangaByGenre}/${filterValue}`)
        setMangas(data.mangas)
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

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    setTerm(eventValue)
    setPage(1)
  }

  const filterItems = genresFilter.map((genre) => {
    return {
      item: genre,
      function: () => setFilterValue(genre),
    }
  })

  if (!mangas) {
    return <></>
  }

  return (
    <GridWrapper>
      <div className={style.wrapperContent}>
        <input
          type="text"
          onChange={(e) => handleSearchTerm(e)}
          placeholder="Search by title"
          className={style.input}
        />
        <div>
          <Dropdown
            title="Filter"
            space="space-y-10"
            items={filterItems}
            position="!h-[225px] overflow-hidden overflow-y-scroll"
          >
            <div className={style.filter}>{filterValue}</div>
          </Dropdown>
        </div>
      </div>
      <main>
        <div
          className={`${
            minimizeSidebar ? style.largerGrid : style.minimizedGrid
          } ${style.defaultContentContainer}`}
        >
          {mangas?.map((manga: Manga, index: React.Key) => (
            <Card manga={manga} key={index} />
          ))}
        </div>
      </main>
    </GridWrapper>
  )
}

const style = {
  wrapperContent: `flex w-screen gap-x-2 px-4 py-1 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  input: `p-1 outline-none w-[60vw] md:w-fit focus:ring-1 focus:ring-prime-blue rounded-sm bg-transparent border border-dawn-weak/20 dark:border-dusk-weak/20`,
  filter: `rounded-sm truncate max-w-[110px] sm:max-w-fit hover:brightness-125 transition duration-300 cursor-pointer text-lg font-semibold px-4 py-[2px] text-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20`,
  largerGrid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`,
  minimizedGrid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`,
  defaultContentContainer: 'pb-14 grid p-4 gap-4 w-full',
}
