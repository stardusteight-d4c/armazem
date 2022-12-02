import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '../components'
import { validateEmail } from '../components/login/integrate/validate-form'
import { error, success } from '../components/Toasters'
import {
  changeUserEmail,
  changeUserPassword,
  changeUserUsername,
  deleteAccount,
  sendTokenChangeEmailVerification,
} from '../services/api-routes'
import { useAppSelector } from '../store/hooks'
import bcryptjs from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { GridWrapper } from '../components/GridWrapper'
import { Input } from '../components/settings/Input'

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

  useEffect(() => {
    ;(async () => {
      if (token) {
        setIsTokenValid(bcryptjs.compareSync(changeEmail.confirmToken, token))
      }
    })()
  }, [changeEmail.confirmToken])

  const handleToken = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const sendToken = async () => {
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

  const handleSubmitChangePassword = async () => {
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

  const handleSubmitChangeEmail = async () => {
    if (!isTokenValid) {
      error('Invalid token')
      return false
    }
    if (changeEmail.newEmail !== backendEmail) {
      error('Do not change the entered email')
      return false
    }
    if (validateEmail(changeEmail.newEmail)) {
      await axios
        .post(changeUserEmail, {
          userId: currentUser?._id,
          newEmail: changeEmail.newEmail,
        })
        .then(({ data }) => {
          success(data.msg)
          setChangeEmail({
            newEmail: '',
            confirmToken: '',
          })
        })
        .catch((error) => console.log(error.toJSON()))
        .finally(() => {
          setBackendEmail(null)
          setToken(null)
          setRequestToken(undefined)
        })
    }
  }

  const handleSubmitChangeUsername = async () => {
    await axios
      .post(changeUserUsername, {
        username: changeUsername.newUsername,
        userId: currentUser?._id,
      })
      .then(({ data }) => {
        success(data.msg)
        setChangeUsername({
          newUsername: '',
        })
      })
      .catch((error) => console.log(error.toJSON()))
  }

  const handleSubmitDeleteAccount = async () => {
    await axios
      .delete(deleteAccount, {
        params: {
          userId: currentUser?._id,
          accountId: currentUser?.account,
        },
      })
      .then(({ data }) => {
        success(data.msg)
        localStorage.removeItem('session')
        localStorage.removeItem('menu')
        navigate('/login')
      })
      .catch((error) => console.log(error.toJSON()))
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

  const inputProps = {
    currentPassword: {
      id: 'currentPassword',
      label: 'Current password',
      type: 'password',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChangePassword(e),
      value: changePassword.currentPassword,
      placeholder: 'Current password',
    },
    newPassword: {
      id: 'newPassword',
      label: 'New password',
      type: 'password',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChangePassword(e),
      value: changePassword.newPassword,
      placeholder: 'New password',
    },
    confirmPassword: {
      id: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleChangePassword(e),
      value: changePassword.confirmPassword,
      placeholder: 'Confirm password',
    },
    newEmail: {
      id: 'newEmail',
      label: 'New email',
      type: 'text',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeEmail(e)
        handleToken(e)
      },
      value: changeEmail.newEmail,
      placeholder: 'New email',
    },
    confirmToken: {
      id: 'confirmToken',
      label: 'Confirm token',
      type: 'text',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeEmail(e)
      },
      value: changeEmail.confirmToken,
      placeholder: 'Paste token here',
      className:
        (isTokenValid === true && '!ring-green') ||
        (isTokenValid === false && '!ring-red'),
    },
    newUsername: {
      id: 'newUsername',
      label: 'New username',
      type: 'text',
      maxLength: 50,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setChangeUsername({
          ...changeUsername,
          [e.target.id]: e.target.value,
        }),
      placeholder: 'New username',
    },
  }

  const rendersChangePassword = () => (
    <section className={style.sectionContainer}>
      <h2 className={style.sectionTitle}>Change password</h2>
      <div className={style.wrapperChangePassword}>
        {currentUser?.password ? (
          <div className="space-y-5">
            <Input {...inputProps.currentPassword} />
            <Input {...inputProps.newPassword} />
            <div>
              <Button
                type="submit"
                title="Submit"
                onClick={handleSubmitChangePassword}
                className={style.buttonSubmit}
              />
            </div>
          </div>
        ) : (
          <span className={style.notPassword}>
            Your account was created using the{' '}
            <a
              href="https://cloud.google.com/identity-platform/docs/web/google"
              target="_blank"
              className={style.link}
            >
              google provider
            </a>
            , so you don't have a password defined. Don't worry, even without a
            password your account remains protected.
          </span>
        )}
      </div>
    </section>
  )

  const rendersChangeEmail = () => (
    <section className={style.sectionContainer}>
      <div className="md:w-[45%]">
        <h2 className={style.sectionTitle}>Change email</h2>
        {!currentUser?.password && (
          <span className={style.spanOnlyGmailAddresses}>
            You authenticated via google provider, so only gmail email addresses
            will be allowed.
          </span>
        )}
      </div>
      <div className={style.wrapperChangeEmail}>
        <div>
          <Input {...inputProps.newEmail} />
          {requestToken && (
            <Button title="Token sent" className={style.tokenSent} />
          )}
          {requestToken === false && (
            <Button
              onClick={sendToken}
              title={`Send token to ${changeEmail.newEmail}`}
              loading={loading}
              className={style.sendToken}
            />
          )}
        </div>
        <Input {...inputProps.confirmToken} />
        <Button
          onClick={handleSubmitChangeEmail}
          disabled={!token && !backendEmail}
          title="Submit"
          className={style.buttonSubmit}
        />
      </div>
    </section>
  )

  const rendersChangeUsername = () => (
    <section className={style.sectionContainer}>
      <div className={style.changeUsernameInfoContainer}>
        <h2 className={style.sectionTitle}>Change username</h2>
        <span className={style.span}>
          <i className={style.alert}>*</i> Your username is public.
        </span>{' '}
        <br />
        <span className={style.span}>
          <i className={style.alert}>*</i> You may only change your username
          once every month.
        </span>
        <br />
        <span className={style.span}>
          <i className={style.alert}>*</i> If you change your username, all
          links that used to go to your old username will no longer work.
        </span>
      </div>
      <div className={style.changeUsernameInputContainer}>
        <Input {...inputProps.newUsername} />
        <Button
          type="submit"
          title="Submit"
          onClick={handleSubmitChangeUsername}
          className={style.buttonSubmit}
        />
      </div>
    </section>
  )

  const rendersDeleteAccount = () => (
    <section className={style.sectionContainer}>
      <h2 className={style.sectionTitle + ' text-red'}>Delete account</h2>
      <div className={style.wrapperDeleteAccount}>
        <div>
          All account deletion requests are{' '}
          <strong className="text-red">permanent</strong>. You cannot reactivate
          a deleted account or recover any account information after requesting
          a deletion. This includes Armazem supporter status, manga lists,
          private messages, and more.
        </div>
        <div className="relative">
          <Button
            type="submit"
            onClick={(e) => setConfirmDeleteAccount(true)}
            title="Delete my account"
            className={style.buttonDelete}
          />
          {confirmDeleteAccount && (
            <div className={style.spanContainer}>
              <span>Really want to delete your account?</span>
              <span
                onClick={handleSubmitDeleteAccount}
                className={style.spanConfirmDelete}
              >
                Delete
              </span>
              <span>/</span>
              <span
                onClick={() => setConfirmDeleteAccount(false)}
                className={style.spanCanelDelete}
              >
                Cancel
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )

  return (
    <GridWrapper>
      <main className={style.wrapper}>
        <h1 className={style.title}>Settings</h1>
        {rendersChangePassword()}
        {rendersChangeEmail()}
        {rendersChangeUsername()}
        {rendersDeleteAccount()}
      </main>
    </GridWrapper>
  )
}

const style = {
  wrapper: `p-4 pb-24 md:pb-14 space-y-14`,
  title: `text-2xl flex items-center gap-x-2 pb-1 mb-4 border-b border-dawn-weak/20 dark:border-dusk-weak/20 font-bold`,
  sectionContainer: `md:flex w-full items-center justify-between md:pr-28`,
  sectionTitle: `text-xl font-bold`,
  wrapperChangePassword: `w-full md:w-[50%] flex flex-col mt-5 md:mt-0`,
  buttonSubmit: `bg-prime-blue md:!w-[50%] -mt-2`,
  notPassword: `text-base w-fit md:my-8 text-dusk-weak`,
  link: `text-prime-blue hover:underline`,
  spanOnlyGmailAddresses: `text-sm text-dusk-weak md:pb-0`,
  wrapperChangeEmail: `md:w-[50%] mt-5 md:mt-0 flex flex-col gap-y-5`,
  tokenSent: `py-1 px-2 mt-2 bg-green rounded-sm`,
  sendToken: `py-1 px-2 mt-2 bg-prime-blue rounded-sm`,
  changeUsernameInfoContainer: `md:w-[45%] mb-4 md:mb-0`,
  span: `text-sm text-dusk-weak`,
  alert: `text-red text-base`,
  changeUsernameInputContainer: `md:w-[50%] flex flex-col gap-y-5`,
  wrapperDeleteAccount: `md:w-[50%] flex flex-col gap-y-5`,
  buttonDelete: `bg-red -mt-2 md:w-[50%] my-1`,
  spanContainer: `absolute space-x-2`,
  spanConfirmDelete: `text-red font-medium cursor-pointer hover:underline`,
  spanCanelDelete: `text-prime-blue font-medium cursor-pointer hover:underline`,
}
