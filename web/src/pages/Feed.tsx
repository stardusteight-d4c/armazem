import { useEffect, useState } from 'react'
import { Navbar, Sidebar } from '../components/menu'
import { Hero, MostRead, RatedPosts, RecentPosts } from '../components/feed'
import axios from 'axios'
import { useAppSelector } from '../store/hooks'
import { topRatedPost } from '../services/api-routes'

interface Props {}

export const Feed = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )
  const [topRatedPosts, setTopRatedPosts] = useState<any>([])

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
        minimizeSidebar ? 'lg:grid-cols-18' : 'lg:grid-cols-5'
      }`}
    >
      <Sidebar />
      <div
        className={
          style.mainContent && minimizeSidebar ? 'col-span-17' : 'col-span-4'
        }
      >
        <Navbar />
        <main className="p-8">
          <Hero />
          <RatedPosts topRatedPosts={topRatedPosts} />
          <MostRead />
          <RecentPosts />
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
}
