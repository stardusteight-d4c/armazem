import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAOWbwR2kRzO4OQ758Z_xt_5fFffocU048',
  authDomain: 'anistorage.firebaseapp.com',
  projectId: 'anistorage',
  storageBucket: 'anistorage.appspot.com',
  messagingSenderId: '85314920491',
  appId: '1:85314920491:web:800850ce332d4d574b8a6e',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
