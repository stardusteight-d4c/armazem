import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mangaByUid } from '../../services/api-routes'
import { motion } from 'framer-motion'

interface Props {
  item: any
}

export const StatusItems = ({ item }: Props) => {
  const [itemData, setItemData] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByUid}/${item.mangaUid}`)
      setItemData(data.manga)
    })()
  }, [item])

  return (
    <div
      className="flex items-center transition-all duration-300 border-b border-b-transparent hover:border-b-white/50 cursor-pointer justify-between"
    >
      <h3 className="text-lg font-semibold">
        {itemData?.title}
      </h3>
      {item.status !== 'Plan to Read' && (
        <span className="font-medium">Chap. Read: {item.chapRead}</span>
      )}
    </div>
  )
}
