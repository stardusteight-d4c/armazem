import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Navbar, Sidebar } from '../components'
import { validateEmail } from '../components/login/integrate/validate-form'
import { error, success } from '../components/Toasters'
import {
  changeUserEmail,
  changeUserPassword,
  changeUserUsername,
  deleteAccount,
  sendTokenChangeEmailVerification,
} from '../services/api-routes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import bcryptjs from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { MobileNav } from '../components/menu'
import { MobileSearch } from '../components/menu/MobileSearch'

interface Props {}

export const Settings = (props: Props) => {
  const currentUser = useAppSelector((state) => state.armazem.currentUser)
  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [changeEmail, setChangeEmail] = useState({
    newEmail: '',
    confirmToken: '',
  })
  const [changeUsername, setChangeUsername] = useState({
    newUsername: '',
  })
  const [requestToken, setRequestToken] = useState<any>(undefined)
  const [token, setToken] = useState<any>(undefined)
  const [backendEmail, setBackendEmail] = useState<any>(undefined)
  const [isTokenValid, setIsTokenValid] = useState<any>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [confirmDeleteAccount, setConfirmDeleteAccount] =
    useState<boolean>(false)
  const navigate = useNavigate()
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  // definir loading para sent email to

  function handleToken(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmailValue = event.target.value
    const isGmailAddress = newEmailValue.match(/gmail.com/)

    if (validateEmail(newEmailValue) && !currentUser?.password) {
      if (!isGmailAddress) {
        newEmailValue.match(/.com/) && error('Email is not a gmail address')
      } else {
        success('Email is a gmail address')
        setRequestToken(false)
      }
    } else {
      setRequestToken(undefined)
    }

    if (currentUser?.password) {
      if (validateEmail(newEmailValue)) {
        setRequestToken(false)
      } else {
        setRequestToken(undefined)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      if (token) {
        setIsTokenValid(bcryptjs.compareSync(changeEmail.confirmToken, token))
      }
    })()
  }, [changeEmail.confirmToken])

  async function sendToken() {
    setLoading(true)
    const { data } = await axios.post(sendTokenChangeEmailVerification, {
      userId: currentUser?._id,
      email: changeEmail.newEmail,
    })
    if (data.status === true) {
      success(data.msg)
      setToken(data.token)
      setRequestToken(true)
      setBackendEmail(data.email)
      setLoading(false)
    } else if (data.status === false) {
      error(data.msg)
      setLoading(false)
    }
  }

  async function handleSubmitChangePassword() {
    if (changePassword.newPassword.length < 8) {
      error('Password must contain at least 8 characters')
      return false
    } else if (changePassword.newPassword !== changePassword.confirmPassword) {
      error('Passwords do not match')
      return false
    }
    const { data } = await axios.post(changeUserPassword, {
      userId: currentUser?._id,
      currentPassword: changePassword.currentPassword,
      newPassword: changePassword.newPassword,
    })
    if (data.status === true) {
      success(data.msg)
      setChangePassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } else if (data.status === false) {
      error(data.msg)
    }
  }

  async function handleSubmitChangeEmail() {
    if (!isTokenValid) {
      error('Invalid token')
      return false
    }
    if (changeEmail.newEmail !== backendEmail) {
      error('Do not change the entered email')
      return false
    }
    if (validateEmail(changeEmail.newEmail)) {
      const { data } = await axios.post(changeUserEmail, {
        userId: currentUser?._id,
        newEmail: changeEmail.newEmail,
      })
      if (data.status === true) {
        success(data.msg)
        setChangeEmail({
          newEmail: '',
          confirmToken: '',
        })
        setBackendEmail(null)
        setToken(null)
        setRequestToken(undefined)
      }
    }
  }

  async function handleSubmitChangeUsername() {
    const { data } = await axios.post(changeUserUsername, {
      username: changeUsername.newUsername,
      userId: currentUser?._id,
    })
    if (data.status === true) {
      success(data.msg)
      setChangeUsername({
        newUsername: '',
      })
    } else if (data.status === false) {
      error(data.msg)
    }
  }

  async function handleSubmitDeleteAccount() {
    const { data } = await axios.delete(deleteAccount, {
      params: {
        userId: currentUser?._id,
        accountId: currentUser?.account,
      },
    })
    if (data.status === true) {
      success(data.msg)
      localStorage.removeItem('session')
      localStorage.removeItem('menu')
      navigate('/login')
    } else if (data.status === false) {
      error(data.msg)
    }
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassword({
      ...changePassword,
      [event.target.id]: event.target.value,
    })
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeEmail({
      ...changeEmail,
      [event.target.id]: event.target.value,
    })
  }

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
        className={`${style.mainContent} ${
        minimizeSidebar
            ? 'col-span-1 md:col-span-17'
            : 'col-span-1 md:col-span-4'
        }`}
      >
        <Navbar />
        <MobileSearch />
        <MobileNav />
        <main>
          <div className="p-4 pb-24 md:pb-14">
            <h2 className="text-2xl flex items-center gap-x-2 pb-1 mb-4 border-b border-dawn-weak/20 dark:border-dusk-weak/20 font-bold">
              Settings
            </h2>
            <div className="md:flex w-full items-center justify-between md:pr-28">
              <h2 className="text-xl flex items-center gap-x-2 pb-1 mb-4 font-bold">
                Change password
              </h2>
              <div className="w-full md:w-[50%] flex flex-col gap-y-5">
                {currentUser?.password ? (
                  <>
                    <div>
                      <label htmlFor="currentPassword" className={style.label}>
                        Current password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        onChange={(e) => handleChangePassword(e)}
                        required
                        value={changePassword.currentPassword}
                        maxLength={50}
                        placeholder="Current password"
                        className={`${style.input} placeholder:text-sm text-xl`}
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className={style.label}>
                        New password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        onChange={(e) => handleChangePassword(e)}
                        required
                        value={changePassword.newPassword}
                        maxLength={50}
                        placeholder="New password"
                        className={`${style.input} placeholder:text-sm text-xl`}
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className={style.label}>
                        Confirm password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={changePassword.confirmPassword}
                        onChange={(e) => handleChangePassword(e)}
                        required
                        maxLength={50}
                        placeholder="Confirm password"
                        className={`${style.input} placeholder:text-sm text-xl`}
                      />
                    </div>
                    <Button
                      type="submit"
                      title="Submit"
                      onClick={handleSubmitChangePassword}
                      className="bg-prime-blue md:!w-[50%] -mt-2"
                    />
                  </>
                ) : (
                  <span className="text-base mx-auto w-fit md:mx-0 text-center md:text-left md:my-8 text-dusk-weak">
                    Your account was created using the{' '}
                    <a
                      href="https://cloud.google.com/identity-platform/docs/web/google"
                      target="_blank"
                      className="text-prime-blue hover:underline"
                    >
                      google provider
                    </a>
                    , so you don't have a password defined. Don't worry, even
                    without a password your account remains protected.
                  </span>
                )}
              </div>
            </div>
            <div className="md:flex w-full items-center justify-between pt-10 md:pr-28">
              <div className="md:w-[45%]">
                <h2 className="text-xl flex items-center gap-x-2 font-bold">
                  Change email
                </h2>
                {!currentUser?.password && (
                  <span className="text-sm text-dusk-weak md:pb-0">
                    You authenticated via google provider, so only gmail email
                    addresses will be allowed.
                  </span>
                )}
              </div>
              <div className="md:w-[50%] mt-5 md:mt-0 flex flex-col gap-y-5">
                <div>
                  <label htmlFor="newEmail" className={style.label}>
                    New email
                  </label>
                  <div>
                    <input
                      type="text"
                      id="newEmail"
                      onChange={(e) => {
                        handleChangeEmail(e)
                        handleToken(e)
                      }}
                      value={changeEmail.newEmail}
                      required
                      maxLength={50}
                      placeholder="New email"
                      className={`${style.input} placeholder:text-sm text-xl`}
                    />
                    {requestToken && (
                      <div className="flex font-medium text-white items-center gap-x-1 cursor-pointer">
                        <Button
                          title="Token sent"
                          className="py-1 px-2 mt-2 bg-green rounded-sm"
                        />
                      </div>
                    )}
                    {requestToken === false && (
                      <div
                        onClick={sendToken}
                        className="flex font-medium text-white items-center gap-x-1 cursor-pointer"
                      >
                        <Button
                          title={`Send token to ${changeEmail.newEmail}`}
                          loading={loading}
                          className="py-1 px-2 mt-2 bg-prime-blue rounded-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="token" className={style.label}>
                    Confirm token
                  </label>
                  <input
                    type="text"
                    id="confirmToken"
                    onChange={(e) => {
                      handleChangeEmail(e)
                    }}
                    value={changeEmail.confirmToken}
                    required
                    maxLength={50}
                    placeholder="Paste token here"
                    className={`${style.input} ${
                      (isTokenValid === true && '!ring-green') ||
                      (isTokenValid === false && '!ring-red')
                    } placeholder:text-sm text-xl`}
                  />
                </div>
                <Button
                  onClick={handleSubmitChangeEmail}
                  disabled={!token && !backendEmail}
                  title="Submit"
                  className="bg-prime-blue md:!w-[50%] -mt-2"
                />
              </div>
            </div>
            <div className="md:flex w-full items-center pt-10 justify-between md:pr-28">
              <div className="md:w-[45%] mb-4 md:mb-0">
                <h2 className="text-xl flex items-center gap-x-2 mb-4 md:mb-0 font-bold">
                  Change username
                </h2>
                <span className="text-sm text-dusk-weak">
                  <i className="text-red text-base">*</i> Your username is
                  public.
                </span>{' '}
                <br />
                <span className="text-sm text-dusk-weak">
                  <i className="text-red text-base">*</i> You may only change
                  your username once every month.
                </span>
                <br />
                <span className="text-sm text-dusk-weak">
                  <i className="text-red text-base">*</i> If you change your
                  username, all links that used to go to your old username will
                  no longer work.
                </span>
              </div>
              <div className="md:w-[50%] flex flex-col gap-y-5">
                <div>
                  <label htmlFor="newUsername" className={style.label}>
                    New username
                  </label>
                  <input
                    type="text"
                    id="newUsername"
                    onChange={(e) =>
                      setChangeUsername({
                        ...changeUsername,
                        [e.target.id]: e.target.value,
                      })
                    }
                    required
                    maxLength={50}
                    placeholder="New username"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                </div>
                <Button
                  type="submit"
                  title="Submit"
                  onClick={handleSubmitChangeUsername}
                  className="bg-prime-blue -mt-2 md:!w-[50%]"
                />
              </div>
            </div>
            <div className="md:flex w-full items-center mt-16 justify-between md:pr-28">
              <h2 className="text-xl mb-4 md:mb-0 flex items-center gap-x-2 text-red font-bold">
                Delete account
              </h2>
              <div className="md:w-[50%] flex flex-col gap-y-5">
                <div>
                  All account deletion requests are{' '}
                  <strong className="text-red">permanent</strong>. You cannot
                  reactivate a deleted account or recover any account
                  information after requesting a deletion. This includes Armazem
                  supporter status, manga lists, private messages, and more.
                </div>
                <div className="relative ">
                  <Button
                    type="submit"
                    onClick={(e) => setConfirmDeleteAccount(true)}
                    title="Delete my account"
                    className="bg-red -mt-2 md:w-[50%] my-1"
                  />
                  {confirmDeleteAccount && (
                    <div className="absolute space-x-2">
                      <span>Really want to delete your account?</span>
                      <span
                        onClick={handleSubmitDeleteAccount}
                        className="text-red font-medium cursor-pointer hover:underline"
                      >
                        Delete
                      </span>
                      <span>/</span>
                      <span
                        onClick={() => setConfirmDeleteAccount(false)}
                        className="text-prime-blue font-medium cursor-pointer hover:underline"
                      >
                        Cancel
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden lg:max-w-screen-xl border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
  label: `text-dusk-main pb-1 dark:text-dawn-main text-lg md:text-xl w-full block font-semibold`,
  input: `w-full p-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg`,
}
