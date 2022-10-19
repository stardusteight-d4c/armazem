import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  className: string
}

export const Button = ({ title, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`rounded-xl disabled:cursor-not-allowed disabled:brightness-75 font-semibold text-white w-full py-4 transition-all duration-200 hover:brightness-125 ${className}`}
    >
      {title}
    </button>
  )
}
