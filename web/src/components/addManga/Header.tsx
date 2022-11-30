import axios from 'axios'
import React from 'react'
import { searchByTitle } from '../../services/api-routes'

interface Props {
  searchResults: [Manga] | null
  setSearchResults: React.Dispatch<React.SetStateAction<[Manga] | null>>
  setMangaMetadata: React.Dispatch<any>
  setSelectedGenres: React.Dispatch<any>
}

export const Header = ({
  searchResults,
  setSearchResults,
  setMangaMetadata,
  setSelectedGenres,
}: Props) => {
  const search = async (term: string) => {
    if (term !== '') {
      const { data } = await axios.post(searchByTitle, {
        query: term,
      })
      setSearchResults(data.mangas)
    } else {
      setSearchResults(null)
    }
  }

  return (
    <header className={style.wrapper}>
      <div className={style.searchContainer}>
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          placeholder="Edit an existing title"
          className={style.input}
        />
        <div className={style.resultsWrapper}>
          {searchResults && searchResults.length > 0 && (
            <div className={style.resultsContainer}>
              {searchResults.map((result: Manga, index) => (
                <div
                  onClick={() => {
                    setMangaMetadata({ ...result }),
                      setSearchResults(null),
                      setSelectedGenres(result.genres)
                  }}
                  key={index}
                  className={style.resultItem}
                >
                  {result.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const style = {
  wrapper: `flex gap-x-2 px-4 py-1 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20`,
  searchContainer: `flex flex-col`,
  input: `p-1 outline-none focus:border-1 focus:!border-prime-blue rounded-sm bg-transparent border border-dawn-weak/20 dark:border-dusk-weak/20`,
  resultsWrapper: `relative`,
  resultsContainer: `text-dusk-main w-full absolute shadow-lg border border-dawn-weak/20 dark:border-dusk-weak/20 dark:text-dawn-main bg-fill-weak dark:bg-fill-strong z-50`,
  resultItem: `min-w-full block p-2 cursor-pointer`,
}
