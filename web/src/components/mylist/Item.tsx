import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mangaByUid } from '../../services/api-routes'

interface Props {
  item: Listed | any
}

const Item = ({ item }: Props) => {
  const [itemData, setItemData] = useState<Listed>()

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${mangaByUid}/${item.mangaUid}`)
        .then(({ data }) => setItemData(data.manga))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [item])

  if (!itemData && !item) {
    return <></>
  }

  return (
    <div className={style.wrapper}>
      <div className={style.titleContainer}>
        <Link title={itemData?.title} to={`/manga/${item.mangaUid}`} className={style.title}>
          {itemData?.title}
        </Link>
      </div>
      <div className={style.metaInfosContainer}>
        <div
          className={`${style.status} ${
            itemData?.status === 'Finished' ? 'text-prime-blue' : 'text-green'
          }`}
        >
          {itemData?.status}
        </div>
        <div className={style.score}>{item.score}</div>
        <div className={style.chapRead}>{item.chapRead}</div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `py-4 md:p-4 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20 justify-between flex items-center`,
  titleContainer: `flex items-center`,
  title: `text-sm md:text-2xl cursor-pointer hover:underline font-bold max-w-[180px] xsm:max-w-[220px] md:min-w-[300px] md:max-w-[300px] truncate px-4`,
  metaInfosContainer: `flex items-center`,
  status: `min-w-[115px] max-w-[115px] md:min-w-[200px] md:max-w-[200px] text-center px-4 md:text-xl font-base`,
  score: `hidden md:inline-block min-w-[200px] max-w-[200px] text-center px-4 text-xl font-semibold`,
  chapRead: `min-w-[80px] max-w-[80px] md:min-w-[200px] md:max-w-[200px] text-center md:px-4 md:text-xl font-semibold`,
}

export default memo(Item)
