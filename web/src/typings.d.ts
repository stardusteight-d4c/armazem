interface InitialState {
  theme: string
  authSession: Session
  currentUser: User | null
  userMetadata: User | null
  registerValues: RegisterValues
  openModal: string | null
  requestAgain: boolean
  usersSearch: [object] | null
}

interface RegisterValues {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
}

interface Session {
  user_id: string | null
  email: string | null
  iat?: string
  exp?: string
}

interface User {
  _id: string
  email: string
  name: string
  username: string
  user_img: string
  cover_img: string
} 