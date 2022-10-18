import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { } from '../Types'

const initialState = {
  theme: 'dark',
}

const saveThemeToLocalStorage = (themeState: any) => {
  try {
    localStorage.setItem('theme', themeState)
  } catch (e) {
    console.warn(e)
  }
}

const ANiStorageSlice = createSlice({
  name: 'Netflix',
  initialState,
  reducers: {
    handleSwitchTheme: (state) => {
      const storage = localStorage.getItem('theme')
      storage && (state.theme = storage)
      if (state.theme === 'dark') {
        document.documentElement.classList.remove('dark')
        state.theme = 'light'
        saveThemeToLocalStorage(state.theme)
      } else if (state.theme === 'light') {
        document.documentElement.classList.add('dark')
        state.theme = 'dark'
        saveThemeToLocalStorage(state.theme)
      }
    },
  },
})

export const store = configureStore({
  reducer: {
    anistorage: ANiStorageSlice.reducer,
  },
})

export const { handleSwitchTheme } = ANiStorageSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
