import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  className?: any
}

export const Input = ({ id, label, className, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
      <input {...props} id={id} className={`${style.input} ${className}`} />
    </div>
  )
}

const style = {
  label: `text-dusk-main pb-1 dark:text-dawn-main text-lg md:text-xl w-full block font-semibold`,
  input: `w-full p-4 bg-layer-light placeholder:text-sm text-xl dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg`,
}
