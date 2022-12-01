import React from 'react'

interface Props {
  manga: Manga | undefined
}

export const MangaMetadata = ({ manga }: Props) => {
  return (
    <div className="md:w-full">
      <h3 className="text-xl font-medium mt-2">Information</h3>
      <div className="flex text-base flex-col gap-[2px] border-t-4 border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2">
        <div className="flex flex-col">
          <span>Chapters:</span>
          <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
            {manga?.chapters}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Status:</span>
          <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
            {manga?.status}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Genres:</span>
          <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
            {manga?.genres.map((genre: string, index: React.Key) => (
              <div key={index}>{genre}</div>
            ))}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Serialization:</span>
          <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
            {manga?.serialization}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Published:</span>
          <span className="text-xs font-medium p-1 border-b border-l rounded-sm border-dawn-weak/20 dark:border-dusk-weak/20">
            {manga?.published}
          </span>
        </div>
      </div>
    </div>
  )
}
