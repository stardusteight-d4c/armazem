import { Hero, MostRead, TrendingPosts, RecentPosts } from '../components/feed'
import { GridWrapper } from '../components/GridWrapper'

export const Feed = () => {
  return (
    <GridWrapper>
      <main className={style.wrapperMainContent}>
        <Hero />
        <TrendingPosts />
        <MostRead />
        <RecentPosts />
      </main>
    </GridWrapper>
  )
}

const style = {
  wrapperMainContent: `p-2 w-screen md:p-8 md:w-full`,
}
