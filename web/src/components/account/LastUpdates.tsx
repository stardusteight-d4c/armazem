import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { updatesMangaList } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { LastUpdate } from './LastUpdate'

interface Props {}

export const LastUpdates = (props: Props) => {
  const [lastUpdates, setLastUpdates] = useState([])
  const userMetadata = useAppSelector((state) => state.armazem.userMetadata)

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${updatesMangaList}/${userMetadata?.account}`
      )
      if (data.status === true) {
        setLastUpdates(data.updates)
      }
    })()
  }, [])

  return (
    <>
      {lastUpdates.length > 0 && (
        <section>
          <h2 className="text-2xl pb-4 pt-12 text-dusk-main dark:text-dawn-main font-bold">
            Last updates
          </h2>
          <div className="flex flex-col gap-y-5">
            {lastUpdates.map((update) => (
              <LastUpdate lastUpdate={update} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
