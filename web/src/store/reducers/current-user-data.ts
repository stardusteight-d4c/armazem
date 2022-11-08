import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'
import { accountDataByUserId, userData } from '../../services/api-routes'

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

export const getCurrentUserAccount = createAsyncThunk(
  'currentUserAccount/data',
  async (_, { getState }) => {
    const {
      armazem: { currentUser },
    } = getState() as RootState
    if (currentUser) {
      const user_id = currentUser._id
      const { data } = await axios.get(`${accountDataByUserId}/${user_id}`)
      return data.account
    }
  }
)
