import { Menu } from '@headlessui/react'
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
        <div className="flex gap-x-2 px-4 py-1 border-b border-b-dawn-weak/20 dark:border-b-dusk-weak/20">
          <input
            type="text"
            placeholder="Search by title"
            className="p-1 outline-none focus:ring-1 focus:ring-prime-blue rounded-sm bg-transparent border border-dawn-weak/20 dark:border-dusk-weak/20"
          />
          <div className="relative">
            <Menu>
              <Menu.Button>
                <div className="rounded-sm hover:brightness-125 transition duration-300 cursor-pointer text-lg font-semibold px-4 py-[2px] text-prime-blue border border-dawn-weak/20 dark:border-dusk-weak/20">
                  All
                </div>
              </Menu.Button>
              <Menu.Items className="shadow-2xl border border-dawn-weak/20 dark:border-dusk-weak/20 whitespace-nowrap z-50 duration-200 font-poppins font-light absolute flex flex-col text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong -right-[6px] -bottom-[100px]">
                <Menu.Item>
                  <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                   Action
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                    Sci-fi
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span className="hover:bg-prime-blue hover:text-white duration-300 ease-in-out py-1 px-2 cursor-pointer">
                   Horror
                  </span>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
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
