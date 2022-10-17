import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const session = false

  useEffect(() => {
    !session && navigate('/login')
  }, [session])

  return (
    <>
      {session ? (
        <div className="min-h-screen">Feed</div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
