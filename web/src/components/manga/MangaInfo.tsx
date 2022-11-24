import { Menu } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, CardManga, Favorites, Navbar, Sidebar } from '../../components'
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
import { Loader } from '../../components/Loader'
import { error, success } from '../../components/Toasters'
import { Dropdown } from '../../components/Dropdown'
import { handleOpenModal } from '../../store'
import { Review } from '../../components/manga/Review'
import { MangaStatus } from '../../components/manga/MangaStatus'

interface Props {}

export const MangaInfo = (props: Props) => {
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
    console.log('eeeee')

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
      console.log('iiii')

      const { data } = await axios.post(removeMangaToFavorites, {
        accountId: currentAccount._id,
        mangaId: manga?._id,
      })
      if (data.status === true) {
        success(data.msg)
      }
    }
  }

  console.log(favorited)

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
    <div className="w-full md:pl-4 cursor-default">
      <div className="text-base px-2 md:px-0 flex items-center justify-between w-full border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2 font-medium">
        <div className="flex items-center gap-x-2">
          <i className="ri-star-s-fill" /> Score
        </div>
        <span className="text-xl font-semibold">
          {avarageScore ? avarageScore : 'No scores yet'}
        </span>
      </div>
      <div className="text-base px-2 md:px-0 flex items-center justify-between w-full border-y border-y-dawn-weak/20 dark:border-y-dusk-weak/20 py-2 font-medium">
        <div className="flex items-center gap-x-2">
          <i className="ri-book-3-fill" /> Readers
        </div>
        <span className="text-xl font-semibold">{manga?.readers.length}</span>
      </div>
      <div className="text-base px-2 md:px-0 flex items-center justify-between w-full py-2 font-medium">
        Synopsis
      </div>
      <div className=' px-2 md:px-0'>
        <p
          className={`${
            showMore ? '' : 'line-clamp-4'
          }  cursor-default break-words break-all whitespace-pre-wrap font-medium`}
        > 
          {manga?.synopsis}
        </p>
        <div>
          {!showMore ? (
            <span
              onClick={() => setShowMore(!showMore)}
              className="font-semibold hover:underline cursor-pointer text-prime-blue"
            >
              Show more
            </span>
          ) : (
            <span
              onClick={() => setShowMore(!showMore)}
              className="font-semibold hover:underline cursor-pointer text-prime-blue"
            >
              Show less
            </span>
          )}
        </div>
      </div>
      <div className="text-base  px-2 md:px-0 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 mt-2 flex items-center justify-between w-full py-2 font-medium">
        <span>Reviews</span>
        <div className="space-x-2">
          <span
            onClick={() => dispatch(handleOpenModal('AddReview'))}
            className="text-sm hover:underline cursor-pointer text-prime-blue"
          >
            Add review
          </span>
          {reviews.length > 0 && page === 1 && (
            <>
              <span>•</span>
              <span
                onClick={() => setPage((page) => page + 1)}
                className="text-sm hover:underline cursor-pointer text-prime-blue"
              >
                More reviews
              </span>
            </>
          )}
          {page !== 1 && (
            <>
              <span>•</span>
              <span
                onClick={() => setPage((page) => page - 1)}
                className="text-sm hover:underline cursor-pointer text-prime-blue"
              >
                Return
              </span>
            </>
          )}
        </div>
      </div>
      {reviews.length > 0 && (
        <>
          {reviews?.map((review: any) => (
            <Review review={review} />
          ))}
        </>
      )}
      {reviews.length === 0 && page === 1 && (
        <div className="flex items-center justify-center text-3xl my-14">
          No reviews yet
        </div>
      )}
      {reviews.length === 0 && page !== 1 && (
        <div className="flex items-center justify-center text-3xl my-14">
          End of results
        </div>
      )}
    </div>
  )
}
