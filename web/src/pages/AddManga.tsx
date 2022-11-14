import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Navbar, Sidebar } from '../components'
import { error, success } from '../components/Toasters'
import { addManga, searchByTitle } from '../services/api-routes'
import { useAppSelector } from '../store/hooks'
import { genres } from '../utils/genres'

interface Props {}

export const AddManga = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [mangaMetadata, setMangaMetadata] = useState<any>(false)
  const [showStatus, setShowStatus] = useState<any>(false)
  const [status, setStatus] = useState<string>('')
  const [searchResults, setSearchResults] = useState<[Manga] | null>(null)
  const [term, setTerm] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<any>([])
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  const handleSelectedGenres = (genre: string) => {
    // separar melhor as operações lógicas ex.: se item estiver no array
    // ao invés de colocar a operação lógica, encapsulamento
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

  const search = async (query: string) => {
    const { data } = await axios.post(searchByTitle, {
      query,
    })
    setSearchResults(data.mangas)
  }

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    setTerm(eventValue)
    if (term) {
      search(term)
    } else {
      setSearchResults(null)
    }
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

  return (
    <div
      className={`${style.gridContainer} ${
        minimizeSidebar ? 'grid-cols-18' : 'grid-cols-5'
      }`}
    >
      <Sidebar />
      <div
        className={`${style.mainContent} ${
          minimizeSidebar ? 'col-span-17' : 'col-span-4'
        }`}
      >
        <Navbar />
        <main>
          <div className="flex gap-x-2 px-4 py-1 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20">
            <div className="flex flex-col">
              <input
                type="text"
                onChange={(e) => handleSearchTerm(e)}
                value={term}
                placeholder="Edit an existing title"
                className="p-1 outline-none focus:border-1 focus:!border-prime-blue rounded-sm bg-transparent border border-dawn-weak/20 dark:border-dusk-weak/20"
              />
              <div className="relative">
                {searchResults && searchResults.length > 0 && (
                  <div className="text-dusk-main w-full absolute shadow-lg border border-dawn-weak/20 dark:border-dusk-weak/20 dark:text-dawn-main bg-fill-weak dark:bg-fill-strong z-50">
                    {searchResults.map((result: Manga, index) => (
                      <div
                        onClick={() => {
                          setMangaMetadata({ ...result }),
                            setSearchResults(null),
                            setTerm('')
                          setSelectedGenres(result.genres)
                        }}
                        key={index}
                        className="min-w-full block p-2 cursor-pointer"
                      >
                        {result.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 pb-14">
            <form onSubmit={handleSubmit} className="px-[100px] space-y-5">
              <div className="flex gap-x-4 w-full">
                <div className="space-y-2 w-full">
                  <label htmlFor="title" className={style.label}>
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    onChange={(e) => handleChange(e)}
                    value={mangaMetadata.title}
                    maxLength={50}
                    placeholder="Title"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <label htmlFor="author" className={style.label}>
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    required
                    value={mangaMetadata.author}
                    maxLength={50}
                    onChange={(e) => handleChange(e)}
                    placeholder="Author"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                </div>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="synopsis" className={style.label}>
                  Synopsis
                </label>
                <textarea
                  required
                  id="synopsis"
                  value={mangaMetadata.synopsis}
                  onChange={(e) => handleChange(e)}
                  placeholder="Add a synopsis"
                  maxLength={5000}
                  className="w-full resize-none h-[250px] p-4 text-xl bg-layer-light dark:bg-layer-heavy placeholder:text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
                />
              </div>
              <div className="flex gap-x-4 w-full">
                {mangaMetadata.cover && mangaMetadata.cover !== '' ? (
                  <div className="relative">
                    <div className="min-w-[218px] max-w-[218px] h-[327px] border-2 border-dashed">
                      <img
                        className="min-w-[215px] bg-transparent max-w-[215px] h-[325px] object-fill"
                        src={mangaMetadata.cover}
                        alt=""
                      />
                      <i className="ri-file-damage-fill -z-10 absolute -top-8 left-1/2 -translate-x-1/2 text-[#707070] dark:text-[#9B9B9B] h-full text-5xl flex flex-col items-center justify-evenly" />
                    </div>
                  </div>
                ) : (
                  <div className="min-w-[218px] max-w-[218px] h-[327px] border-2 border-dashed">
                    <i className="ri-image-fill text-[#707070] dark:text-[#9B9B9B] h-full text-5xl flex flex-col items-center justify-evenly" />
                  </div>
                )}
                <div className="space-y-2 w-full">
                  <label htmlFor="cover" className={style.label}>
                    Cover URL
                  </label>
                  <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    id="cover"
                    required
                    value={mangaMetadata.cover}
                    placeholder="Add a valid url for cover image"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                  <div className="grid grid-cols-3 gap-5">
                    <div className="space-y-2 w-full col-span-1">
                      <label htmlFor="chapters" className={style.label}>
                        Chapters
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        maxLength={4}
                        value={mangaMetadata.chapters}
                        id="chapters"
                        required
                        placeholder="Chapters"
                        className={`${style.input} placeholder:text-sm`}
                      />
                    </div>
                    <div className="space-y-2 w-full col-span-1">
                      <label htmlFor="status" className={style.label}>
                        Status
                      </label>
                      <div className="relative">
                        <input
                          id="status"
                          required
                          onFocus={() => setShowStatus(true)}
                          onBlur={() => {
                            setTimeout(() => {
                              setShowStatus(false)
                            }, 200)
                          }}
                          value={
                            mangaMetadata.status
                              ? mangaMetadata.status
                              : status
                              ? status
                              : 'Select status'
                          }
                          className={`${
                            status &&
                            ' !text-dusk-main dark:!text-dawn-main !py-4'
                          } w-full h-[52px] px-4 py-5 bg-layer-light dark:bg-layer-heavy text-sm text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg caret-transparent cursor-pointer`}
                        />
                        <i className="ri-arrow-drop-down-line text-3xl absolute right-2 top-1/2 -translate-y-1/2" />
                        {showStatus && (
                          <div className="shadow-md w-full border border-dawn-weak/20 dark:border-dusk-weak/20 z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong right-0 -bottom-[60px]">
                            <a
                              onClick={() => setStatus('Publishing')}
                              className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                            >
                              Publishing
                            </a>
                            <a
                              onClick={() => setStatus('Finished')}
                              className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer"
                            >
                              Finished
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 w-full col-span-1">
                      <label htmlFor="serialization" className={style.label}>
                        Serialization
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        id="serialization"
                        value={mangaMetadata.serialization}
                        required
                        placeholder="serialization"
                        className={`${style.input} placeholder:text-sm`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-full col-span-1">
                    <label htmlFor="published" className={style.label}>
                      Published
                    </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="date"
                      id="published"
                      value={mangaMetadata.published}
                      required
                      placeholder="Published"
                      className={`${style.input} placeholder:text-sm`}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <div
                        onClick={() => handleSelectedGenres(genre)}
                        className={`${
                          selectedGenres.includes(genre) &&
                          'border-prime-purple dark:border-prime-purple'
                        } cursor-pointer whitespace-nowrap w-fit rounded-full px-2 border border-dawn-weak/20 dark:border-dusk-weak/20`}
                      >
                        {genre}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                title="Submit"
                className="bg-prime-purple my-5"
              />
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
  label: `text-dusk-main dark:text-dawn-main text-xl w-full block font-semibold`,
  input: `w-full p-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg`,
}
