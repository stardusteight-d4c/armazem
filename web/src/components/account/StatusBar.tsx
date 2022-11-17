import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { mangaByUid, mangaListedByAccountId } from '../../services/api-routes'
import { Loader } from '../Loader'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import Item from '../mylist/Item'
import { StatusItems } from './StatusItems'

interface Props {
  userMetadata: User
}

let bar_width = '21.15%'

const variants = {
  initial: {
    width: 0,
  },
  animate: {
    width: bar_width,
    transition: {
      duration: 0.4,
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
}

export const StatusBar = ({}: Props) => {
  const [listed, setListed] = useState<any>([])
  const [reading, setReading] = useState<any>()
  const [completed, setCompleted] = useState<any>()
  const [planToRead, setPlanToRead] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any>([])
  const [itemData, setItemData] = useState<any>([])
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  // Puxar do backend a mangalist de userMetadata e filtrar -> realizando a regra de 3,
  // ao clicar abrir modal exibindo a lista

  useEffect(() => {
    if (userMetadata) {
      ;(async () => {
        const { data } = await axios.get(
          `${mangaListedByAccountId}/${userMetadata?.account}`
        )
        if (data.status === true) {
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
        }
      })()
    }
  }, [userMetadata])

  // get percent
  function ruleOfThree(statusLength: number) {
    const total = listed.length
    const x = (statusLength * 100) / total
    return Number(x.toFixed(2))
  }

  const readingPercentage = reading && ruleOfThree(reading.length)
  const completedPercentage = completed && ruleOfThree(completed.length)
  const planToReadPercentage = planToRead && ruleOfThree(planToRead.length)

  if (loading) {
    return (
      <div className="w-full col-span-5 h-[100px] mt-10 flex items-center justify-center">
        <Loader className="border-black dark:border-white !w-8 !h-8 !border-[2px]" />
      </div>
    )
  }

  console.log(items)

  return (
    <section className="mt-16 py-5">
      <div className="flex items-center text-lg font-semibold">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-7">
            <div className="flex justify-between gap-x-2 items-center cursor-pointer">
              {/* clicar e abrir modal */}
              <span className="text-green">Reading</span>
              <span>{reading.length}</span>
            </div>
            <div className="flex flex-grow-1 justify-between items-center gap-x-2 cursor-pointer">
              <span className="text-prime-blue">Completed</span>
              <span>{completed.length}</span>
            </div>
            <div className="flex justify-between  items-center gap-x-2 cursor-pointer">
              <span className="text-dusk-weak">Plan to Read</span>
              <span>{planToRead.length}</span>
            </div>
          </div>
          <div>Total {listed.length}</div>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-dusk-weak/10 overflow-hidden cursor-pointer rounded-full flex h-4  w-[100%] relative">
          <div
            onClick={() => setItems(reading)}
            style={{ width: readingPercentage + '%' }}
            title={`${readingPercentage}%`}
            className="h-full text-layer-heavy flex items-center justify-center font-semibold bg-green"
          />
          <div
            onClick={() => setItems(completed)}
            style={{ width: completedPercentage + '%' }}
            title={`${completedPercentage}%`}
            className="h-full text-layer-heavy flex items-center justify-center bg-prime-blue"
          />
          <div
            onClick={() => setItems(planToRead)}
            style={{ width: planToReadPercentage + '%' }}
            title={`${planToReadPercentage}%`}
            className="h-full text-layer-heavy flex items-center justify-center bg-dusk-weak"
          />
        </div>
      </div>

      <div>
        {items.map((item: any) => (
          <div>
            <StatusItems item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
