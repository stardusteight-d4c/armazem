import Account from '../models/accountModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import Discussion, { discussionSchema } from '../models/discussionModel.js'
import Reply from '../models/replyModel.js'
import mongoose from 'mongoose'

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
      .status(201)
      .json({ status: true, msg: 'Post created successfully' })
  } catch (error) {
    next(error)
  }
}

export const lastFivePostsOfAccount = async (req, res, next) => {
  try {
    const accountId = req.params.id
    const postsData = await Account.findById(accountId).select('posts')
    const posts = postsData.posts.reverse().slice(0, 4)
    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully', posts })
  } catch (error) {
    next(error)
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
    return res.status(500).json({
      status: true,
      msg: 'Error', // melhorar mensagens de erros e testar
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
      { $push: { discussions: discussion._id } },
      { safe: true, upsert: true }
    )
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
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
    return res.status(500).json({
      status: true,
      msg: 'Error',
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
    // retornar update feito com sucesso
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
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
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
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
    // retornar update feito com sucesso
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
    })
  }
}

export const repliesOfDiscussion = async (req, res, next) => {
  try {
    const discussionId = req.params.discussionId
    const replies = await Reply.find({ discussion: discussionId})

    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully', replies })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: true,
      msg: 'Error',
    })
  }
}
