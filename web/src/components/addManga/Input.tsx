import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

export const Input = ({ id, label, ...props }: Props) => {
  return (
    <>
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        required
        className={style.input}
      />
    </>
  )
}

const style = {
  label: `text-dusk-main dark:text-dawn-main text-xl w-full block font-semibold`,
  input: `w-full p-4 bg-layer-light dark:bg-layer-heavy text-sm placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg placeholder:text-sm text-xl`,
}
