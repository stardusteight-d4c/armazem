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
export const createPost = `${hostServer}/api/post/createPost` // [POST -> body] {title, body, userId}
export const postMetadataById = `${hostServer}/api/post/postMetadataById` // [GET -> params] /:id
export const addNewDiscussion = `${hostServer}/api/post/addNewDiscussion` // [POST -> body] {postId, userId, body}
export const discussionsByPostId = `${hostServer}/api/post/discussionsByPostId` // [GET -> params] /:postId
export const addNewReply = `${hostServer}/api/post/addNewReply` // [POST -> body] -> {discussionId, sender, receiver, body}
export const repliesOfDiscussion = `${hostServer}/api/post/repliesOfDiscussion` // [GET -> params] /:discussionId
export const updateDiscussion = `${hostServer}/api/post/updateDiscussion` // [PUT -> body] {discussionId, body}
export const updateReply = `${hostServer}/api/post/updateReply` // [PUT -> body] {replyId, body}
export const deleteDiscussion = `${hostServer}/api/post/deleteDiscussion` // [DELETE -> query] ?postId=<postId>&discussionId=<discussionId>
export const deleteReply = `${hostServer}/api/post/deleteReply` // [DELETE -> query] ?discussionId=<discussionId>&replyId=<replyId>
export const likePost = `${hostServer}/api/post/likePost` // [PUT -> body] {userId, postId}
export const unlikedPost = `${hostServer}/api/post/unlikedPost` // [PUT -> body] {userId, postId}
export const updatePost = `${hostServer}/api/post/updatePost` // [PUT -> body] {postId, body}
export const deletePost = `${hostServer}/api/post/deletePost` // [DELETE -> query] ?postId=<postId>&accountId=<accountId>
export const sharePost = `${hostServer}/api/post/sharePost` // [PUT -> body] {postId, accountId}
export const unsharePost = `${hostServer}/api/post/unsharePost` // [PUT -> body] {postId, accountId}
export const topRatedPost = `${hostServer}/api/post/topRatedPost` // [GET]
export const recentPostsWithPagination = `${hostServer}/api/post/recentPostsWithPagination` // [GET -> params] /:page

// MANGA
export const addManga = `${hostServer}/api/manga/addManga` // [POST -> body] {data}
export const searchByTitle = `${hostServer}/api/manga/searchByTitle` // [GET -> params] /:query
export const mangaByPagination = `${hostServer}/api/manga/mangaByPagination` // [GET -> params] // :page
export const mangaByUid = `${hostServer}/api/manga/mangaByUid` // [GET -> params] /:uid
export const mangaByGenre = `${hostServer}/api/manga/mangaByGenre` // [GET -> params] /:genre
export const mangaByGenreAndTitle = `${hostServer}/api/manga/mangaByGenreAndTitle` // [GET -> params] /:genre/:title
export const addMangaToListed = `${hostServer}/api/manga/addMangaToListed` // [PUT -> body] {accountId, data}
export const removeMangaToListed = `${hostServer}/api/manga/removeMangaToListed` // [DELETE -> query] ?accountId=<accountId>&mangaUid=<mangaUid>
export const addReview = `${hostServer}/api/manga/addReview` // [POST -> body] {from, by, review, authorImage, authorUsername}
export const reviewsByPagination = `${hostServer}/api/manga/reviewsByPagination` // [GET -> params] /:uid/:page
export const review = `${hostServer}/api/manga/review` // [GET -> params] /:id
export const randomMangasByGenre = `${hostServer}/api/manga/randomMangasByGenre` // [GET -> params] /:genre
export const mostRead = `${hostServer}/api/manga/mostRead` // [GET]

// MESSAGE
export const addMessage = `${hostServer}/api/message/addMessage` // [POST -> body] {from, to, message}
export const allMessages = `${hostServer}/api/message/allMessages` // [GET -> query] ?to=<userId>&from=<userId>
export const lastMessage = `${hostServer}/api/message/lastMessage` // [GET -> query] ?to=<userId>&from=<userId>
