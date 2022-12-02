import axios from 'axios'
import { useEffect, useState } from 'react'
import { mangaByUid } from '../../../services/api-routes'
import { useAppSelector } from '../../../store/hooks'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import en_short from 'timeago.js/lib/lang/en_short'
import { Update } from './Update'
timeago.register('en_short', en_short)

interface Props {
  lastUpdate: Listed
}

export const LastUpdate = ({ lastUpdate }: Props) => {
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)
  const [manga, setManga] = useState<Manga>()

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${mangaByUid}/${lastUpdate.mangaUid}`)
        .then(({ data }) => setManga(data.manga))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [lastUpdate, userMetadata])

  return (
    <div className={style.wrapper}>
      <img
        src={userMetadata?.user_img}
        alt="author/img"
        className={style.authorImg}
      />
      <div className={style.infosContainer}>
        <span className={style.userName}>{userMetadata?.name}</span>
        <Update lastUpdate={lastUpdate} manga={manga} />
      </div>
      <div className={style.dateContainer}>
        <span className={style.date}>
          <TimeAgo datetime={lastUpdate.date} />
        </span>
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex text-neutral-weak dark:text-neutral-main bg-fill-weak dark:bg-fill-strong items-start gap-3`,
  authorImg: `hidden md:inline-block w-12 h-12 object-cover`,
  infosContainer: `flex flex-col`,
  userName: `font-medium text-xl text-dusk-main dark:text-dawn-main`,
  dateContainer: `flex w-full self-center justify-end`,
  date: `w-fit text-sm md:text-lg h-fit font-semibold`,
}
