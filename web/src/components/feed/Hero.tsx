import { useEffect, useRef, useState } from 'react'
import { banners } from './integrate/banners-data'

interface Props {}

export const Hero = (props: Props) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [index, setIndex] = useState<number>(0)
  const delay = 3500

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    )
    return () => {
      resetTimeout()
    }
  }, [index])

  return (
    <header className={style.slideshow}>
      <div
        className={style.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {banners.map((banner, index) => (
          <a target="_blank" href={banner.link} key={index}>
            <img className={style.slide} src={banner.img} />
          </a>
        ))}
      </div>
      <div className={style.slideshowDots}>
        {banners.map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              setIndex(idx)
            }}
            className={`${style.slideshowDot} ${
              index === idx && '!bg-white !w-8'
            }`}
          />
        ))}
      </div>
    </header>
  )
}

const style = {
  slideshow: `my-0 relative rounded-lg min-h-[300px] max-h-[300px] mx-auto overflow-hidden`,
  slideshowSlider: `whitespace-nowrap rounded-lg transition-all duration-1000`,
  slide: `w-full cursor-pointer h-[300px] inline-block rounded-lg`,
  slideshowDots: `absolute bottom-2 flex gap-x-2 left-[48%] -translate-x-1/2`,
  slideshowDot: `inline-block w-4 h-4 rounded-full cursor-pointer bg-[#1a1d1e]/80`,
}
