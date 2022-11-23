import { useEffect, useState } from 'react'
import { MobileNav, Navbar, Sidebar } from '../components/menu'
import { Hero, MostRead, TrendingPosts, RecentPosts } from '../components/feed'
import axios from 'axios'
import { useAppSelector } from '../store/hooks'
import { topRatedPost } from '../services/api-routes'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { SwitchTheme } from '../components'

interface Props {}

export const Feed = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [topRatedPosts, setTopRatedPosts] = useState<any>([])
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(topRatedPost)
      if (data.status === true) {
        setTopRatedPosts(data.posts)
      }
    })()
  }, [])

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
        className={`
          ${style.mainContent}  ${
          minimizeSidebar
            ? 'col-span-1 md:col-span-17'
            : 'col-span-1 md:col-span-4'
        }
        `}
      >
        <Navbar />
        <MobileNav />
        <main className="p-3 w-screen md:p-8 md:w-full">
          <Hero />
          <TrendingPosts topRatedPosts={topRatedPosts} />
          <MostRead />
          <RecentPosts />
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden lg:max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
