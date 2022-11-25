import { Menu } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, CardManga, Favorites, Navbar, Sidebar } from '../components'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  addMangaToFavorites,
  addMangaToListed,
  mangaByUid,
  randomMangasByGenre,
  removeMangaToFavorites,
  removeMangaToListed,
  reviewsByPagination,
} from '../services/api-routes'
import { Loader } from '../components/Loader'
import { error, success } from '../components/Toasters'
import { Dropdown } from '../components/Dropdown'
import { handleOpenModal } from '../store'
import { Review } from '../components/manga/Review'
import { MangaStatus } from '../components/manga/MangaStatus'
import { MangaInfo } from '../components/manga/MangaInfo'
import { MangaMetaInfos } from '../components/manga/MangaMetaInfos'
import { MobileSearch } from '../components/menu/MobileSearch'
import { MobileNav } from '../components/menu'

interface Props {}

export const Manga = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const { id: uid } = useParams()
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [recommendationWidth, setRecommendationWidth] = useState(0)
  const [onDragRecommendations, setOnDragRecommendations] = useState(0)
  const [manga, setManga] = useState<Manga>()
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState<string | null>(null)
  const [listInfos, setListInfos] = useState<any>({})
  const [mangaListed, setMangaListed] = useState<any>(null)
  const [avarageScore, setAvarageScore] = useState<any>()
  const [recMangas, setRecMangas] = useState<any>([])
  const currentAccount = useAppSelector<Account>(
    (state) => state.armazem.currentAccount
  )
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [reviews, setReviews] = useState([])
  const [favorited, setFavorited] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${reviewsByPagination}/${uid}/${page}`)
      if (data.status === true) {
        setReviews(data.reviews)
      }
    })()
  }, [uid, page])

  useEffect(() => {
    if (manga) {
      const randomGenreFromManga =
        manga?.genres[Math.floor(Math.random() * manga?.genres.length)]
      ;(async () => {
        const { data } = await axios.get(
          `${randomMangasByGenre}/${randomGenreFromManga}`
        )
        if (data.status === true) {
          setRecMangas(data.mangas)
        }
      })()
    }
  }, [uid, manga])

  useEffect(() => {
    setLoading(true)
    if (currentAccount.mangaList) {
      const listed = currentAccount.mangaList.find((o) => o.mangaUid === uid)
      if (listed) {
        setMangaListed(listed)
        setStatus(listed.status)
        setListInfos({ chapRead: listed.chapRead, score: listed.score })
        averageScore()
        setTimeout(() => {
          setLoading(false)
        }, 200)
      } else {
        setMangaListed(null)
        setTimeout(() => {
          setLoading(false)
        }, 200)
      }
    }
  }, [currentAccount, manga])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByUid}/${uid}`)
      if (data.status === true) {
        setManga(data.manga)
        setFavorited(currentAccount.favorites.includes(data.manga._id))
      }
    })()
  }, [uid])

  function averageScore() {
    if (manga?.score && manga.score.length > 0) {
      const scoreArr: Number[] = []
      manga?.score.map((score) => scoreArr.push(score.score))
      const sum = scoreArr.reduce(
        (accumulator, score) => Number(accumulator) + Number(score)
      )
      const avarage = Number(sum) / Number(scoreArr.length)
      setAvarageScore(avarage)
    }
  }

  // CAROUSEL FRAMER MOTION
  const recommendationsCarrousel =
    useRef() as React.MutableRefObject<HTMLInputElement>
  useEffect(() => {
    recommendationsCarrousel.current &&
      setRecommendationWidth(
        recommendationsCarrousel.current.scrollWidth -
          recommendationsCarrousel.current.offsetWidth
      )
  }, [onDragRecommendations])

  return (
    <div
      className={`${style.gridContainer} ${
        minimizeSidebar
          ? 'grid-cols-1 md:grid-cols-18'
          : 'grid-cols-1 md:grid-cols-5'
      }`}
    >
      <Sidebar />
      <div
        className={`${style.mainContent} ${
          minimizeSidebar
            ? 'col-span-1 md:col-span-17'
            : 'col-span-1 md:col-span-4'
        }`}
      >
        <Navbar />
        <MobileSearch />
        <MobileNav />
        <main className="w-screen md:w-full">
          {!loading ? (
            <>
              <div className="py-2 cursor-default px-2 md:px-4 flex items-center justify-between bg-prime-blue text-fill-weak text-2xl font-semibold">
                <span className='w-full md:w-[80%]'>{manga?.title}</span>
                <span className="text-xl hidden md:inline-block font-medium">{manga?.author}</span>
              </div>
              <div className="pb-24 md:p-4 md:pb-14">
                <div className="flex">
                  <div className="w-full max-w-[170px] md:max-w-[225px]">
                    <img
                      src={manga?.cover}
                      className="w-full h-full max-w-[170px] max-h-[225px] md:max-w-[225px] md:max-h-[300px]"
                    />
                    <div className="hidden md:inline-block w-full">
                      <MangaStatus />
                    </div>
                    <div className="md:hidden inline-block w-screen">
                      <MangaInfo />
                    </div>
                  </div>
                  <div className="hidden md:inline-block w-full">
                    <MangaInfo />
                  </div>
                  <div className="md:hidden inline-block w-full h-fit">
                    <MangaStatus />
                  </div>
                </div>
                <section className="px-2 md:px-0">
                  <h2 className="text-2xl pb-4 text-dusk-main dark:text-dawn-main font-bold">
                    Recommendations
                  </h2>
                  <motion.div
                    drag="x"
                    ref={recommendationsCarrousel}
                    onDrag={(_event, info) =>
                      setOnDragRecommendations(info.offset.x)
                    }
                    dragConstraints={{ right: 0, left: -recommendationWidth }}
                    className="flex items-center gap-x-5 "
                  >
                    {recMangas.map(
                      (manga: any, index: React.Key | null | undefined) => (
                        <CardManga
                          manga={manga}
                          key={index}
                          className="!min-w-[200px] !max-w-[180px] !h-[290px]"
                        />
                      )
                    )}
                  </motion.div>
                </section>
              </div>
            </>
          ) : (
            <div className="w-full col-span-5 h-screen -mt-28 flex items-center justify-center">
              <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden lg:max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
