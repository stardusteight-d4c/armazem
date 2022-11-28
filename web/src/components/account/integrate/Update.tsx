import { Link } from 'react-router-dom'

interface Props {
  lastUpdate: any
  manga: any
}

export const Update = ({ lastUpdate, manga }: Props) => {
  const status = lastUpdate.status

  const rendersSpan = () => (
    <span
      className={`${
        (status === 'Reading' && style.spanReading) ||
        (status === 'Completed' && style.spanCompleted) ||
        (status === 'Plan to Read' && style.spanPlanToRead)
      }`}
    >
      {status === 'Reading' && 'Reading'}
      {status === 'Completed' && 'Completed'}
      {status === 'Plan to Read' && 'Plan to Read'}
    </span>
  )

  return (
    <div className={style.container}>
      {rendersSpan()}
      {lastUpdate.chapRead} of{' '}
      <Link to={`/manga/${manga?.uid}`} className="hover:underline">
        {manga?.title}
      </Link>
    </div>
  )
}

const style = {
  container: `font-medium truncate w-[250px] md:w-[500px] -mt-1`,
  spanReading: `text-green/90 mr-1`,
  spanCompleted: `text-prime-blue mr-1`,
  spanPlanToRead: `mr-1`,
}
