import { Menu } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, CardManga, Favorites, Navbar, Sidebar } from '..'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
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
} from '../../services/api-routes'
import { Loader } from '../Loader'
import { error, success } from '../Toasters'
import { Dropdown } from '../Dropdown'
import { handleOpenModal } from '../../store'
import { Review } from './Review'
import { MangaMetaInfos } from './MangaMetaInfos'

interface Props {}

export const MangaStatus = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const { id: uid } = useParams()
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [recommendationWidth, setRecommendationWidth] = useState(0)
  const [onDragRecommendations, setOnDragRecommendations] = useState(0)
  const [manga, setManga] = useState<Manga>()
  const [loading, setLoading] = useState<boolean>(true)
  const [addToMyList, setaddToMyList] = useState<boolean>(false)
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

  function handleValidation() {
    if (status !== 'Plan to Read') {
      if (status === null) {
        error('Enter a valid status')
        return false
      } else if (
        !Number.isInteger(Number(listInfos.chapRead)) ||
        !Number.isInteger(Number(listInfos.score))
      ) {
        error('Only numbers must be entered')
        return false
      } else if (
        (manga?.chapters !== '???' && listInfos.chapRead > manga!.chapters) ||
        listInfos.chapRead < 0
      ) {
        error('Chapters read out of bounds')
        return false
      } else if (listInfos.score > 10 || listInfos.score < 0) {
        error('The score must be between 0 and 10')
        return false
      } else if (listInfos.chapRead === '' || listInfos.score === '') {
        error('The number cannot be null')
        return false
      } else if (
        mangaListed &&
        mangaListed.chapRead === listInfos.chapRead &&
        mangaListed.score === listInfos.score &&
        mangaListed.status === status
      ) {
        error('No changes')
        return false
      }
    }
    return true
  }

  const handleFavorites = async () => {
    if (currentAccount.favorites.length < 10) {
      if (!favorited) {
        const { data } = await axios.post(addMangaToFavorites, {
          accountId: currentAccount._id,
          mangaId: manga?._id,
        })
        if (data.status === true) {
          success(data.msg)
        }
      }
    } else {
      error('10 favorites have already been added')
    }

    if (favorited) {
      const { data } = await axios.post(removeMangaToFavorites, {
        accountId: currentAccount._id,
        mangaId: manga?._id,
      })
      if (data.status === true) {
        success(data.msg)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListInfos({
      ...listInfos,
      [event.target.id]: event.target.value,
    })
  }

  const handleRemove = async () => {
    const { data } = await axios.post(removeMangaToListed, {
      accountId: currentAccount._id,
      mangaUid: manga?.uid,
    })
    if (data.status === true) {
      success(data.msg)
    }
  }

  const chooseStatus = [
    manga?.chapters !== '???' && {
      item: 'Completed',
      function: () => setStatus('Completed'),
    },
    {
      item: 'Reading',
      function: () => setStatus('Reading'),
    },
    {
      item: 'Plan to Read',
      function: () => setStatus('Plan to Read'),
    },
  ]

  const removeFromListed = [
    {
      item: 'Remove',
      function: handleRemove,
    },
    {
      item: 'Cancel',
    },
  ]

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (status === 'Completed') {
      setListInfos({ ...listInfos, chapRead: manga?.chapters })
    }
    if (handleValidation()) {
      if (status === 'Plan to Read') {
        const listData = {
          mangaUid: manga!.uid,
          status,
          date: new Date(),
        }
        setListInfos({})
        const { data } = await axios.post(addMangaToListed, {
          accountId: currentAccount._id,
          data: listData,
        })
        if (data.status === true) {
          success(data.msg)
        }
      } else {
        const listData = {
          mangaUid: manga!.uid,
          ...listInfos,
          status,
          date: new Date(),
        }
        const { data } = await axios.post(addMangaToListed, {
          accountId: currentAccount._id,
          data: listData,
        })
        if (data.status === true) {
          success(data.msg)
        }
      }
    }
  }

  function renderStatus() {
    if (status === null) {
      return <span className="text-red">Undefined</span>
    } else {
      return (
        <span
          className={`${
            (status === 'Completed' && 'text-prime-blue') ||
            (status === 'Reading' && 'text-green') ||
            (status === 'Plan to Read' && 'text-dusk-main')
          }`}
        >
          {status}
        </span>
      )
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
    <div className="w-fit mt-4 md:mt-0 mr-auto ml-3 md:ml-0 md:mr-0  md:w-full ">
      <div className="md:max-w-[225px] flex items-center gap-x-2">
        {mangaListed && mangaListed.status !== 'Plan to Read' ? (
          <div
            title="Listed"
            className="ri-bookmark-fill text-prime-blue cursor-pointer"
          />
        ) : (
          <div title="Not listed" className="ri-bookmark-line cursor-pointer" />
        )}
        {mangaListed && mangaListed.status !== 'Plan to Read' && (
          <>
            {favorited ? (
              <div
                onClick={handleFavorites}
                title="Remove to favorites"
                className="ri-star-fill text-prime-purple cursor-pointer"
              />
            ) : (
              <>
                {currentAccount.favorites.length < 10 ? (
                  <div
                    onClick={handleFavorites}
                    title="Add to favorites"
                    className="ri-star-line cursor-pointer"
                  />
                ) : (
                  <div
                    onClick={handleFavorites}
                    title="Maximum limit reached"
                    className="ri-star-fill text-dusk-weak cursor-pointer"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      {mangaListed || addToMyList ? (
        <form onSubmit={handleSubmit}>
          {mangaListed ? (
            <h3 className="text-xl font-medium mt-2">Edit status</h3>
          ) : (
            <span
              onClick={() => setaddToMyList(false)}
              className="text-sm hover:underline font-medium cursor-pointer text-red"
            >
              Cancel
            </span>
          )}
          <div className="flex flex-col gap-y-1 border-t-4 border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
            <div className="flex justify-between text-base">
              <span>Status:</span>
              <Dropdown
                space="space-y-6"
                title="Choose status"
                items={chooseStatus}
              >
                {renderStatus()}
              </Dropdown>
            </div>
            {status !== 'Plan to Read' && (
              <>
                <div className="flex justify-between text-base">
                  <span className="mr-1 md:mr-0">Chap. Read:</span>
                  <div className="flex items-center gap-x-1">
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      id="chapRead"
                      value={
                        status === 'Completed'
                          ? manga?.chapters
                          : listInfos.chapRead
                      }
                      placeholder="???"
                      maxLength={4}
                      className="w-[50px] h-[18px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center outline-none bg-transparent rounded-sm border border-prime-blue/50"
                    />
                    <span>/</span>
                    {manga?.chapters}
                  </div>
                </div>
                <div className="flex justify-between text-base">
                  <span>Your Score:</span>
                  <div className="flex items-center gap-x-1">
                    <input
                      type="text"
                      id="score"
                      onChange={(e) => handleChange(e)}
                      maxLength={2}
                      placeholder={listInfos.score ? listInfos.score : '???'}
                      className="w-[50px] h-[18px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center outline-none bg-transparent rounded-sm border border-prime-blue/50"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-x-2">
              <Button
                title="Submit"
                type="submit"
                className="bg-prime-blue mt-1 !rounded-sm !px-2 !py-1"
              />
              {mangaListed && (
                <Dropdown
                  title="Remove from list"
                  position="-bottom-[68px]"
                  items={removeFromListed}
                >
                  <Button
                    title="Remove"
                    type="button"
                    className="bg-red mt-1 !rounded-sm !px-2 !py-1"
                  />
                </Dropdown>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="w-[180px] flex items-center gap-x-2">
          <span
            onClick={() => setaddToMyList(true)}
            className="text-sm hover:underline font-medium cursor-pointer text-prime-blue"
          >
            Add to my list
          </span>
        </div>
      )}
      <div className="hidden md:inline-block w-full">
        <MangaMetaInfos manga={manga} />
      </div>
    </div>
  )
}
