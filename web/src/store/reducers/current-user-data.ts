import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'
import { userData } from '../../services/api-routes'

export const getUserData = createAsyncThunk(
  'currentUser/data',
  async (_, { getState }) => {
    const {
      armazem: { authSession, currentUser },
    } = getState() as RootState
    // if (currentUser !== null) {
    //   return
    // }
    const user_id = authSession.user_id
    const { data } = await axios.get(`${userData}/${user_id}`)
    return data
  }
)

// getCurrentUserAccount and UserAccount

// export const getCurrentUserAccount = createAsyncThunk(
//   'CurrentUserAccount/data',
//   async (_, { getState }) => {
//     const {
//       armazem: { currentUser },
//     } = getState() as RootState
//     if (currentUser) {
//       const user_id = currentUser._id
//       const { data } = await axios.get(`${userAccount}/${user_id}`)

//       return data
//     }
//   }
// )