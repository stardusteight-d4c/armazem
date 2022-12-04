import { useState } from 'react'

interface Props {}

export const BackToTop = (props: Props) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' /* you can also use 'auto' behaviour
         in place of 'smooth' */,
    })
  }
  window.addEventListener('scroll', toggleVisible)
  return (
    <div
      style={{ display: visible ? 'inline' : 'none' }}
      className="md:hidden flex items-center text-center justify-center absolute right-6 -top-12 rounded-full bg-layer-heavy dark:bg-layer-light w-8 h-8"
    >
      <i
        onClick={scrollToTop}
        className="ri-arrow-up-line text-fill-weak dark:text-fill-strong text-2xl"
      />
    </div>
  )
}
