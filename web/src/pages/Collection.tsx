import { Navbar, Sidebar } from '../components'
import { Card } from '../components/collection/Card'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const Collection = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

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
        <div className='px-4 py-1 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20'>
          <input type="text" placeholder='search by name' />
          {/* Filter by geners select genre */}
        </div>
        <main>
          <div
            className={`${
              minimizeSidebar ? 'grid-cols-5' : 'grid-cols-4'
            } pb-14 grid p-4 gap-4 w-full`}
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
