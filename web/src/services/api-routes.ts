export const hostServer = import.meta.env.VITE_SERVER

// AUTH
export const verifyUsername = `${hostServer}/api/auth/verifyUsername` // [GET -> params] /:username
export const emailConfirmation = `${hostServer}/api/auth/emailConfirmation` // [PUT -> body] {name, email}
export const verifyEmailAddress = `${hostServer}/api/auth/verifyEmailAddress` // [GET -> params] /:email
export const register = `${hostServer}/api/auth/register` // [POST -> body] {name, email, username, password}
export const registerGoogleAccount = `${hostServer}/api/auth/registerGoogleAccount` // [POST -> body]  {name, email, username, image}
export const login = `${hostServer}/api/auth/login` // [PUT -> body] {username, password}
export const loginByGoogleProvider = `${hostServer}/api/auth/loginByGoogleProvider` // [PUT -> body] {email, id}
export const authorization = `${hostServer}/api/auth/middleware/checkSession` // [PUT -> headers] Authorization: rawToken,

// USER
export const userData = `${hostServer}/api/user` // [GET -> params] /:id
export const dataByUsername = `${hostServer}/api/user/username` // [GET -> params] /:username
export const updateCoverImage = `${hostServer}/api/user/updateCoverImage` // [PUT -> body] {id, cover_img}
export const updateProfileImage = `${hostServer}/api/user/updateProfileImage` // [PUT -> body] {id, user_img}
export const searchUsersByQuery = `${hostServer}/api/user/searchUsersByQuery` // [GET -> params] /:query
export const activeUser = `${hostServer}/api/user/middleware/activeUser` // [POST -> params] /:userId
export const changeUserPassword = `${hostServer}/api/user/changeUserPassword` // [PUT -> body]  {userId, currentPassword, newPassword}
export const changeUserEmail = `${hostServer}/api/user/changeUserEmail` // [PUT -> body] {userId, newEmail}
export const sendTokenChangeEmailVerification = `${hostServer}/api/user/sendTokenChangeEmailVerification` // [POST -> body] {userId, email}
export const changeUserUsername = `${hostServer}/api/user/changeUserUsername` // [PUT -> body] {username, userId}

// ACCOUNT
export const sendRequest = `${hostServer}/api/account/sendRequest` // [POST -> body] {to, from}
export const addConnection = `${hostServer}/api/account/addConnection` // [POST -> BODY] {to, from}
export const accountDataByUserId = `${hostServer}/api/account/accountDataByUserId` // [GET -> params] /:id
export const rejectConnection = `${hostServer}/api/account/rejectConnection` // [DELETE -> params] /:to/:from
export const removeConnection = `${hostServer}/api/account/removeConnection` // [DELETE -> query] ?to=<userWith>&from=<currentUser>
export const sharedPosts = `${hostServer}/api/account/sharedPosts` // [GET -> params] /:accountId
export const lastFivePostsOfAccount = `${hostServer}/api/account/lastFivePostsOfAccount` // [GET -> params] /:id
export const postByPagination = `${hostServer}/api/account/postByPagination` // [GET -> params] /:userId/:page
export const searchUserPostByTitle = `${hostServer}/api/account/searchUserPostByTitle` // [GET -> query] ?userId=<userId>&searchTerm=<postTitle>
export const sharedPostByPagination = `${hostServer}/api/account/sharedPostByPagination` // [GET -> params] /:accountId/:page
export const searchSharedPostByTitle = `${hostServer}/api/account/searchSharedPostByTitle` // [GET -> query] ?accountId=<accountId>&searchTerm=<postTitle>
export const addComment = `${hostServer}/api/account/addComment` // [POST -> body] {accountId, userId, comment}
export const updateComment = `${hostServer}/api/account/updateComment` // [PUT -> body] {commentId, body}
export const accountComments = `${hostServer}/api/account/accountComments` // [GET -> params] /:accountId
export const deleteComment = `${hostServer}/api/account/deleteComment` // [DELETE -> query] ?commentId=<commentId>
export const addMangaToFavorites = `${hostServer}/api/account/addMangaToFavorites` // [POST -> body] {mangaId, accountId}
export const removeMangaToFavorites = `${hostServer}/api/account/removeMangaToFavorites` // [DELETE -> query] ?accountId=<accountId>&mangaId=<mangaId>
export const mangaFavorites = `${hostServer}/api/account/mangaFavorites` // [GET -> params] /:accountId
export const mangaListedByAccountId = `${hostServer}/api/account/mangaListedByAccountId` // [GET -> params] /:accountId
export const updatesMangaList = `${hostServer}/api/account/updatesMangaList` // [GET -> params] /:accountId
export const notifications = `${hostServer}/api/account/notifications` // [GET -> params] /:accountId
export const deleteAccount = `${hostServer}/api/account/deleteAccount` // [DELETE -> query] ?userId=<userId>&accountId=<accountId>

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
export const allMessages = `${hostServer}/api/message/allMessages` // ?to=<userId>&from=<userId>
export const lastMessage = `${hostServer}/api/message/lastMessage`
