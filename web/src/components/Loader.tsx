import React from 'react'

interface Props {
  className?: string
}

export const Loader = ({ className }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`spinner-border !border-l-transparent animate-spin inline-block w-8 h-8 border-4 rounded-full ${className}`}
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  )
}
