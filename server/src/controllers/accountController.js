import Account from '../models/accountModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Comment from '../models/commentModel.js'
import Notification from '../models/notificationModel.js'
import Manga from '../models/mangaModel.js'
import Reply from '../models/replyModel.js'
import Discussion from '../models/discussionModel.js'
import Review from '../models/reviewModel.js'

export const accountDataByUserId = async (req, res) => {
  const userId = req.params.id

  // just testing other ways
  await User.findById(userId)
    .select('account')
    .then(async (result) => {
      await Account.findById(result.account)
        .then((account) =>
          res.status(200).json({ account, status: true, msg: 'Account found' })
        )
        .catch((error) => console.error(error.message))
    })
    .catch((error) => {
      console.error(error.message)
      return res.status(500).json({
        status: false,
        msg: error.message,
      })
    })
}

// export const accountDataByUserId = async (req, res) => {
//   try {
//     const userId = req.params.id
//     const userAccountRef = await User.findById(userId).select('account')
//     const account = await Account.findById(userAccountRef.account)
//     return res.status(200).json({ account, status: true, msg: 'Account found' })

//   } catch (error) {
//     console.error(error.message)
//     return res.status(500).json({
//       status: false,
//       msg: error.message,
//     })
//   }
// }

export const sendRequest = async (req, res) => {
  const { to, from } = req.body
  try {
    const toUserRef = await User.findById(to)
    const fromUserRef = await User.findById(from)

    const requestAlreadyReceived = await Account.find({
      _id: toUserRef.account,
      requestsReceived: from,
    })

    const direct = {
      account: toUserRef.account,
      type: 'direct',
      message: 'sent you a connection request',
      infos: [fromUserRef.username],
    }
    await Notification.create({ ...direct })

    if (
      requestAlreadyReceived?.requestsReceived?.length === 0 ||
      requestAlreadyReceived?.requestsReceived === undefined
    ) {
      await Account.findByIdAndUpdate(
        fromUserRef.account,
        { $push: { requestsSent: { to } } },
        { safe: true, upsert: true }
      )
      await Account.findByIdAndUpdate(
        toUserRef.account,
        { $push: { requestsReceived: { from } } },
        { safe: true, upsert: true }
      )
      return res
        .status(200)
        .json({ status: true, msg: 'Request sent successfully' })
    } else {
      return res
        .status(200)
        .json({ status: false, msg: 'Request has already been sent' })
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addConnection = async (req, res) => {
  const { to, from } = req.body
  try {
    const toUserRef = await User.findById(to)
    const fromUserRef = await User.findById(from)

    // Link connection
    await Account.findByIdAndUpdate(toUserRef.account, {
      connections: { with: from },
    })
    await Account.findByIdAndUpdate(fromUserRef.account, {
      connections: { with: to },
    })
    const direct = {
      account: toUserRef.account,
      type: 'direct',
      message: 'accepted your request',
      infos: [fromUserRef.username],
    }
    await Notification.create({ ...direct })

    // Delete request
    await Account.findByIdAndUpdate(
      fromUserRef.account,
      {
        $pull: { requestsReceived: { from: to } },
      },
      { safe: true, multi: false }
    )
    await Account.findByIdAndUpdate(
      toUserRef.account,
      {
        $pull: { requestsSent: { to: from } },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const rejectConnection = async (req, res) => {
  const { to, from } = req.params
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    console.log(to, from)

    // Delete request
    await Account.findByIdAndUpdate(
      fromAccountRef.account,
      {
        $pull: { requestsReceived: { from: to } },
      },
      { safe: true, multi: false }
    )
    await Account.findByIdAndUpdate(
      toAccountRef.account,
      {
        $pull: { requestsSent: { to: from } },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const removeConnection = async (req, res) => {
  const { to, from } = req.query

  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    // Delete connection
    await Account.findByIdAndUpdate(
      fromAccountRef.account,
      {
        $pull: { connections: { with: to } },
      },
      { safe: true, multi: false }
    )
    await Account.findByIdAndUpdate(
      toAccountRef.account,
      {
        $pull: { connections: { with: from } },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const sharedPosts = async (req, res) => {
  try {
    const accountId = req.params.accountId

    const sharedPostsRef = await Account.findById(accountId).select(
      'sharedPosts'
    )

    const sharedPostsIds = []
    sharedPostsRef.sharedPosts.map((post) => sharedPostsIds.push(post.id))

    const sharedPosts = await Promise.all(
      sharedPostsIds.map(
        async (id) => await Post.findById(id).then((result) => result)
      )
    )

    return res.status(200).json({ status: true, sharedPosts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const lastFivePostsOfAccount = async (req, res) => {
  try {
    const accountId = req.params.id
    const postsData = await Account.findById(accountId).select('posts')
    const postsId = postsData.posts.reverse().slice(0, 4)

    if (postsId.length === 0)
      return res.json({ status: false, msg: 'No activity found' })

    const lastPosts = await Promise.all(
      postsId.map(async (id) => await Post.findById(id))
    )

    return res.status(200).json({
      status: true,
      msg: 'Operation performed successfully',
      lastPosts,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const postByPagination = async (req, res) => {
  try {
    const userId = req.params.userId
    const page = req.params.page
    const skip = (page - 1) * 2

    // 5 out of 5 pagination
    const posts = await Post.find({ by: userId })
      .skip(skip)
      .limit(2)
      .sort('-createdAt')

    return res.status(200).json({ status: true, posts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const searchUserPostByTitle = async (req, res) => {
  try {
    const { searchTerm, userId } = req.query
    const posts = await Post.find({
      by: userId,
      title: { $regex: new RegExp(searchTerm, 'i') },
    }).limit(2)

    return res.json({ posts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const sharedPostByPagination = async (req, res) => {
  try {
    const accountId = req.params.accountId
    const page = req.params.page
    // const skip = (page - 1) * 2

    const sharedPostsRef = await Account.findById(accountId).select(
      'sharedPosts'
    )

    const sharedPostsIds = []
    sharedPostsRef.sharedPosts.map((post) => sharedPostsIds.push(post))
    const sharedPosts = await Promise.all(
      sharedPostsIds
        .map(async (id) => await Post.find({ _id: id.id }))
        .reverse()
    )

    function paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size)
    }

    const sharedPostsPaginate = paginate(sharedPosts, 2, page)
    const posts = []
    sharedPostsPaginate.map((post) => posts.push(post[0]))
    return res.status(200).json({ status: true, posts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const searchSharedPostByTitle = async (req, res) => {
  try {
    const { accountId, searchTerm } = req.query

    const sharedPostsRef = await Account.findById(accountId).select(
      'sharedPosts'
    )

    const sharedPostsIds = []
    sharedPostsRef.sharedPosts.map((post) => sharedPostsIds.push(post))
    const searchResult = await Promise.all(
      sharedPostsIds
        .map(
          async (id) =>
            await Post.find({
              _id: id.id,
              title: { $regex: new RegExp(searchTerm, 'i') },
            })
        )
        .reverse()
    )
    const posts = []
    searchResult.map((post) => post.length > 0 && posts.push(post[0]))
    return res.json({ posts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addComment = async (req, res) => {
  try {
    const { accountId, userId, comment } = req.body
    const accountComment = await Comment.create({
      in: accountId,
      by: userId,
      comment: comment,
    })
    await Account.findByIdAndUpdate(
      accountId,
      {
        $push: { comments: accountComment._id },
      },
      { safe: true, upsert: true }
    )
    return res
      .status(200)
      .json({ status: true, msg: 'Comment made successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const accountComments = async (req, res) => {
  try {
    const accountId = req.params.accountId
    const commentsIds = await Account.findById(accountId).select('comments')
    const commentsMetadata = await Promise.all(
      commentsIds.comments.map(async (id) => await Comment.find({ _id: id }))
    )
    const comments = []
    commentsMetadata.map(
      (comment) => comment.length > 0 && comments.push(comment[0])
    )
    return res.status(200).json({ status: true, comments })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const updateComment = async (req, res) => {
  try {
    const { commentId, body } = req.body
    await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: { comment: body },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Comment edited successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.query

    await Comment.findByIdAndDelete(commentId)

    return res
      .status(200)
      .json({ status: true, msg: 'Comment successfully deleted' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addMangaToFavorites = async (req, res) => {
  try {
    const { mangaId, accountId } = req.body
    await Account.findByIdAndUpdate(accountId, {
      $addToSet: { favorites: mangaId },
    })

    return res.status(200).json({ status: true, msg: 'Add to favorites' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const removeMangaToFavorites = async (req, res) => {
  try {
    const { mangaId, accountId } = req.query
    await Account.findByIdAndUpdate(accountId, {
      $pull: { favorites: mangaId },
    })

    return res.status(200).json({ status: true, msg: 'Removed to favorites' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mangaFavorites = async (req, res) => {
  try {
    const accountId = req.params.accountId
    const mangaIds = await Account.find({ _id: accountId }).select(
      'favorites -_id'
    )

    const mangas = await Manga.find({
      _id: {
        $in: [...mangaIds[0].favorites],
      },
    }).select('title cover uid score -_id')

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const mangaListedByAccountId = async (req, res) => {
  try {
    const accountId = req.params.accountId
    const mangasListed = await Account.find({ _id: accountId }).select(
      'mangaList -_id'
    )
    const mangas = mangasListed[0].mangaList

    return res.status(200).json({ status: true, mangas })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const updatesMangaList = async (req, res) => {
  try {
    const accountId = req.params.accountId
    const activities = await Account.find({ _id: accountId })
      .select('mangaList -_id')
      .limit(10)

    const updates = activities[0].mangaList.reverse()

    return res.status(200).json({ status: true, updates })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const notifications = async (req, res) => {
  try {
    const accountId = req.params.accountId

    const general = await Notification.find({ type: 'general' })
    const direct = await Notification.find({ account: accountId })

    const mergeArr = [...general, ...direct]

    const notifications = mergeArr.sort((current) => {
      return new Date(current.createdAt) - new Date(current.createdAt)
    })

    return res.status(200).json({ status: true, notifications })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const { userId, accountId } = req.query

    const posts = await Post.find({ by: userId })
    const postIds = []
    posts && posts.map((post) => postIds.push(post._id))

    const discussions =
      postIds && (await Discussion.find({ post: { $in: postIds } }))
    const discussionIds = []
    discussions &&
      discussions.map((discussion) => discussionIds.push(discussion._id))

    await Account.updateMany(null, {
      $pull: { connections: { with: userId } },
    })

    await Account.updateMany(null, { $pull: { requestsReceived: { userId } } })
    await Account.updateMany(null, {
      $pull: { requestsSent: { to: userId } },
    })
    await Comment.deleteMany(null, { by: userId })

    postIds &&
      (await Promise.all(
        postIds.map(
          async (id) =>
            await Account.updateMany(null, {
              $pullAll: {
                sharedPosts: [{ id: id.toString() }],
              },
            })
        )
      ))

    discussionIds &&
      (await Reply.updateMany(null, {
        $pullAll: [{ discussion: { $in: discussionIds } }],
      }))
    discussionIds &&
      (await Post.updateMany(null, {
        $pull: { discussions: { discussion: { $in: discussionIds } } },
      }))
    postIds &&
      (await Discussion.updateMany(null, {
        $pullAll: [{ post: { $in: postIds } }],
      }))

    await Reply.deleteMany({ by: userId })
    await Reply.deleteMany({ to: userId })
    await Discussion.deleteMany({ by: userId })
    await Post.deleteMany({ by: userId })
    await Review.deleteMany({ by: accountId })
    await User.findByIdAndDelete(userId)
    await Account.findByIdAndDelete(accountId)

    await Manga.updateMany(
      { 'score.accountId': accountId },
      {
        $pull: { score: { accountId: accountId } },
      },
      { safe: true, multi: false }
    )

    await Manga.updateMany(
      null,
      {
        $pull: { readers: accountId },
      },
      { safe: true, multi: false }
    )

    return res.status(200).json({ status: true, msg: 'Account deleted' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}
