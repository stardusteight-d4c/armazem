import User from '../models/userModel.js'

export const userById = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    return res.json({ user })
  } catch (error) {
    next(error)
  }
}

export const userByUsername = async (req, res, next) => {
  const username = req.params.username
  const user = await User.findOne({ username })
  return res.json({ user })
}

export const searchUsersByQuery = async (req, res, next) => {
  const query = req.body.query
  const users = await User.findOne({
    username: { $regex: new RegExp(query, 'i') },
  })
    .select('username')
    .limit(5)
  return res.json({ users })
}

export const updateCoverImage = async (req, res, next) => {
  try {
    const { id, cover_img } = req.body
    const user = await User.findByIdAndUpdate(id, {
      cover_img,
    })
    return res
      .status(200)
      .json({ status: true, msg: 'Image successfully updated' })
  } catch (error) {
    return res.json({
      status: false,
      msg: 'A failure has occurred. Try compressing the image',
    })
  }
}

export const updateProfileImage = async (req, res, next) => {
  try {
    const { id, user_img } = req.body
    const user = await User.findByIdAndUpdate(id, {
      user_img,
    })
    return res
      .status(200)
      .json({ status: true, msg: 'Image successfully updated' })
  } catch (error) {
    return res.json({
      status: false,
      msg: 'A failure has occurred. Try compressing the image',
    })
  }
}
