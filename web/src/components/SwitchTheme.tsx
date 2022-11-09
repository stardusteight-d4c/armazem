import { handleSwitchTheme } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { motion } from 'framer-motion'

interface Props {}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

export const SwitchTheme = (props: Props) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.armazem.theme)

  return (
    <div
      title="Switch Theme"
      onClick={() => dispatch(handleSwitchTheme())}
      className={`${style.wrapper} ${
        theme === 'dark' ? 'justify-end' : 'justify-start'
      }`}
    >
      <span className={style.lightIconContainer}>
        <i className={style.lighIcon} />
      </span>
      <motion.div
        className={style.cylinderWrapper}
        layout
        transition={spring}
      />
      <span className={style.darkIconContainer}>
        <i className={style.darkIcon} />
      </span>
    </div>
  )
}

const style = {
  wrapper: `bg-fill-strong dark:bg-fill-weak dark:text-fill-strong text-fill-weak flex items-center px-0.5 cursor-pointer rounded-full h-6 w-12 flex-shrink-0 relative`,
  lightIconContainer: `absolute left-0.5`,
  lighIcon: `ri-flashlight-fill w-4 h-4`,
  cylinderWrapper: `z-40 w-5 h-5 bg-fill-weak dark:bg-fill-strong rounded-full`,
  darkIconContainer: `absolute right-0.5`,
  darkIcon: `ri-moon-fill w-4 h-4`,
}
