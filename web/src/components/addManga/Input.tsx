import React, { InputHTMLAttributes } from 'react'

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string
  label: string
  className: string
  textarea?: boolean
}

export const Input = ({ id, label, className, textarea, ...props }: Props) => {
  return (
    <div className={className}>
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
      {textarea ? (
        <textarea id={id} className={style.textarea} {...props} />
      ) : (
        <input {...props} id={id} required className={style.input} />
      )}
    </div>
  )
}

const style = {
  label: `text-dusk-main dark:text-dawn-main text-xl w-fit mr-auto block font-semibold`,
  input: `w-full p-4 bg-layer-light dark:bg-layer-heavy placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg placeholder:text-sm`,
  textarea: `w-full p-4 resize-none min-h-[250px] max-h-[250px] bg-layer-light dark:bg-layer-heavy placeholder:text-dusk-weak outline-none focus:ring-[2px] focus:ring-prime-purple rounded-lg placeholder:text-sm`,
}
