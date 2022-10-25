import { configureStore, createSlice } from '@reduxjs/toolkit'
import { getUserData } from './reducers/current-user-data'

// import { } from '../Types'

const initialState: InitialState = {
  theme: 'dark',
  authSession: {
    user_id: null,
    email: null,
  },
  currentUser: null,
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

// pegar dados do usuário através do asyncthunk

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
    handleAuthSession: (state, action) => {
      state.authSession = action.payload
    },
    clearAuthSession: (state) => {
      console.log('initialState.authSession', initialState.authSession)

      state.authSession = initialState.authSession
    },
    clearCurrentUser: (state) => {
      console.log('initialState.currentUser', initialState.currentUser)
      
      state.currentUser = initialState.currentUser
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      action.payload && (state.currentUser = action.payload.user)
    })
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

export const {
  handleSwitchTheme,
  handleChangeRegisterValues,
  clearRegisterValuesEntries,
  handleAuthSession,
  clearAuthSession,
  clearCurrentUser,
} = ArmazemSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
