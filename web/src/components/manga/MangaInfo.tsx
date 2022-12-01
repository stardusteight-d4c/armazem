import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
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
import { error, success } from '../../components/Toasters'
import { handleOpenModal } from '../../store'
import { Review } from './integrate/Review'

interface Props {}

export const MangaInfo = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const { id: uid } = useParams()
  const [manga, setManga] = useState<Manga>()
  const [avarageScore, setAvarageScore] = useState<any>()
  const currentAccount = useAppSelector<Account>(
    (state) => state.armazem.currentAccount
  )
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [reviews, setReviews] = useState([])

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
          // setRecMangas(data.mangas)
        }
      })()
    }
  }, [uid, manga])

  useEffect(() => {
    // setLoading(true)
    if (currentAccount.mangaList) {
      const listed = currentAccount.mangaList.find((o) => o.mangaUid === uid)
      if (listed) {
        averageScore()
        setTimeout(() => {
          // setLoading(false)
        }, 200)
      } else {
        setTimeout(() => {
          // setLoading(false)
        }, 200)
      }
    }
  }, [currentAccount, manga])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByUid}/${uid}`)
      if (data.status === true) {
        setManga(data.manga)
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
      <div className=" px-2 md:px-0">
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
          {reviews?.map((review: any, index) => (
            <Review review={review} key={index} />
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
