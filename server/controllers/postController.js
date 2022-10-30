import Account from '../models/accountModel.js'
import User from '../models/userModel.js'
import Post from '../models/postModel.js'

export const createPostAndAddToUserAccount = async (req, res, next) => {
  const { title, body, userId } = req.body
  try {
    const post = await Post.create({
      title,
      body,
      by: userId,
    })

    const postId = post._id
    const user = await User.findById(userId).select('account')

    await Account.findByIdAndUpdate(
      user.account,
      { $push: { posts: { postId } } },
      { safe: true, upsert: true }
    )

    console.log(post);
    return res.status(201).json({ status: true, msg: 'Post created successfully' })
  } catch (error) {}
}
