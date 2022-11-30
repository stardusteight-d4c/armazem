import { Hero, MostRead, TrendingPosts, RecentPosts } from '../components/feed'
import { GridWrapper } from '../components/GridWrapper'

interface Props {}

export const Feed = (props: Props) => {
  return (
    <GridWrapper >
      <main className="p-2 w-screen md:p-8 md:w-full">
        <Hero />
        <TrendingPosts />
        <MostRead />
        <RecentPosts />
      </main>
    </GridWrapper>
  )
}
