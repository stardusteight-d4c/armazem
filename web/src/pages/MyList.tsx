import { useState } from 'react'
import { GridWrapper } from '../components/GridWrapper'
import Item from '../components/mylist/Item'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const MyList = (props: Props) => {
  const currentAccount: Account = useAppSelector(
    (state) => state.armazem.currentAccount
  )
  const [filter, setFilter] = useState('Completed')

  const items =
    currentAccount.mangaList &&
    currentAccount.mangaList.filter((item) => item.status === filter)

  if (!items) {
    return <></>
  }

  return (
    <GridWrapper>
      <main className={style.mainContent}>
        <div>
          <ul
            className={`flex text-lg border-b ${
              (filter === 'Completed' && '!border-prime-blue') ||
              (filter === 'Reading' && '!border-green') ||
              (filter === 'Plan to Read' && '!border-dusk-main')
            }`}
          >
            <li
              onClick={() => setFilter('Completed')}
              className={`${style.filterTag} ${
                filter === 'Completed' && 'bg-prime-blue text-white'
              }`}
            >
              Completed
            </li>
            <li
              onClick={() => setFilter('Reading')}
              className={`${style.filterTag} ${
                filter === 'Reading' && 'bg-green text-white'
              }`}
            >
              Reading
            </li>
            <li
              onClick={() => setFilter('Plan to Read')}
              className={`${style.filterTag} ${
                filter === 'Plan to Read' && 'bg-dusk-main text-white'
              }`}
            >
              Plan <span className={style.mobileHidden}>to Read</span>
            </li>
          </ul>
        </div>
        <div className={style.tableHeaderContainer}>
          <div className={style.mangaTitleWrapper}>
            <div className={style.mangaTitleContentContainer}>
              <span className={style.mangaSpan}>Manga</span>
              <span className={style.mangaTitleSpan}>title</span>
            </div>
          </div>
          <div className={style.metaInfosContainer}>
            <div className={style.title}>Status</div>
            <div className={`${style.title} ${style.mobileHidden}`}>
              Your score
            </div>
            <div className={style.title}>
              Chapters <span className={style.mobileHidden}>read</span>
            </div>
          </div>
        </div>
        {items.map((item: Listed, index: React.Key) => (
          <Item item={item} key={index} />
        ))}
      </main>
    </GridWrapper>
  )
}

const style = {
  mainContent: `relative min-h-screen w-screen md:w-full`,
  filterTag: `cursor-pointer text-center w-1/3 md:w-fit px-4 py-2 transition-all duration-200 hover:brightness-125`,
  tableHeaderContainer: `md:px-4 w-screen md:w-full py-3 flex justify-between items-center font-semibold  border-y border-y-dawn-weak/20 dark:border-y-dusk-weak/20 bg-fill-weak dark:bg-fill-strong sticky top-0`,
  mangaTitleWrapper: `flex items-center`,
  mangaTitleContentContainer: `md:min-w-[300px] md:max-w-[300px] text-left px-4`,
  mangaSpan: `hidden md:inline-block mr-1`,
  mangaTitleSpan: `inline-block capitalize md:lowercase`,
  metaInfosContainer: `flex items-center md:-ml-6`,
  title: `md:min-w-[200px] md:max-w-[200px] text-center px-4`,
  mobileHidden: `hidden md:inline-block`,
}
