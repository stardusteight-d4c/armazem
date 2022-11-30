import axios from 'axios'
import { useState } from 'react'
import { addManga } from '../../services/api-routes'
import { useAppSelector } from '../../store/hooks'
import { genres } from '../../utils/genres'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { error, success } from '../Toasters'
import { Input } from './integrate/Input'

interface Props {
  selectedGenres: any
  setSelectedGenres: React.Dispatch<any>
  mangaMetadata: any
  setMangaMetadata: React.Dispatch<any>
}

export const Form = ({
  selectedGenres,
  setSelectedGenres,
  mangaMetadata,
  setMangaMetadata,
}: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [status, setStatus] = useState<any>()

  const handleSelectedGenres = (genre: string) => {
    if (selectedGenres && selectedGenres.includes(genre)) {
      const index = selectedGenres.indexOf(genre)
      const copyArray = [...selectedGenres]
      copyArray.splice(index, 1)
      setSelectedGenres(copyArray)
    } else {
      selectedGenres.length > 0
        ? setSelectedGenres([...selectedGenres, genre])
        : setSelectedGenres([genre])
    }
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMangaMetadata({
      ...mangaMetadata,
      [event.target.id]: event.target.value,
    })
  }

  function validateUrl(value: string) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (
      (status === 'Publishing' || status === 'Finished') &&
      validateUrl(mangaMetadata.cover) &&
      selectedGenres.length > 0
    ) {
      const mangaData = {
        ...mangaMetadata,
        status: status,
        genres: selectedGenres,
        insertedBy: currentUser?._id,
      }
      const { data } = await axios.post(addManga, {
        data: mangaData,
      })
      if (data.status === true) {
        success(data.msg)
        Object.keys(mangaMetadata).forEach((key) => (mangaMetadata[key] = ''))
        setStatus('')
        setSelectedGenres([])
      }
    } else {
      if (!(status === 'Publishing' || status === 'Finished')) {
        error('Choose a status')
      } else if (!validateUrl(mangaMetadata.cover)) {
        error('Enter a valid URL')
      } else if (selectedGenres.length === 0) {
        error('Choose at least one genre')
      }
    }
  }

  const inputProps = {
    title: {
      type: 'text',
      id: 'title',
      label: 'Title',
      placeholder: 'Title',
      value: mangaMetadata.title,
      className: 'space-y-2 w-full',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    author: {
      type: 'text',
      id: 'author',
      label: 'Author',
      placeholder: 'Author',
      value: mangaMetadata.author,
      maxLength: 80,
      className: 'space-y-2 w-full mt-3 md:mt-0',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    synopsis: {
      type: 'text',
      id: 'synopsis',
      label: 'Synopsis',
      placeholder: 'Add a synopsis',
      value: mangaMetadata.synopsis,
      maxLength: 5000,
      className: 'space-y-2 w-full',
      textarea: true,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e),
    },
    cover: {
      type: 'text',
      id: 'cover',
      label: 'Cover URL',
      placeholder: 'Add a valid url for cover image',
      value: mangaMetadata.cover,
      className: 'space-y-2 w-full',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    chapters: {
      type: 'text',
      id: 'chapters',
      label: 'Chapters',
      placeholder: 'Chapters',
      value: mangaMetadata.chapters,
      maxLength: 4,
      className: 'space-y-2 w-full col-span-1',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    serialization: {
      type: 'text',
      id: 'serialization',
      label: 'Serialization',
      placeholder: 'Serialization',
      value: mangaMetadata.serialization,
      className: 'space-y-2 w-full col-span-1',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    status: {
      type: 'text',
      id: 'status',
      label: 'Status',
      className: 'space-y-2 w-full col-span-1',
      value: status ? status : mangaMetadata.status || 'Select status',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    published: {
      type: 'date',
      id: 'published',
      label: 'Published',
      placeholder: 'Published',
      value: mangaMetadata.published,
      className: 'space-y-2 w-full col-span-1',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
  }

  const statusDropdownItems = [
    { item: 'Publishing', function: () => setStatus('Publishing') },
    { item: 'Finished', function: () => setStatus('Finished') },
  ]

  return (
    <form onSubmit={handleSubmit} className={style.wrapper}>
      <div className={style.container}>
        <Input {...inputProps.title} />
        <Input {...inputProps.author} />
      </div>
      <Input {...inputProps.synopsis} />
      <div className={style.container}>
        {mangaMetadata.cover && mangaMetadata.cover !== '' ? (
          <div className="relative">
            <div className={style.coverContainer}>
              <img className={style.coverImg} src={mangaMetadata.cover} />
              <i className={style.breakLinkIcon} />
            </div>
          </div>
        ) : (
          <div className={style.coverContainer}>
            <i className={style.insertLinkIcon} />
          </div>
        )}
        <div className={style.wrapperGrid}>
          <Input {...inputProps.cover} />
          <div className={style.gridContainer}>
            <Input {...inputProps.chapters} />
            <Dropdown
              title="Select status"
              position="-bottom-16 inset-x-0"
              items={statusDropdownItems}
            >
              <Input {...inputProps.status} />
            </Dropdown>
            <Input {...inputProps.serialization} />
            <Input {...inputProps.published} />
          </div>

          <div className={style.genresContainer}>
            {genres.map((genre, index) => (
              <div
                key={index}
                onClick={() => handleSelectedGenres(genre)}
                className={`${
                  selectedGenres.includes(genre) &&
                  'border-prime-purple dark:border-prime-purple'
                } ${style.genre}`}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button type="submit" title="Submit" className={style.buttonSubmit} />
    </form>
  )
}

const style = {
  wrapper: `md:px-[100px] space-y-5`,
  container: `md:flex gap-x-4 w-full`,
  coverContainer: `min-w-[218px] mb-4 md:mb-0 w-fit mx-auto md:mx-0 max-w-[218px] h-[327px] border-2 border-dashed`,
  coverImg: `min-w-[215px] bg-transparent max-w-[213px] h-[323px] object-fill`,
  breakLinkIcon: `ri-file-damage-fill -z-10 absolute -top-8 left-1/2 -translate-x-1/2 text-neutral-weak dark:text-neutral-main h-full text-5xl flex flex-col items-center justify-evenly`,
  insertLinkIcon: `ri-image-fill text-neutral-weak dark:text-neutral-main h-full text-5xl flex flex-col items-center justify-evenly`,
  wrapperGrid: `space-y-2 w-full`,
  gridContainer: `grid grid-cols-2 gap-5`,
  genresContainer: `flex flex-wrap gap-2 pt-4 md:pt-0`,
  genre: `cursor-pointer whitespace-nowrap w-fit rounded-full px-2 border border-dawn-weak/20 dark:border-dusk-weak/20`,
  buttonSubmit: `bg-prime-purple my-5`,
}
