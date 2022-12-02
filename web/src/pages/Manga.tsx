import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { mangaByUid, randomMangasByGenre } from '../services/api-routes'
import { GridWrapper } from '../components/GridWrapper'
import { MangaInfo, MangaStatus, Recommendations } from '../components/manga'

interface Props {}

export const Manga = (props: Props) => {
  const { id: uid } = useParams()
  const [manga, setManga] = useState<Manga>()
  const [recMangas, setRecMangas] = useState<any>([])

  useEffect(() => {
    if (manga) {
      const randomGenreFromManga =
        manga?.genres[Math.floor(Math.random() * manga?.genres.length)]
      ;(async () => {
        const { data } = await axios.get(
          `${randomMangasByGenre}/${randomGenreFromManga}`
        )
        if (data.status === true) {
          setRecMangas(data.mangas)
        }
      })()
    }
  }, [uid, manga])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`${mangaByUid}/${uid}`)
      if (data.status === true) {
        setManga(data.manga)
      }
    })()
  }, [uid])

  const handleDesktopLayout = (type: 'status' | 'info') => (
    <>
      {type === 'status' ? (
        <div className={style.desktop}>
          <MangaStatus />
        </div>
      ) : (
        <div className={style.desktop}>
          <MangaInfo />
        </div>
      )}
    </>
  )

  const handleMobileLayout = (type: 'status' | 'info') => (
    <>
      {type === 'status' ? (
        <div className={`${style.mobile} w-fit h-fit`}>
          <MangaStatus />
        </div>
      ) : (
        <div className={`${style.mobile} w-screen`}>
          <MangaInfo />
        </div>
      )}
    </>
  )

  const MangaNotFound = () => (
    <div className={style.mangaNotFoundContainer}>
      <i className={style.warningIcon} />
      <span className={style.spanMangaNotFound}>Manga Not Found</span>
    </div>
  )

  return (
    <GridWrapper>
      {!manga ? (
        <MangaNotFound />
      ) : (
        <main className={style.wrapperMainContent}>
          <header className={style.header}>
            <span className={style.title}>{manga?.title}</span>
            <span className={style.author}>{manga?.author}</span>
          </header>
          <div className={style.wrapperMangaInfos}>
            <div className={style.flexContainer}>
              <section className={style.firstSection}>
                <img src={manga?.cover} className={style.mangaCover} />
                {handleDesktopLayout('status')}
                {handleMobileLayout('info')}
              </section>
              <section className={style.secondSection}>
                {handleDesktopLayout('info')}
                {handleMobileLayout('status')}
              </section>
            </div>
            <Recommendations recMangas={recMangas} />
          </div>
        </main>
      )}
    </GridWrapper>
  )
}

const style = {
  wrapperMainContent: `w-screen md:w-full`,
  header: `py-2 cursor-default px-2 md:px-4 flex items-center justify-between bg-prime-blue text-fill-weak text-2xl font-semibold`,
  title: `w-full md:w-[80%]`,
  author: `text-xl hidden md:inline-block font-medium`,
  wrapperMangaInfos: `pb-24 md:p-4 md:pb-14`,
  flexContainer: `flex`,
  firstSection: `w-full max-w-[170px] md:max-w-[225px]`,
  mangaCover: `w-full h-full max-w-[170px] max-h-[225px] md:max-w-[225px] md:max-h-[300px]`,
  secondSection: `w-fit mx-auto`,
  desktop: `hidden md:inline-block w-full`,
  mobile: `md:hidden inline-block`,
  mangaNotFoundContainer: `flex flex-col h-full -mt-14 gap-y-2 items-center justify-center`,
  warningIcon: `ri-error-warning-line text-red text-7xl`,
  spanMangaNotFound: `font-semibold text-3xl`,
}
