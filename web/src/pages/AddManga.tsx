import axios from 'axios'
import { useState } from 'react'
import { Button, Navbar, Sidebar } from '../components'
import { error } from '../components/Toasters'
import { addManga } from '../services/api-routes'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const AddManga = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [mangaMetadata, setMangaMetadata] = useState<any>(false)
  const [showStatus, setShowStatus] = useState<any>(false)
  const [status, setStatus] = useState<string | null>('')

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const mangaData = {
      ...mangaMetadata,
      status: status,
    }
    const { data } = await axios.post(addManga, {
      data: mangaData,
    })
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
          {/* Fazer um filtro que busca por mangas e possa editar novamente */}
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
                      <i className="ri-file-damage-fill -z-10 absolute top-0 left-[51%] -translate-x-1/2 text-[#707070] dark:text-[#9B9B9B] h-full text-5xl flex flex-col items-center justify-evenly" />
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
                        id="chapters"
                        required
                        placeholder="Chapters"
                        className={`${style.input} placeholder:text-sm text-xl`}
                      />
                    </div>
                    <div className="space-y-2 w-full col-span-1">
                      <label htmlFor="status" className={style.label}>
                        Status
                      </label>
                      <div className="relative">
                        <input
                          id="status"
                          onFocus={() => setShowStatus(true)}
                          onBlur={() => {
                            setTimeout(() => {
                              setShowStatus(false)
                            }, 200)
                          }}
                          value={status ? status : 'Select status'}
                          className={`${
                            status &&
                            '!text-xl !text-dusk-main dark:!text-dawn-main !py-4'
                          } w-full px-4 py-5 bg-layer-light dark:bg-layer-heavy text-sm text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg caret-transparent cursor-pointer`}
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
                        required
                        placeholder="serialization"
                        className={`${style.input} placeholder:text-sm text-xl`}
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
                      required
                      placeholder="Published"
                      className={`${style.input} placeholder:text-sm text-xl`}
                    />
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
