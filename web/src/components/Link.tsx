import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  to: string
}

export const Link = ({ children, to, ...props }: Props) => {
  const [click, setClick] = useState<boolean>()
  const navigate = useNavigate()

  // Prevents image dragging
  window.ondragstart = () => {
    return false
  }

  // Distinguishes drag and true click
  const delta = 6
  let startX: number
  let startY: number
  window.addEventListener('mousedown', function (event) {
    startX = event.pageX
    startY = event.pageY
  })
  window.addEventListener('mouseup', function (event) {
    const diffX = Math.abs(event.pageX - startX)
    const diffY = Math.abs(event.pageY - startY)
    if (diffX < delta && diffY < delta) {
      setClick(true)
    }
  })

  return (
    <div {...props} onClick={() => click && navigate(to)}>
      {children}
    </div>
  )
}
