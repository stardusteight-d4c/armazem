import { useEffect, useState } from 'react'
import axios from 'axios'
import { mangaListedByAccountId } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'

interface Props {}

export const StatusBar = (props: Props) => {
  const [listed, setListed] = useState<[Listed] | []>([])
  const [reading, setReading] = useState<[Listed] | []>([])
  const [completed, setCompleted] = useState<[Listed] | []>([])
  const [planToRead, setPlanToRead] = useState<[Listed] | []>([])
  const [loading, setLoading] = useState(true)
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  useEffect(() => {
    if (userMetadata) {
      ;(async () => {
        await axios
          .get(`${mangaListedByAccountId}/${userMetadata?.account}`)
          .then(({ data }) => {
            setListed(data.mangas)
            setReading(
              data.mangas.filter(
                (item: { status: string }) => item.status === 'Reading'
              )
            )
            setCompleted(
              data.mangas.filter(
                (item: { status: string }) => item.status === 'Completed'
              )
            )
            setPlanToRead(
              data.mangas.filter(
                (item: { status: string }) => item.status === 'Plan to Read'
              )
            )
            setLoading(false)
          })
          .catch((error) => console.log(error.toJSON()))
      })()
    }
  }, [userMetadata])

  function ruleOfThree(statusLength: number) {
    const total = listed.length
    const x = (statusLength * 100) / total
    return Number(x.toFixed(2))
  }

  const readingPercentage = reading && ruleOfThree(reading.length)
  const completedPercentage = completed && ruleOfThree(completed.length)
  const planToReadPercentage = planToRead && ruleOfThree(planToRead.length)

  if (loading) {
    return <></>
  }

  return (
    <section className={style.wrapper}>
      <div className={style.textInfoContainer}>
        <div className={style.flexContainer}>
          <div className={style.spanContainer}>
            <span className="text-green">Reading</span>
            <span>{reading.length}</span>
          </div>
          <div className={style.spanContainer}>
            <span className="text-prime-blue">Completed</span>
            <span>{completed.length}</span>
          </div>
          <div className={style.spanContainer}>
            <span className="text-dusk-weak">Plan to Read</span>
            <span>{planToRead.length}</span>
          </div>
        </div>
        <div>Total {listed.length}</div>
      </div>

      <div className={style.graphStatusContainer}>
        <div className={style.graphStatus}>
          <div
            style={{ width: readingPercentage + '%' }}
            title={`${readingPercentage}%`}
            className={`${style.elementStatus} bg-green`}
          />
          <div
            style={{ width: completedPercentage + '%' }}
            title={`${completedPercentage}%`}
            className={`${style.elementStatus} bg-prime-blue`}
          />
          <div
            style={{ width: planToReadPercentage + '%' }}
            title={`${planToReadPercentage}%`}
            className={`${style.elementStatus} bg-dusk-weak`}
          />
        </div>
      </div>
    </section>
  )
}

const style = {
  wrapper: `py-5 mt-16 md:mt-0 cursor-default`,
  textInfoContainer: `flex  justify-between items-center text-lg font-semibold`,
  flexContainer: `flex flex-col md:flex-row gap-x-7`,
  spanContainer: `flex flex-grow-1 justify-between items-center gap-x-2`,
  graphStatusContainer: `w-full mt-2 md:mt-0`,
  graphStatus: `bg-dusk-weak font-semibold overflow-hidden rounded-full flex h-4  w-[100%] relative`,
  elementStatus: `h-full flex items-center justify-center`,
}
