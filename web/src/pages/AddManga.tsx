import { useState } from 'react'
import { Form, Header } from '../components/addManga'
import { GridWrapper } from '../components/GridWrapper'

interface Props {}

export const AddManga = (props: Props) => {
  const [mangaMetadata, setMangaMetadata] = useState<Manga | any>([])
  const [searchResults, setSearchResults] = useState<[Manga] | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<any>([])

  const headerProps = {
    searchResults,
    setSearchResults,
    setMangaMetadata,
    setSelectedGenres,
  }

  const formProps = {
    selectedGenres,
    setSelectedGenres,
    mangaMetadata,
    setMangaMetadata,
  }

  return (
    <GridWrapper>
      <main>
        <Header {...headerProps} />
        <div className={style.formWrapper}>
          <Form {...formProps} />
        </div>
      </main>
    </GridWrapper>
  )
}

const style = {
  formWrapper: `p-2 md:p-4 pb-16 md:pb-[40px]`,
}
