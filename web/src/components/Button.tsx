import React, { ButtonHTMLAttributes } from 'react'
import { Loader } from './Loader'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  className: string
  loading?: boolean
}

export const Button = ({ title, className, loading, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`rounded-lg disabled:cursor-not-allowed disabled:brightness-90 font-semibold text-white w-full py-4 transition-all duration-200 hover:brightness-110 ${className}`}
    >
      {loading ? <Loader /> : title}
    </button>
  )
}
