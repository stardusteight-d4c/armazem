import Account from '../models/accountModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Comment from '../models/commentModel.js'
import ShortUniqueId from 'short-unique-id'
const uid = new ShortUniqueId({ length: 10 })

export const accountDataByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id
    const userAccountRef = await User.findById(userId).select('account')
    const account = await Account.findById(userAccountRef.account)
    return res.status(200).json({ account, status: true, msg: 'Account found' })
  } catch (error) {
    next(error)
  }
}

export const sendRequest = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    const requestAlreadyReceived = await Account.find({
      _id: toAccountRef.account,
      requestsReceived: from,
    })

    if (
      requestAlreadyReceived?.requestsReceived?.length === 0 ||
      requestAlreadyReceived?.requestsReceived === undefined
    ) {
      await Account.findByIdAndUpdate(
        fromAccountRef.account,
        { $push: { requestsSent: { to } } },
        { safe: true, upsert: true }
      )
      await Account.findByIdAndUpdate(
        toAccountRef.account,
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
    next(error)
  }
  return res.json({ status: true })
}

export const addConnection = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    // Link connection
    await Account.findByIdAndUpdate(toAccountRef.account, {
      connections: { with: from },
    })
    await Account.findByIdAndUpdate(fromAccountRef.account, {
      connections: { with: to },
    })

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
    next(error)
  }
}

export const rejectConnection = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

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
    next(error)
  }
}

export const removeConnection = async (req, res, next) => {
  const { to, from } = req.body
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
    next(error)
  }
}

export const sharedPosts = async (req, res, next) => {
  try {
    const { accountId } = req.body

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
    next(error)
  }
}

export const lastFivePostsOfAccount = async (req, res, next) => {
  try {
    const accountId = req.params.id
    const postsData = await Account.findById(accountId).select('posts')
    const postsId = postsData.posts.reverse().slice(0, 4)

   if (postsId.length === 0) return res
   .json({ status: false, msg: 'No activity found' })

    const lastPosts = await Promise.all(
      postsId.map(async (id) => await Post.findById(id))
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully', lastPosts })
  } catch (error) {
    next(error)
  }
}

export const postByPagination = async (req, res, next) => {
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
    next(error)
  }
}

export const searchUserPostByTitle = async (req, res, next) => {
  try {
    const { searchTerm, userId } = req.body
    const posts = await Post.find({
      by: userId,
      title: { $regex: new RegExp(searchTerm, 'i') },
    }).limit(2)
    return res.json({ posts })
  } catch (error) {
    next(error)
  }
}

export const sharedPostByPagination = async (req, res, next) => {
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
      sharedPostsIds.map(async (id) => await Post.find({_id: id.id })).reverse()
    )

    function paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size)
    }

    const sharedPostsPaginate = paginate(sharedPosts, 2, page)
    const posts = []
    sharedPostsPaginate.map((post) => posts.push(post[0]))

    return res.status(200).json({ status: true, posts })
  } catch (error) {
    next(error)
  }
}

export const searchSharedPostByTitle = async (req, res, next) => {
  try {
    const { searchTerm, accountId } = req.body

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
              _id: id,
              title: { $regex: new RegExp(searchTerm, 'i') },
            })
        )
        .reverse()
    )

    const posts = []
    searchResult.map((post) => post.length > 0 && posts.push(post[0]))

    return res.json({ posts })
  } catch (error) {
    next(error)
  }
}

export const addComment = async (req, res, next) => {
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
    next(error)
  }
}

export const accountComments = async (req, res, next) => {
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
    next(error)
  }
}

export const updateComment = async (req, res, next) => {
  try {
    const { commentId, body } = req.body

    await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: { comment: body },
      },
      { safe: true, multi: false }
    )

    return res.status(200)
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
    })
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.body

    await Comment.findByIdAndDelete(commentId)

    return res
      .status(200)
      .json({ status: true, msg: 'Comment successfully deleted' })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
    })
  }
}
