import { useEffect, useState } from 'react'
import { Hero, MostRead, TrendingPosts, RecentPosts } from '../components/feed'
import { GridWrapper } from '../components/GridWrapper'

interface Props {}

export const Feed = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <GridWrapper loading={loading}>
      <main className="p-2 w-screen md:p-8 md:w-full">
        <Hero />
        <TrendingPosts />
        <MostRead />
        <RecentPosts />
      </main>
    </GridWrapper>
  )
}
