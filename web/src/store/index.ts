import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Action } from '@remix-run/router'
import {
  getCurrentUserAccount,
  getUserData,
} from './reducers/current-user-data'

const initialState: InitialState = {
  theme: 'dark',
  authSession: {
    user_id: null,
    email: null,
  },
  currentUser: null,
  currentAccount: [],
  userMetadata: null,
  registerValues: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
  },
  openModal: null,
  requestAgain: false,
  requestEditProfile: false,
  minimizeSidebar: false,
  activeReview: '',
}

const saveThemeToLocalStorage = (themeState: any) => {
  try {
    localStorage.setItem('theme', themeState)
  } catch (e) {
    console.warn(e)
  }
}

const saveMenuStatusToLocalStorage = (menuState: any) => {
  try {
    localStorage.setItem('menu', menuState)
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
    handleMinimizeSidebar: (state) => {
      const storage = localStorage.getItem('menu')
      if (storage) {
        storage == 'false' && (state.minimizeSidebar = false)
        storage == 'true' && (state.minimizeSidebar = true)
      }
      state.minimizeSidebar = !state.minimizeSidebar
      saveMenuStatusToLocalStorage(state.minimizeSidebar)
    },
    clearRegisterValuesEntries: (state) => {
      state.registerValues = initialState.registerValues
    },
    handleAuthSession: (state, action) => {
      state.authSession = action.payload
    },
    handleUserMetadata: (state, action) => {
      state.userMetadata = action.payload
    },
    clearAuthSession: (state) => {
      state.authSession = initialState.authSession
    },
    clearCurrentUser: (state) => {
      state.currentUser = initialState.currentUser
    },
    handleOpenModal: (state, action) => {
      state.openModal = action.payload
    },
    handleActiveReview: (state, action) => {
      state.activeReview = action.payload
    },
    askToRequestAgain: (state) => {
      state.requestAgain = !state.requestAgain
    },
    askToRequestEditProfile: (state) => {
      state.requestAgain = !state.requestEditProfile
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      action.payload && (state.currentUser = action.payload.user)
    })
    builder.addCase(getCurrentUserAccount.fulfilled, (state, action) => {
      action.payload && (state.currentAccount = action.payload)
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
  handleOpenModal,
  handleUserMetadata,
  askToRequestAgain,
  askToRequestEditProfile,
  handleMinimizeSidebar,
  handleActiveReview,
} = ArmazemSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
