export const hostServer = 'http://localhost:5000'

// AUTH
export const verifyUsername = `${hostServer}/api/auth/verifyUsername`
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
export const activeUser = `${hostServer}/api/user/middleware/activeUser` // /:userId

// ACCOUNT
export const sendRequest = `${hostServer}/api/account/sendRequest` 
export const accountDataByUserId = `${hostServer}/api/account/accountDataByUserId` // /:id
export const addConnection = `${hostServer}/api/account/addConnection` 
export const rejectConnection = `${hostServer}/api/account/rejectConnection` 
export const removeConnection = `${hostServer}/api/account/removeConnection` 
export const sharedPosts = `${hostServer}/api/account/sharedPosts` 
export const lastFivePostsOfAccount = `${hostServer}/api/account/lastFivePostsOfAccount` // /:id
export const postByPagination = `${hostServer}/api/account/postByPagination` // /:userId/:page
export const searchUserPostByTitle = `${hostServer}/api/account/searchUserPostByTitle`
export const sharedPostByPagination = `${hostServer}/api/account/sharedPostByPagination` // /:accountId/:page
export const searchSharedPostByTitle = `${hostServer}/api/account/searchSharedPostByTitle` 
export const addComment = `${hostServer}/api/account/addComment` 
export const updateComment = `${hostServer}/api/account/updateComment` 
export const accountComments = `${hostServer}/api/account/accountComments` // /:accountId
export const deleteComment = `${hostServer}/api/account/deleteComment` 

// POST
export const createPostAndAddToUserAccount = `${hostServer}/api/post/createPostAndAddToUserAccount`
export const postMetadataById = `${hostServer}/api/post/postMetadataById` // /:id
export const addNewDiscussion = `${hostServer}/api/post/addNewDiscussion` 
export const discussionsByPostId = `${hostServer}/api/post/discussionsByPostId` // /:postId
export const addNewReply = `${hostServer}/api/post/addNewReply` 
export const repliesOfDiscussion = `${hostServer}/api/post/repliesOfDiscussion` // :discussionId
export const updateDiscussion = `${hostServer}/api/post/updateDiscussion`
export const updateReply = `${hostServer}/api/post/updateReply`
export const deleteDiscussion = `${hostServer}/api/post/deleteDiscussion`
export const deleteReply = `${hostServer}/api/post/deleteReply`
export const likePost = `${hostServer}/api/post/likePost`
export const unlikedPost = `${hostServer}/api/post/unlikedPost`
export const updatePost = `${hostServer}/api/post/updatePost`
export const deletePost = `${hostServer}/api/post/deletePost`
export const sharePost = `${hostServer}/api/post/sharePost`
export const unsharePost = `${hostServer}/api/post/unsharePost`
