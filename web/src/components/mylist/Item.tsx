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
      console.log('item ex', item)
      const { data } = await axios.get(`${mangaByUid}/${item.mangaUid}`)
      setItemData(data.manga)
    })()
  }, [item])

  return (
    <div className="p-4  border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20  justify-between flex items-center">
      <div className="flex items-center">
        <Link
          to={`/manga/${item.mangaUid}`}
          className="text-2xl cursor-pointer hover:underline font-bold min-w-[300px] max-w-[300px] truncate px-4"
        >
          {itemData?.title}
        </Link>
      </div>
      <div className="flex items-center">
        <div
          className={`min-w-[200px] text-center max-w-[200px] px-4 text-xl font-base ${
            itemData?.status === 'Finished' ? 'text-prime-blue' : 'text-green'
          }`}
        >
          {itemData?.status}
        </div>
        <div className="min-w-[200px] text-center max-w-[200px] px-4 text-xl font-semibold">
          {item.score}
        </div>
        <div className="min-w-[200px] text-center max-w-[200px] px-4 text-xl font-semibold">
          {item.chapRead}
        </div>
      </div>
    </div>
  )
}

export default memo(Item)
