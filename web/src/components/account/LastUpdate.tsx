import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mangaByUid } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
timeago.register('en_short', en_short)

interface Props {
  lastUpdate: any
}

export const LastUpdate = ({ lastUpdate }: Props) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  const [manga, setManga] = useState<Manga | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByUid}/${lastUpdate.mangaUid}`)
      setManga(data.manga)
    })()
  }, [lastUpdate])

  return (
    <div className="flex text-[#707070] dark:text-[#9B9B9B] bg-fill-weak dark:bg-fill-strong items-start gap-3">
      <img
        src={userMetadata?.user_img}
        alt=""
        className="hidden md:inline-block w-12 h-12 object-cover"
      />
      <div className="flex flex-col">
        <span className="font-medium text-xl text-dusk-main dark:text-dawn-main">
          {userMetadata?.name}
        </span>
        {lastUpdate.status === 'Reading' && (
          <div className="font-medium truncate w-[250px] md:w-[500px] -mt-1">
            <span className="text-green/90 mr-1">Reading</span>
            {lastUpdate.chapRead} of{' '}
            <Link to={`/manga/${manga?.uid}`} className="hover:underline">
              {manga?.title}
            </Link>
          </div>
        )}
        {lastUpdate.status === 'Completed' && (
          <div className="font-medium truncate w-[250px] md:w-[500px] -mt-1">
            <span className="text-prime-blue mr-1">Completed</span>
            <Link to={`/manga/${manga?.uid}`} className="hover:underline">
              {manga?.title}
            </Link>
          </div>
        )}
        {lastUpdate.status === 'Plan to Read' && (
          <div className="font-medium truncate w-[250px] md:w-[500px] -mt-1">
            <span className="mr-1">Plan to Read</span>
            <Link to={`/manga/${manga?.uid}`} className="hover:underline">
              {manga?.title}
            </Link>
          </div>
        )}
      </div>
      <div className="flex w-full self-center justify-end">
        <span className="w-fit text-sm md:text-lg h-fit font-semibold">
         <TimeAgo datetime={lastUpdate.date} />
        </span>
      </div>
    </div>
  )
}
