interface InitialState {
  theme: string
  authSession: Session
  currentUser: User | null
  currentAccount: Account | Array
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
  account: string
}

interface Account {
  _id: string
  user: string
  requestsReceived: [{ from: string }]
  requestsSent: [{ to: string }]
  connections: [{ with: string }]
}

interface Posts {
  post: Post
}

interface Post {
  _id: string
  by: string
  title: string
  body: string
  discussions: Discussions
  likes: Array
  createdAt: string
  updatedAt: string
}

interface Discussions {
  mainDiscussion: {
    by: string
    body: string
  }
}
