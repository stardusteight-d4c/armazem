import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { mangaByUid, reviewsByPagination } from '../../services/api-routes'
import { handleOpenModal } from '../../store'
import { Review } from './integrate/Review'

interface Props {}

export const MangaInfo = (props: Props) => {
  const { id: uid } = useParams()
  const [showMore, setShowMore] = useState(false)
  const [manga, setManga] = useState<Manga>()
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${reviewsByPagination}/${uid}/${page}`)
        .then(({ data }) => setReviews(data.reviews))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [uid, page])

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${mangaByUid}/${uid}`)
        .then(({ data }) => setManga(data.manga))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [uid])

  function averageScore() {
    if (manga?.score && manga.score.length > 0) {
      const scoreArr: Number[] = []
      manga?.score.map((score) => scoreArr.push(score.score))
      const sum = scoreArr.reduce(
        (accumulator, score) => Number(accumulator) + Number(score)
      )
      return Number(sum) / Number(scoreArr.length)
    }
  }

  const rendersSynopsis = () => (
    <>
      <div className={style.synopsisTitle}>Synopsis</div>
      <div className={style.synopsisContainer}>
        <p className={`${!showMore && 'line-clamp-4'} ${style.synopsis}`}>
          {manga?.synopsis}
        </p>
        <div>
          {!showMore ? (
            <span onClick={() => setShowMore(true)} className={style.show}>
              Show more
            </span>
          ) : (
            <span onClick={() => setShowMore(false)} className={style.show}>
              Show less
            </span>
          )}
        </div>
      </div>
    </>
  )

  const rendersReviews = () => (
    <>
      <div className={style.reviewsContainer}>
        <span>Reviews</span>
        <div className={style.reviewHeader}>
          <span
            onClick={() => dispatch(handleOpenModal('AddReview'))}
            className={style.reviewPagination}
          >
            Add review
          </span>
          {reviews.length > 0 && page === 1 && (
            <>
              <span>•</span>
              <span
                onClick={() => setPage((page) => page + 1)}
                className={style.reviewPagination}
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
                className={style.reviewPagination}
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
        <span className={style.spanNoReview}>No reviews yet</span>
      )}
      {reviews.length === 0 && page !== 1 && (
        <span className={style.spanNoReview}>End of results</span>
      )}
    </>
  )

  return (
    <div className={style.wrapper}>
      <div className={style.scoreContainer}>
        <div className={style.spanContainer}>
          <i className={style.starIcon} />
          <span>Score</span>
        </div>
        <span className={style.counter}>
          {averageScore() || 'No scores yet'}
        </span>
      </div>
      <div className={style.readersContainer}>
        <div className={style.spanContainer}>
          <i className={style.bookIcon} />
          <span>Readers</span>
        </div>
        <span className={style.counter}>{manga?.readers.length}</span>
      </div>
      {rendersSynopsis()}
      {rendersReviews()}
    </div>
  )
}

const style = {
  wrapper: `w-full md:pl-4 cursor-default`,
  scoreContainer: `text-base px-2 md:px-0 flex items-center justify-between w-full border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2 font-medium`,
  spanContainer: `flex items-center gap-x-2`,
  starIcon: `ri-star-s-fill`,
  readersContainer: `text-base px-2 md:px-0 flex items-center justify-between w-full border-y border-y-dawn-weak/20 dark:border-y-dusk-weak/20 py-2 font-medium`,
  bookIcon: `ri-book-3-fill`,
  counter: `text-xl font-semibold`,
  synopsisTitle: `text-base px-2 md:px-0 flex items-center justify-between w-full py-2 font-medium`,
  synopsisContainer: `px-2 md:px-0`,
  synopsis: `cursor-default break-words break-all whitespace-pre-wrap font-medium`,
  show: `font-semibold hover:underline cursor-pointer text-prime-blue`,
  reviewsContainer: `text-base px-2 md:px-0 border-t border-t-dawn-weak/20 dark:border-t-dusk-weak/20 mt-2 flex items-center justify-between w-full py-2 font-medium`,
  reviewHeader: `space-x-2`,
  reviewPagination: `text-sm hover:underline cursor-pointer text-prime-blue`,
  spanNoReview: `flex items-center justify-center text-3xl my-14`,
}
