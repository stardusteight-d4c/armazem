import User from '../models/userModel.js'

export const currentUserData = async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findById(userId)
  return res.json({ user })
}

export const userByUsername = async (req, res, next) => {
  const username = req.params.username
  console.log(username);
  const user = await User.findOne({username})
  return res.json({ user })
}
