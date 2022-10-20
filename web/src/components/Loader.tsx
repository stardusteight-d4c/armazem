import React from 'react'

interface Props {}

export const Loader = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border border-l-transparent animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  )
}
