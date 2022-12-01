import React from 'react'

interface Props {
  manga: Manga
}

export const MangaMetadata = ({ manga }: Props) => {
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Information</h3>
      <div className={style.infosContainer}>
        <div className={style.spanContainer}>
          <span>Chapters:</span>
          <span className={style.spanData}>{manga?.chapters}</span>
        </div>
        <div className={style.spanContainer}>
          <span>Status:</span>
          <span className={style.spanData}>{manga?.status}</span>
        </div>
        <div className={style.spanContainer}>
          <span>Genres:</span>
          <span className={style.spanData}>
            {manga?.genres.map((genre: string, index: React.Key) => (
              <div key={index}>{genre}</div>
            ))}
          </span>
        </div>
        <div className={style.spanContainer}>
          <span>Serialization:</span>
          <span className={style.spanData}>{manga?.serialization}</span>
        </div>
        <div className={style.spanContainer}>
          <span>Published:</span>
          <span className={style.spanData}>{manga?.published}</span>
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `md:w-full`,
  title: `text-xl font-medium mt-2`,
  infosContainer: `flex text-base flex-col gap-[2px] border-t-4 border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2`,
  spanContainer: `flex flex-col`,
  spanData: `text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20`,
}
