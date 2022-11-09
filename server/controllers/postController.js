import Account from '../models/accountModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Discussion from '../models/discussionModel.js'
import Reply from '../models/replyModel.js'

export const createPostAndAddToUserAccount = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error creating post',
      error: error.message,
    })
  }
}

export const postMetadataById = async (req, res, next) => {
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
    next(error)
    return res.status(404).json({
      status: false,
      msg: 'Post not found',
      error: error.message,
    })
  }
}

export const addNewDiscussion = async (req, res, next) => {
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

    return res
      .status(200)
      .json({ status: true, msg: 'New discussion started successfully' })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error adding a new discussion',
      error: error.message,
    })
  }
}

export const discussionsByPostId = async (req, res, next) => {
  try {
    const postId = req.params.postId
    const discussions = await Discussion.find({ post: postId })

    return res.status(200).json({
      status: true,
      msg: 'Post discussions successfully acquired',
      discussions,
    })
  } catch (error) {
    next(error)
    return res.status(404).json({
      status: true,
      msg: 'Error getting discussions',
      error: error.message,
    })
  }
}

export const updateDiscussion = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error updating the discussion',
      error: error.message,
    })
  }
}

export const deleteDiscussion = async (req, res, next) => {
  try {
    const { discussionId, postId } = req.body
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error deleting the discussion',
      error: error.message,
    })
  }
}

export const addNewReply = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error adding reply',
      error: error.message,
    })
  }
}

export const updateReply = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error editing reply',
      error: error.message,
    })
  }
}

export const deleteReply = async (req, res, next) => {
  try {
    const { replyId, discussionId } = req.body
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error deleting reply',
      error: error.message,
    })
  }
}

export const repliesOfDiscussion = async (req, res, next) => {
  try {
    const discussionId = req.params.discussionId
    const replies = await Reply.find({ discussion: discussionId })

    return res
      .status(200)
      .json({ status: true, msg: 'Replies acquired successfully', replies })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error searching for replies',
      error: error.message,
    })
  }
}

export const likePost = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error adding like',
      error: error.message,
    })
  }
}

export const unlikedPost = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error removing like',
      error: error.message,
    })
  }
}

export const updatePost = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error editing',
      error: error.message,
    })
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { postId, accountId } = req.body
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error removing',
    })
  }
}

export const sharePost = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error sharing',
    })
  }
}

export const unsharePost = async (req, res, next) => {
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
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'There was an error unshare',
    })
  }
}
