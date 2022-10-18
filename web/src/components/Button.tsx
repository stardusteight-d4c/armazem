import React from 'react'

interface Props {
  title: string
  className?: string
}

export const Button = ({ title, className }: Props) => {
  return (
    <button
      className={`rounded-xl font-semibold w-full py-4 transition-all duration-200 ${className}`}
    >
      {title}
    </button>
  )
}
