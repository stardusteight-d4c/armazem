export const hostServer = import.meta.env.VITE_SERVER

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
export const addMangaToFavorites = `${hostServer}/api/account/addMangaToFavorites` 
export const removeMangaToFavorites = `${hostServer}/api/account/removeMangaToFavorites` 
export const mangaFavorites = `${hostServer}/api/account/mangaFavorites` // /:accountId
export const mangaListedByAccountId = `${hostServer}/api/account/mangaListedByAccountId` // /:accountId
export const updatesMangaList = `${hostServer}/api/account/updatesMangaList` // /:accountId

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
export const topRatedPost = `${hostServer}/api/post/topRatedPost`
export const recentPostsWithPagination = `${hostServer}/api/post/recentPostsWithPagination` // /:page

// MANGA
export const addManga = `${hostServer}/api/manga/addManga`
export const searchByTitle = `${hostServer}/api/manga/searchByTitle`
export const mangaByPagination = `${hostServer}/api/manga/mangaByPagination` // :page
export const mangaByUid = `${hostServer}/api/manga/mangaByUid` 
export const mangaByGenre = `${hostServer}/api/manga/mangaByGenre` // /:genre
export const mangaByGenreAndTitle = `${hostServer}/api/manga/mangaByGenreAndTitle` // /:genre /:title
export const addMangaToListed = `${hostServer}/api/manga/addMangaToListed` 
export const removeMangaToListed = `${hostServer}/api/manga/removeMangaToListed` 
export const addReview = `${hostServer}/api/manga/addReview` 
export const reviewsByPagination = `${hostServer}/api/manga/reviewsByPagination` // /:uid/:page
export const review = `${hostServer}/api/manga/review` // /:id
export const randomMangasByGenre = `${hostServer}/api/manga/randomMangasByGenre` // /:genre
export const mostRead = `${hostServer}/api/manga/mostRead` 

// MESSAGE
export const addMessage = `${hostServer}/api/message/addMessage`
export const allMessages = `${hostServer}/api/message/allMessages` // ?to=userId&from=userId
export const lastMessage = `${hostServer}/api/message/lastMessage`