import { motion } from 'framer-motion'
import { useAppDispatch } from '../../store/hooks'
import { handleOpenModal } from '../../store'

interface Props {}

export const Overlay = (props: Props) => {
  const dispatch = useAppDispatch()

  const overleyProperties = {
    onClick: () => dispatch(handleOpenModal(null)),
    initial: { opacity: 0 },
    transition: { duration: 0.5 },
    animate: { opacity: 1 },
    className: style.overlay,
  }

  return <motion.div {...overleyProperties} />
}

const style = {
  overlay: `fixed z-40 inset-0 w-screen h-screen dark:bg-fill-weak/10 bg-fill-strong/10`,
}
