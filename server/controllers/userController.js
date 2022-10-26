import User from '../models/userModel.js'

export const currentUserData = async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findById(userId)
  return res.json({ user })
}

export const userByUsername = async (req, res, next) => {
  const username = req.params.username
  const user = await User.findOne({ username })
  return res.json({ user })
}

export const updateCoverImage = async (req, res, next) => {
  try {
    const { id, cover_img } = req.body
    const user = await User.findByIdAndUpdate(id, {
      cover_img,
    })
    return res.status(200).json({ status: true, msg: 'Image successfully updated'})
  } catch (error) {
    return res.json({ status: false, msg: 'A failure has occurred. Try compressing the image'})
  }
}
