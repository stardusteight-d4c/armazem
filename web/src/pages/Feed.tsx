import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SwitchTheme } from '../components/SwitchTheme'

interface Props {}

export const Feed = (props: Props) => {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('session')
    if (user) {
      const dataSession = JSON.parse(user)
      setSession(dataSession)
    } else {
      navigate('/login')
    }
  }, [])

  console.log(session)

  return (
    <>
      {session ? (
        <div className="min-h-screen bg-white dark:bg-black">
          <SwitchTheme />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
