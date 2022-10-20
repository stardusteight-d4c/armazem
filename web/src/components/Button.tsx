import React, { ButtonHTMLAttributes } from 'react'
import { Loader } from './Loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  className: string
  loading?: boolean
}

export const Button = ({ title, className, loading, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`rounded-xl disabled:cursor-not-allowed disabled:brightness-75 font-semibold text-white w-full py-4 transition-all duration-200 hover:brightness-125 ${className}`}
    >
      {loading ? <Loader /> : title}
    </button>
  )
}
