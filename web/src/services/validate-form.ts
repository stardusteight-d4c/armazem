import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { error } from '../components/Toasters'
import { auth } from './firebase'

interface registerValuesParams {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export const disableButton = (registerValues: registerValuesParams) => {
  const booleanValues = []
  for (const [key, value] of Object.entries(registerValues)) {
    booleanValues.push(value.trim() == '')
  }
  const emptyInput = booleanValues.includes(true)
  return emptyInput
}

export const handleValidation = (
  registerValues: registerValuesParams,
  setProceedToConfirmEmail: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { firstName, lastName, username, password, email } = registerValues
  if (firstName.length < 2) {
    error('First name must contain at least 2 characters')
    return false
  } else if (lastName.length < 2) {
    error('Last name must contain at least 2 characters')
    return false
  } else if (username.length <= 3) {
    error('Username must contain more than 3 characters')
    return false
  } else if (password.length < 8) {
    error('Password must contain at least 8 characters')
    return false
  } else if (email !== '<empty>' && !validateEmail(email)) {
    error('Enter a valid email address')
    return false
  }
  setProceedToConfirmEmail(true)
  return true
}

export function signInWithGoogle(setUser: React.Dispatch<React.SetStateAction<User>>) {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user)
    })
    .catch((error) => {
      console.log(error)
    })
}