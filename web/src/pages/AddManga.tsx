import { useState } from 'react'
import { Navbar, Sidebar } from '../components'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const AddManga = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [mangaMetadata, setMangaMetadata] = useState<any>(false)

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
            <div className="px-[100px] space-y-5">
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
                    placeholder="Title"
                    className={style.input}
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
                    onChange={(e) => handleChange(e)}
                    placeholder="Author"
                    className={style.input}
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
                  className="w-full resize-none h-[250px] p-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg"
                />
              </div>
              <div className="flex gap-x-4 w-full">
                {mangaMetadata.cover ? (
                  <div className='relative'>
                    <img
                      className="min-w-[215px] bg-transparent max-w-[215px] h-[325px] object-fill"
                      src={mangaMetadata.cover}
                      alt=""
                    />
                    <i className="ri-file-damage-fill -z-10 absolute top-0 left-[51%] -translate-x-1/2 text-[#707070] dark:text-[#9B9B9B] h-full text-5xl flex flex-col items-center justify-evenly" />
                  </div>
                ) : (
                  <div className="min-w-[215px] max-w-[215px] h-[325px] border-2 border-dashed">
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
                    className={style.input}
                  />
                </div>
                {/* chapters lançamento ou caps -> select category */}
              </div>
            </div>
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

// title: {
//   type: String,
//   require: true,
// },
// author: {
//   type: String,
//   require: true,
// },
// synopsis: {
//   type: String,
//   require: true,
// },
// cover: {
//   type: String,
//   require: true,
// },
// chapters: {
//   type: Number,
//   require: true,
// },
// status: {
//   type: String,
//   require: true,
// },
// serialization: {
//   type: String,
//   require: true,
// },
// published: {
//   type: Number,
//   require: true,
// },
