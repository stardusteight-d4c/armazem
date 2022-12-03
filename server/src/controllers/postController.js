import Account from '../models/accountModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Discussion from '../models/discussionModel.js'
import Reply from '../models/replyModel.js'
import Notification from '../models/notificationModel.js'

export const createPost = async (req, res) => {
  try {
    const { title, body, userId } = req.body
    const post = await Post.create({
      title,
      body,
      by: userId,
    })

    const user = await User.findById(userId).select('account')
    await Account.findByIdAndUpdate(
      user.account,
      { $push: { posts: post._id } },
      { safe: true, upsert: true }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Post created successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const postMetadataById = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)
    const userRef = await Post.findById(postId).select('by')
    const authorUser = await User.findById(userRef.by)
    const accountRef = await User.findById(userRef.by).select('account')
    const authorAccount = await Account.findById(accountRef.account)

    return res.status(200).json({
      status: true,
      msg: 'Post metadata successfully acquired',
      post,
      authorAccount,
      authorUser,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addNewDiscussion = async (req, res) => {
  try {
    const { postId, userId, body } = req.body
    const discussion = await Discussion.create({
      post: postId,
      by: userId,
      body,
    })
    await Post.findByIdAndUpdate(
      postId,
      { $push: { discussions: { discussion: discussion._id } } },
      { safe: true, upsert: true }
    )

    const postAuthorUser = await Post.findById(postId).select('by')
    const postAuthorAccount = await Account.findOne({ user: postAuthorUser.by })

    const discussionAuthor = await User.findById(userId)

    const newDiscussion = {
      account: postAuthorAccount._id,
      type: 'newDiscussion',
      message: 'started a new discussion on your',
      infos: [discussionAuthor.username, postId],
    }

    postAuthorUser !== userId &&
      (await Notification.create({ ...newDiscussion }))

    return res
      .status(200)
      .json({ status: true, msg: 'New discussion started successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const discussionsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId
    const discussions = await Discussion.find({ post: postId })

    return res.status(200).json({
      status: true,
      msg: 'Post discussions successfully acquired',
      discussions,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const updateDiscussion = async (req, res) => {
  try {
    const { discussionId, body } = req.body
    await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $set: {
          body: body,
        },
      },
      { safe: true, upsert: true }
    )

    return res.status(200).json({
      status: true,
      msg: 'Update done successfully',
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const deleteDiscussion = async (req, res) => {
  try {
    const { discussionId, postId } = req.query
    await Discussion.findByIdAndDelete(discussionId)
    await Reply.deleteMany({ discussion: discussionId })
    const updatedDiscussions = await Discussion.find({ post: postId }).select(
      '_id'
    )

    const discussionsObj = []
    updatedDiscussions.map((id) => discussionsObj.push({ discussion: id }))
    await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          discussions: [...discussionsObj],
        },
      },
      { safe: true, upsert: true }
    )

    return res.status(200).json({
      status: true,
      msg: 'Delete done successfully',
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const addNewReply = async (req, res) => {
  try {
    const { discussionId, sender, receiver, body } = req.body
    const reply = await Reply.create({
      discussion: discussionId,
      by: sender,
      to: receiver,
      body,
    })
    await Discussion.findByIdAndUpdate(
      discussionId,
      { $push: { replies: reply._id } },
      { safe: true, upsert: true }
    )

    return res.status(200).json({
      status: true,
      msg: 'New reply added',
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const updateReply = async (req, res) => {
  try {
    const { replyId, body } = req.body
    await Reply.findByIdAndUpdate(
      replyId,
      {
        $set: {
          body: body,
        },
      },
      { safe: true, upsert: true }
    )

    return res.status(200).json({
      status: true,
      msg: 'Reply updated',
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const deleteReply = async (req, res) => {
  try {
    const { replyId, discussionId } = req.query
    await Reply.findByIdAndDelete(replyId)
    const updatedReplies = await Reply.find({
      discussion: discussionId,
    }).select('_id')

    updatedReplies.map(
      async (replies) =>
        await Discussion.findByIdAndUpdate(
          discussionId,
          {
            $set: {
              replies: replies._id,
            },
          },
          { safe: true, upsert: true }
        )
    )

    return res.status(200).json({
      status: true,
      msg: 'Deleted reply',
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const repliesOfDiscussion = async (req, res) => {
  try {
    const discussionId = req.params.discussionId
    const replies = await Reply.find({ discussion: discussionId })

    return res
      .status(200)
      .json({ status: true, msg: 'Replies acquired successfully', replies })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body
    await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: {
          likes: { by: userId },
        },
      },
      { safe: true, upsert: true }
    )

    return res.status(200).json({ status: true })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const unlikedPost = async (req, res) => {
  try {
    const { userId, postId } = req.body
    await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: { by: userId } },
      },
      { safe: true, multi: false }
    )

    return res.status(200).json({ status: true })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { postId, body } = req.body
    await Post.findByIdAndUpdate(
      postId,
      {
        $set: { body: body },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Post edited successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { postId, accountId } = req.query
    const repliesRef = await Discussion.find({ post: postId }).select('replies')

    const replies = []
    repliesRef.map((reply) => replies.push(...reply.replies))
    replies.map(async (reply) => await Reply.findByIdAndDelete(reply))

    await Discussion.deleteMany({ post: postId })
    await Account.updateMany({
      $pullAll: {
        sharedPosts: [{ id: postId }],
      },
    })
    await Account.findByIdAndUpdate(
      accountId,
      {
        $pull: { posts: postId },
      },
      { safe: true, multi: false }
    )
    await Post.findByIdAndDelete(postId)

    return res
      .status(200)
      .json({ status: true, msg: 'Post successfully removed' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const sharePost = async (req, res) => {
  try {
    const { postId, accountId } = req.body

    await Account.findByIdAndUpdate(
      accountId,
      {
        $addToSet: { sharedPosts: { id: postId } },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Post shared successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const unsharePost = async (req, res) => {
  try {
    const { postId, accountId } = req.body
    await Account.findByIdAndUpdate(
      accountId,
      {
        $pull: { sharedPosts: { id: postId } },
      },
      { safe: true, multi: false }
    )

    return res
      .status(200)
      .json({ status: true, msg: 'Post removed from shares' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const topRatedPost = async (req, res) => {
  try {
    // Sorting with two fields returns the error:
    // MongoServerError: Executor error during find command :: caused by :: cannot sort with keys that are parallel arrays
    // const posts = await Post.find()
    //   .select('discussions likes')
    //   .sort({ likes: 'descending', discussions: 'descending' })

    /* Aggregate operations process data records and return computed results.
     * Aggregate operations group values ​​from multiple documents and can perform
     * a variety of operations on the grouped data to return a single result.
     *
     * It is a more advanced concept of mongoDB, to make more elaborate queries
     */

    // Top 10 rated posts by more likes and discussions in the last 24 hours (returns only _id)
    const posts = await Post.aggregate([
      {
        $match: {
          // createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      },
      {
        $set: {
          likes: {
            $size: '$likes',
          },
          discussions: {
            $size: '$discussions',
          },
        },
      },
      {
        $sort: {
          likes: -1,
          discussions: -1,
        },
      },
      { $project: { _id: '$_id' } },
    ]).limit(10)

    return res.status(200).json({ status: true, posts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const recentPostsWithPagination = async (req, res) => {
  try {
    const page = req.params.page
    const skip = (page - 1) * 4

    const posts =
      page < 50
        ? await Post.find({}).skip(skip).limit(4).sort('-createdAt')
        : []

    return res.status(200).json({ status: true, posts })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}
