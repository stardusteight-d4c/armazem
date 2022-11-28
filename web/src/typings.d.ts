interface InitialState {
  theme: string
  authSession: Session
  currentUser: User | null
  currentAccount: Account | Array
  userMetadata: User | null
  registerValues: RegisterValues
  openModal: string | null
  requestAgain: boolean
  requestEditProfile: boolean
  minimizeSidebar: boolean
  activeReview: string
  loading: string
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
  password: string
  lastActivity: string
  role: string
  account: string
}

interface Account {
  _id: string
  user: string
  requestsReceived: [{ from: string }]
  requestsSent: [{ to: string }]
  connections: [{ with: string }]
  mangaList: [Listed]
  favorites: [string]
}

interface Listed {
  chapRead: string
  mangaUid: string
  score: string
  status: string
  date: Date
}

interface Posts {
  post: Post
}

interface Post {
  _id: string
  by: string
  title: string
  body: string
  discussions: {
    _id: string
    by: string
    body: string
  }[]
  likes: Array
  createdAt: string
  updatedAt: string
}

interface Comment {
  _id: string
  by: string
  comment: string
  createdAt: string
}

interface Manga {
  _id: string
  uid: string
  title: string
  author: string
  synopsis: string
  cover: string
  chapters: string
  status: string
  serialization: string
  published: string
  genres: array
  score: [
    {
      userId: string
      score: number
    }
  ]
  readers: Array
  reviews: Array
  insertedBy: string
}
