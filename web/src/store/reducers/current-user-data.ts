import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'
import { userData } from '../../services/api-routes'

export const getUserData = createAsyncThunk(
  'currentUser/data',
  async (_, { getState }) => {
    const {
      armazem: { authSession },
    } = getState() as RootState
    const user_id = authSession.user_id
    const { data } = await axios.get(`${userData}/${user_id}`)
    return data
  }
)
