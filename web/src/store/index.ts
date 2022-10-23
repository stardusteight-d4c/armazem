import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import { } from '../Types'

const initialState = {
  theme: 'dark',
  registerValues: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '<empty>',
  },
}

const saveThemeToLocalStorage = (themeState: any) => {
  try {
    localStorage.setItem('theme', themeState)
  } catch (e) {
    console.warn(e)
  }
}

const ArmazemSlice = createSlice({
  name: 'ArmazemSlice',
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
    handleChangeRegisterValues: (state, action) => {
      state.registerValues = {
        ...state.registerValues,
        [action.payload.target.id]: action.payload.target.value,
      }
    },
    clearRegisterValuesEntries: (state) => {
      state.registerValues = initialState.registerValues
    },
  },
})

export const store = configureStore({
  reducer: {
    armazem: ArmazemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['ArmazemSlice/handleChangeRegisterValues'],
      },
    }),
})

export const { handleSwitchTheme, handleChangeRegisterValues, clearRegisterValuesEntries } =
ArmazemSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
