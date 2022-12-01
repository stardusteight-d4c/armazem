import React, { useEffect, useState } from 'react'
import { Button } from '..'
import { useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  addMangaToFavorites,
  addMangaToListed,
  mangaByUid,
  removeMangaToFavorites,
  removeMangaToListed,
} from '../../services/api-routes'
import { error, success } from '../Toasters'
import { Dropdown } from '../Dropdown'
import { MangaMetadata } from './integrate/MangaMetadata'

interface Props {}

export const MangaStatus = (props: Props) => {
  const { id: uid } = useParams()
  const [manga, setManga] = useState<Manga>()
  const [addToMyList, setAddToMyList] = useState<boolean>(false)
  const [status, setStatus] = useState<string | null>(null)
  const [listInfos, setListInfos] = useState<any>({})
  const [mangaListed, setMangaListed] = useState<any>(null)
  const currentAccount = useAppSelector<Account>(
    (state) => state.armazem.currentAccount
  )
  const [favorited, setFavorited] = useState<boolean>(false)

  if (!currentAccount) {
    return <></>
  }

  useEffect(() => {
    ;(async () => {
      if (currentAccount.favorites) {
        await axios
          .get(`${mangaByUid}/${uid}`)
          .then(({ data }) => {
            setManga(data.manga)
            setFavorited(currentAccount.favorites.includes(data.manga._id))
          })
          .catch((error) => console.log(error.toJSON()))
      }
    })()
  }, [currentAccount])

  useEffect(() => {
    if (currentAccount.mangaList) {
      const listed = currentAccount.mangaList.find((o) => o.mangaUid === uid)
      if (listed) {
        setMangaListed(listed)
        setStatus(listed.status)
        setListInfos({ chapRead: listed.chapRead, score: listed.score })
      } else {
        setMangaListed(null)
      }
    }
  }, [currentAccount, manga])

  const handleFavorites = async () => {
    if (currentAccount?.favorites.length < 10) {
      if (!favorited) {
        await axios
          .post(addMangaToFavorites, {
            accountId: currentAccount._id,
            mangaId: manga?._id,
          })
          .then(({ data }) => success(data.msg))
          .catch((error) => console.log(error.toJSON()))
      }
    } else {
      error('10 favorites have already been added')
    }
    if (favorited) {
      await axios
        .post(removeMangaToFavorites, {
          accountId: currentAccount._id,
          mangaId: manga?._id,
        })
        .then(({ data }) => success(data.msg))
        .catch((error) => console.log(error.toJSON()))
    }
  }

  const handleRemove = async () => {
    await axios
      .post(removeMangaToListed, {
        accountId: currentAccount._id,
        mangaUid: manga?.uid,
      })
      .then(({ data }) => success(data.msg))
      .catch((error) => console.log(error.toJSON()))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListInfos({
      ...listInfos,
      [event.target.id]: event.target.value,
    })
  }

  function handleValidation() {
    if (status !== 'Plan to Read') {
      if (status === null) {
        error('Enter a valid status')
        return false
      } else if (
        !Number.isInteger(Number(listInfos.chapRead)) ||
        !Number.isInteger(Number(listInfos.score))
      ) {
        error('Only numbers must be entered')
        return false
      } else if (
        (manga?.chapters !== '???' && listInfos.chapRead > manga!.chapters) ||
        listInfos.chapRead < 0
      ) {
        error('Chapters read out of bounds')
        return false
      } else if (listInfos.score > 10 || listInfos.score < 0) {
        error('The score must be between 0 and 10')
        return false
      } else if (listInfos.chapRead === '' || listInfos.score === '') {
        error('The number cannot be null')
        return false
      } else if (
        mangaListed &&
        mangaListed.chapRead === listInfos.chapRead &&
        mangaListed.score === listInfos.score &&
        mangaListed.status === status
      ) {
        error('No changes')
        return false
      }
    }
    return true
  }

  const chooseStatusItems = [
    manga?.chapters !== '???' && {
      item: 'Completed',
      function: () => setStatus('Completed'),
    },
    {
      item: 'Reading',
      function: () => setStatus('Reading'),
    },
    {
      item: 'Plan to Read',
      function: () => setStatus('Plan to Read'),
    },
  ]

  const removeFromListedItems = [
    {
      item: 'Remove',
      function: handleRemove,
    },
    {
      item: 'Cancel',
    },
  ]

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (status === 'Completed') {
      setListInfos({ ...listInfos, chapRead: manga?.chapters })
    }
    if (handleValidation()) {
      if (status === 'Plan to Read') {
        await axios
          .post(addMangaToListed, {
            accountId: currentAccount._id,
            data: {
              mangaUid: manga!.uid,
              status,
              date: new Date(),
            },
          })
          .then(({ data }) => success(data.msg))
          .catch((error) => console.log(error.toJSON()))
        setListInfos({})
      } else {
        await axios
          .post(addMangaToListed, {
            accountId: currentAccount._id,
            data: {
              mangaUid: manga!.uid,
              ...listInfos,
              status,
              date: new Date(),
            },
          })
          .then(({ data }) => success(data.msg))
          .catch((error) => console.log(error.toJSON()))
      }
    }
  }

  const rendersListedStatusHeader = () => (
    <div className={style.listedStatusContainer}>
      {mangaListed && mangaListed.status !== 'Plan to Read' ? (
        <div title="Listed" className={style.listedIcon} />
      ) : (
        <div title="Not listed" className={style.notListedIcon} />
      )}
      {mangaListed && mangaListed.status !== 'Plan to Read' && (
        <>
          {favorited ? (
            <div
              onClick={handleFavorites}
              title="Remove to favorites"
              className={style.favoritedIcon}
            />
          ) : (
            <>
              {currentAccount.favorites.length < 10 ? (
                <div
                  onClick={handleFavorites}
                  title="Add to favorites"
                  className={style.notFavoritedIcon}
                />
              ) : (
                <div
                  onClick={handleFavorites}
                  title="Maximum limit reached"
                  className={style.maxFavoritedIcon}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  )

  const rendersStatus = () =>
    status === null ? (
      <span className="text-red">Undefined</span>
    ) : (
      <span
        className={`${
          (status === 'Completed' && 'text-prime-blue') ||
          (status === 'Reading' && 'text-green') ||
          (status === 'Plan to Read' && 'text-dusk-main')
        }`}
      >
        {status}
      </span>
    )

  const rendersEditStatus = () => (
    <form onSubmit={handleSubmit}>
      {mangaListed ? (
        <h3 className={style.editStatusTitle}>Edit status</h3>
      ) : (
        <span
          onClick={() => setAddToMyList(false)}
          className={style.cancelEdit}
        >
          Cancel
        </span>
      )}
      <div className={style.editStatusContainer}>
        <div className={style.statContainer}>
          <span>Status:</span>
          <Dropdown
            space="space-y-6"
            title="Choose status"
            items={chooseStatusItems}
          >
            {rendersStatus()}
          </Dropdown>
        </div>
        {status !== 'Plan to Read' && (
          <>
            <div className={style.statContainer}>
              <span>Chap. Read:</span>
              <div className={style.inputContainer}>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  id="chapRead"
                  value={
                    status === 'Completed'
                      ? manga?.chapters
                      : listInfos.chapRead
                  }
                  placeholder="???"
                  maxLength={4}
                  className={style.input}
                />
                <span>/</span>
                {manga?.chapters}
              </div>
            </div>
            <div className={style.statContainer}>
              <span>Your Score:</span>
              <div className={style.inputContainer}>
                <input
                  type="text"
                  id="score"
                  onChange={(e) => handleChange(e)}
                  maxLength={2}
                  placeholder={listInfos.score ? listInfos.score : '???'}
                  className={style.input}
                />
              </div>
            </div>
          </>
        )}
        <div className={style.submitFormButtonsContainer}>
          <Button title="Submit" type="submit" className={style.submitButton} />
          {mangaListed && (
            <Dropdown
              title="Remove from list"
              position="-bottom-[68px]"
              items={removeFromListedItems}
            >
              <div className={style.removeButtonDropdown}>Remove</div>
            </Dropdown>
          )}
        </div>
      </div>
    </form>
  )

  const rendersAddToMyList = () => (
    <div className={style.addToMyListContainer}>
      <span onClick={() => setAddToMyList(true)} className={style.addToMyList}>
        Add to my list
      </span>
    </div>
  )

  return (
    <div className={style.wrapper}>
      {rendersListedStatusHeader()}
      {mangaListed || addToMyList ? rendersEditStatus() : rendersAddToMyList()}
      <div className="hidden md:inline-block w-full">
        <MangaMetadata manga={manga} />
      </div>
    </div>
  )
}

const style = {
  wrapper: `w-fit mt-4 md:mt-0 md:w-full`,
  listedStatusContainer: `md:max-w-[225px] flex items-center gap-x-2`,
  listedIcon: `ri-bookmark-fill text-prime-blue cursor-pointer`,
  notListedIcon: `ri-bookmark-line cursor-pointer`,
  favoritedIcon: `ri-star-fill text-prime-purple cursor-pointer`,
  notFavoritedIcon: `ri-star-line cursor-pointer`,
  maxFavoritedIcon: `ri-star-fill text-dusk-weak cursor-pointer`,
  editStatusTitle: `text-xl font-medium mt-2`,
  cancelEdit: `text-sm hover:underline font-medium cursor-pointer text-red`,
  editStatusContainer: `flex flex-col gap-y-1 border-t-4 border-t-dawn-weak/20 dark:border-t-dusk-weak/20 py-2`,
  statContainer: `flex justify-between gap-x-2 text-base`,
  inputContainer: `flex items-center gap-x-1`,
  input: `w-[50px] h-[18px] focus:placeholder:text-dusk-main/50 dark:focus:placeholder:text-dawn-main/50 placeholder:text-dusk-main dark:placeholder:text-dawn-main text-center outline-none bg-transparent rounded-sm border border-prime-blue/50`,
  submitFormButtonsContainer: `flex gap-x-2`,
  submitButton: `bg-prime-blue mt-1 !rounded-sm !px-2 !py-1`,
  removeButtonDropdown: `bg-red mt-1 font-semibold text-white rounded-sm px-2 py-1`,
  addToMyListContainer: `w-[180px] flex items-center gap-x-2`,
  addToMyList: `text-sm hover:underline font-medium cursor-pointer text-prime-blue`,
}
