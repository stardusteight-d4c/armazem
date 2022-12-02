import { GridWrapper } from '../components/GridWrapper'
import pageNotFound from '../assets/page-not-found.gif'
import { Link } from 'react-router-dom'

interface Props {}

export const PageNotFound = (props: Props) => {
  return (
    <GridWrapper>
      <div className={style.wrapper}>
        <img src={pageNotFound} className="w-32" alt="PageNotFound" />
        <span>Page Not Found</span>
        <Link to="/" className={style.backToFeed}>
          Back to feed
        </Link>
      </div>
    </GridWrapper>
  )
}

const style = {
  wrapper: `text-fill-strong dark:text-fill-weak flex items-center flex-col mt-28 text-4xl h-full font-semibold z-20`,
  backToFeed: `text-prime-blue hover:underline text-xl mt-2`,
}
