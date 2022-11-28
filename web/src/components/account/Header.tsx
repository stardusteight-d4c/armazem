import { handleOpenModal } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ConnectionStatus } from '../ConnectionStatus'

interface Props {
  userMetadata: User
  currentAccount: Account
}

export const Header = ({ userMetadata, currentAccount }: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const dispatch = useAppDispatch()

  const handleLastActivity = () => {
    const isActivity = Number(
      Math.abs(
        (new Date().getTime() - new Date(userMetadata.lastActivity).getTime()) /
          1000
      ).toFixed()
    )
    return isActivity
  }

  return (
    <section className={style.wrapper}>
      <img
        referrerPolicy="no-referrer"
        className={style.coverImg}
        src={userMetadata.cover_img}
        alt="cover/img"
      />
      {userMetadata._id === currentUser?._id && (
        <div
          onClick={() => dispatch(handleOpenModal('EditCoverImage'))}
          className={style.editCover}
        />
      )}
      <div className={style.userInfoWrapper}>
        <div className={style.userImgContainer}>
          <img
            referrerPolicy="no-referrer"
            className={style.userImg}
            src={userMetadata.user_img}
            alt="user/img"
          />
          {userMetadata._id === currentUser?._id && (
            <div
              onClick={() => dispatch(handleOpenModal('EditProfileImage'))}
              className={style.editUserImg}
            />
          )}
        </div>
        <div className={style.userMetadataContainer}>
          <div className={style.nameStatusContainer}>
            <h2 className={style.name}>{userMetadata.name}</h2>
            {userMetadata._id !== currentUser?._id && (
              <ConnectionStatus
                userMetadata={userMetadata}
                currentAccount={currentAccount}
              />
            )}
          </div>
          <div className={style.usernameActivityContainer}>
            @{userMetadata?.username}{' '}
            {handleLastActivity() <= 65 ? (
              <div title="Online" className={style.online} />
            ) : (
              <div title="Offline" className={style.offline} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const style = {
  wrapper: `relative`,
  coverImg: `w-full border-r border-r-dawn-weak/20 dark:border-r-dusk-weak/20 h-[250px] md:h-[300px]`,
  editCover: `ri-image-edit-fill transition-all duration-200 hover:brightness-125 flex justify-center items-center p-2 drop-shadow-md rounded-full text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong w-10 h-10 text-xl absolute z-20 top-5 right-5 cursor-pointer`,
  userInfoWrapper: `relative`,
  userImgContainer: `w-fit mx-auto md:mx-0 relative`,
  userImg: `w-28 h-28 md:w-40 md:h-40 bg-fill-weak dark:bg-fill-strong p-2 object-cover mx-auto md:ml-4 -mt-[60px] md:-mt-[85px]`,
  editUserImg: `ri-edit-2-fill transition-all duration-200 hover:brightness-125 flex justify-center items-center p-2 drop-shadow-md rounded-full text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong w-8 h-8 md:w-10 md:h-10 text-xl absolute z-20 -top-2 -right-2 cursor-pointer`,
  userMetadataContainer: `absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-1 md:left-44`,
  nameStatusContainer: `flex flex-col md:flex-row items-center gap-x-2`,
  name: `text-3xl w-[80vw] md:w-fit line-clamp-1 text-center md:text-4xl font-semibold text-black dark:text-white`,
  usernameActivityContainer: `flex items-center justify-center md:justify-start gap-x-2 text-lg`,
  online: `ri-wifi-fill text-xl rounded-full p-1 cursor-pointer text-green`,
  offline: `ri-wifi-off-line text-xl rounded-full p-1 cursor-pointer text-orange`,
}
