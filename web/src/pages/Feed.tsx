import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../components/SwitchTheme'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const session = true

  useEffect(() => {
    !session && navigate('/login')
  }, [session])

  return (
    <>
      {session ? (
        <div className="min-h-screen bg-white dark:bg-black"><SwitchTheme /></div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
