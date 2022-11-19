import { useEffect, useState } from 'react'
import { Button, Navbar, Sidebar } from '../components'
import { useAppDispatch, useAppSelector } from '../store/hooks'

interface Props {}

export const Settings = (props: Props) => {
  const minimizeSidebar = useAppSelector(
    (state) => state.armazem.minimizeSidebar
  )

  return (
    <div
      className={`${style.gridContainer} ${
        minimizeSidebar ? 'grid-cols-18' : 'grid-cols-5'
      }`}
    >
      <Sidebar />
      <div
        className={`${style.mainContent} ${
          minimizeSidebar ? 'col-span-17' : 'col-span-4'
        }`}
      >
        <Navbar />
        <main>
          <div className="p-4 pb-14">
            <h2 className="text-2xl flex items-center gap-x-2 pb-1 mb-4 border-b border-dawn-weak/20 dark:border-dusk-weak/20 font-bold">
              Settings
            </h2>
            <div className="flex w-full items-center justify-between pr-28">
              <h2 className="text-xl flex items-center gap-x-2 pb-1 mb-4 font-bold">
                Change password
              </h2>
              <div className="w-[50%] flex flex-col gap-y-5">
                <div>
                  <label htmlFor="newPassword" className={style.label}>
                    New password
                  </label>
                  <input
                    type="text"
                    id="newPassword"
                    required
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
                    type="text"
                    id="confirmPassword"
                    required
                    maxLength={50}
                    placeholder="Confirm password"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                </div>
                <Button
                  type="submit"
                  title="Submit"
                  className="bg-prime-blue !w-[50%] -mt-2"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-10 pr-28">
              <h2 className="text-xl flex items-center gap-x-2 pb-1 mb-4 font-bold">
                Change email
              </h2>
              <div className="w-[50%] flex flex-col gap-y-5">
                <div>
                  <label htmlFor="newEmail" className={style.label}>
                    New email
                  </label>
                  <div>
                    <input
                      type="text"
                      id="newEmail"
                      required
                      maxLength={50}
                      placeholder="New email"
                      className={`${style.input} placeholder:text-sm text-xl`}
                    />
                    <div className="flex items-center gap-x-1 cursor-pointer">
                      <i className="ri-checkbox-blank-line text-xl" />
                      <span className="text-dusk-weak">Request token</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="token" className={style.label}>
                    Confirm token
                  </label>
                  <input
                    type="text"
                    id="token"
                    required
                    maxLength={50}
                    placeholder="Paste token here"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                </div>
                <Button
                  type="submit"
                  title="Submit"
                  className="bg-prime-blue !w-[50%] -mt-2"
                />
              </div>
            </div>
            <div className="flex w-full items-center pt-10 justify-between pr-28">
              <div className="w-[45%]">
                <h2 className="text-xl flex items-center gap-x-2  font-bold">
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
              <div className="w-[50%] flex flex-col gap-y-5">
                <div>
                  <label htmlFor="newUsername" className={style.label}>
                    New username
                  </label>
                  <input
                    type="text"
                    id="newUsername"
                    required
                    maxLength={50}
                    placeholder="New username"
                    className={`${style.input} placeholder:text-sm text-xl`}
                  />
                </div>
                <Button
                  type="submit"
                  title="Submit"
                  className="bg-prime-blue -mt-2 !w-[50%]"
                />
              </div>
            </div>
            <div className="flex w-full items-center mt-16 justify-between pr-28">
              <h2 className="text-xl flex items-center gap-x-2 text-red font-bold">
                Delete account
              </h2>
              <div className="w-[50%] flex flex-col gap-y-5">
                <div>
                  All account deletion requests are{' '}
                  <strong className="text-red">permanent</strong>. You cannot
                  reactivate a deleted account or recover any account
                  information after requesting a deletion. This includes Armazem
                  supporter status, anime/manga lists, private messages, and
                  more.
                </div>
                <Button
                  type="submit"
                  title="Delete my account"
                  className="bg-red -mt-2 !w-[50%] my-1"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const style = {
  gridContainer: `grid overflow-hidden max-w-screen-xl drop-shadow-sm border-x border-x-dawn-weak/20 dark:border-x-dusk-weak/20 mx-auto overflow-x-hidden text-dusk-main dark:text-dawn-main bg-fill-weak dark:bg-fill-strong`,
  mainContent: `col-start-2`,
  label: `text-dusk-main pb-1 dark:text-dawn-main text-xl w-full block font-semibold`,
  input: `w-full p-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg`,
}
