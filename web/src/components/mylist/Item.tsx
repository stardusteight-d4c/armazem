import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mangaByUid } from '../../services/api-routes'
import { Loader } from '../Loader'

interface Props {
  item: any
}

const Item = ({ item }: Props) => {
  const [itemData, setItemData] = useState<Manga | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByUid}/${item.mangaUid}`)
      setItemData(data.manga)
    })()
  }, [item])

  return (
    <div className="py-4 md:p-4  border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20  justify-between flex items-center">
      <div className="flex items-center">
        <Link
          to={`/manga/${item.mangaUid}`}
          className="text-sm md:text-2xl cursor-pointer hover:underline font-bold  max-w-[180px] xsm:max-w-[220px] md:min-w-[300px] md:max-w-[300px] truncate px-4"
        >
          {itemData?.title}
        </Link>
      </div>
      <div className="flex items-center">
        <div
          className={`min-w-[115px] max-w-[115px] md:min-w-[200px] md:max-w-[200px] text-center px-4 md:text-xl font-base ${
            itemData?.status === 'Finished' ? 'text-prime-blue' : 'text-green'
          }`}
        >
          {itemData?.status}
        </div>
        <div className="hidden md:inline-block min-w-[200px] max-w-[200px] text-center px-4 text-xl font-semibold">
          {item.score}
        </div>
        <div className="min-w-[80px] max-w-[80px] md:min-w-[200px] md:max-w-[200px] text-center md:px-4 md:text-xl font-semibold">
          {item.chapRead}
        </div>
      </div>
    </div>
  )
}

export default memo(Item)
