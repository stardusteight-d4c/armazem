import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { updatesMangaList } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { LastUpdate } from './integrate/LastUpdate'

interface Props {}

export const LastUpdates = (props: Props) => {
  const [lastUpdates, setLastUpdates] = useState<[Listed] | []>([])
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`${updatesMangaList}/${userMetadata?.account}`)
        .then(({ data }) => setLastUpdates(data.updates))
        .catch((error) => console.log(error.toJSON()))
    })()
  }, [])

  return (
    <>
      {lastUpdates.length > 0 && (
        <section>
          <h2 className={style.title}>Last updates</h2>
          <div className={style.container}>
            {lastUpdates.map((update, index: React.Key) => (
              <LastUpdate key={index} lastUpdate={update} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

const style = {
  title: `text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold`,
  container: `flex flex-col gap-y-5`,
}
