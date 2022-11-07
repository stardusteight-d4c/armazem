import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const spring = {
  type: 'spring',
  stiffness: 800,
  damping: 20,
}

export const error = (error: string) =>
  toast.custom(
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="bg-fill-weak z-50 dark:bg-fill-strong drop-shadow-md text-fill-strong dark:text-fill-weak border-l-4 border-red py-3 px-4"
    >
      {error}
    </motion.div>
  )

export const success = (success: string) =>
  toast.custom(
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="bg-fill-weak z-50 dark:bg-fill-strong drop-shadow-md text-fill-strong dark:text-fill-weak border-l-4 border-green py-3 px-4"
    >
      {success}
    </motion.div>
  )
