import { Navigate } from 'react-router-dom'
import { AddManga } from '../pages'
import { useAppSelector } from '../store/hooks'

interface Props {}

export const PrivateRouteAddManga = (props: Props) => {
  const adminRole = import.meta.env.VITE_ADMIN_ROLE
  const currentUser = useAppSelector((state) => state.armazem.currentUser)

  return (
    <>
      {currentUser?.role && currentUser?.role === adminRole ? (
        <AddManga />
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}
