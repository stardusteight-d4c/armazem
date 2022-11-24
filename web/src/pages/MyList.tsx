import { Key, useState } from 'react'
import { Navbar, Sidebar } from '../components'
import { Loader } from '../components/Loader'
import Item from '../components/mylist/Item'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const MyList = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const currentAccount: Account = useAppSelector(
    (state) => state.armazem.currentAccount
  )
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Completed')

  const items =
    currentAccount.mangaList &&
    currentAccount.mangaList.filter((item) => item.status === filter)

  if (items) {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  return (
    <div
      className={`${style.gridContainer} ${
        minimizeSidebar
          ? 'grid-cols-1 md:grid-cols-18'
          : 'grid-cols-1 md:grid-cols-5'
      }`}
    >
      <Sidebar />
      <div
        className={`${style.mainContent} ${
          minimizeSidebar
            ? 'col-span-1 md:col-span-17'
            : 'col-span-1 md:col-span-4'
        }`}
      >
        <Navbar />
        <main className="relative min-h-screen w-screen md:w-full">
          <div>
            <ul
              className={`flex text-lg border-b border-prime-blue ${
                (filter === 'Completed' && '!border-prime-blue') ||
                (filter === 'Reading' && '!border-green') ||
                (filter === 'Plan to Read' && '!border-dusk-main')
              }`}
            >
              <li
                onClick={() => setFilter('Completed')}
                className={`cursor-pointer text-center w-1/3 md:w-fit px-4 py-2 transition-all duration-200 hover:brightness-125 ${
                  filter === 'Completed' && 'bg-prime-blue text-white'
                }`}
              >
                Completed
              </li>
              <li
                onClick={() => setFilter('Reading')}
                className={`cursor-pointer text-center w-1/3 md:w-fit px-4 py-2 transition-all duration-200 hover:brightness-125 ${
                  filter === 'Reading' && 'bg-green text-white'
                }`}
              >
                Reading
              </li>
              <li
                onClick={() => setFilter('Plan to Read')}
                className={`cursor-pointer text-center w-1/3 md:w-fit relative px-4 py-2 transition-all duration-200 hover:brightness-125 ${
                  filter === 'Plan to Read' && 'bg-dusk-main text-white'
                }`}
              >
                Plan <span className="hidden sm:inline-block">to Read</span>
              </li>
            </ul>
          </div>
          {!loading ? (
            <>
              <div className="md:px-4 w-screen md:w-full py-3 flex justify-between items-center font-semibold  border-y border-y-dawn-weak/20 dark:border-y-dusk-weak/20 bg-fill-weak dark:bg-fill-strong sticky top-0">
                <div className="flex items-center">
                  <div className="md:min-w-[300px] md:max-w-[300px] text-left  px-4">
                    <span className="hidden md:inline-block">Manga</span>{' '}
                    <span className="inline-block capitalize md:lowercase">
                      title
                    </span>
                  </div>
                </div>
                <div className="flex items-center -ml-6">
                  <div className="md:min-w-[200px] md:max-w-[200px] text-center px-4">
                    Status
                  </div>
                  <div className="hidden md:inline-block min-w-[200px] max-w-[200px] text-center px-4">
                    Your score
                  </div>
                  <div className="md:min-w-[200px] md:max-w-[200px] text-center px-4">
                    Chapters{' '}
                    <span className="hidden md:inline-block">read</span>
                  </div>
                </div>
              </div>
              {items.map((item: any, index: Key | null | undefined) => (
                <Item item={item} key={index} />
              ))}
            </>
          ) : (
            <div className="w-full h-screen -mt-28 flex items-center justify-center">
              <Loader className="border-black dark:border-white !w-16 !h-16 !border-[8px]" />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden lg:max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
