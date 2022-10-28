export const hostServer = 'http://localhost:5000'

// AUTH
export const validateSignUp = `${hostServer}/api/auth/validateSignUp`
export const emailConfirmation = `${hostServer}/api/auth/emailConfirmation`
export const register = `${hostServer}/api/auth/register`
export const registerGoogleAccount = `${hostServer}/api/auth/registerGoogleAccount`
export const login = `${hostServer}/api/auth/login`
export const verifyEmailAddress = `${hostServer}/api/auth/verifyEmailAddress`
export const loginByGoogleProvider = `${hostServer}/api/auth/loginByGoogleProvider`
export const authorization = `${hostServer}/api/auth/middleware/checkSession`

// USER
export const userData = `${hostServer}/api/user` // /:id
export const dataByUsername = `${hostServer}/api/user/username` // /:username
export const updateCoverImage = `${hostServer}/api/user/updateCoverImage` 
export const updateProfileImage = `${hostServer}/api/user/updateProfileImage` 
export const searchUsersByQuery = `${hostServer}/api/user/searchUsersByQuery` 

// ACCOUNT
export const sendRequest = `${hostServer}/api/account/sendRequest` 
export const accountDataByUserId = `${hostServer}/api/account/accountDataByUserId` // /:id


