import User from '../model/userModel.js'
import brcypt from 'bcrypt'

export const register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body
    const usernameCheck = await User.findOne({ username })
    const emailCheck = await User.findOne({ email })
    if (usernameCheck) {
      return res.json({
        msg: 'Username is already in use',
        status: false,
      })
    }
    if (emailCheck) {
      return res.json({ msg: 'Email is already in use', status: false })
    }
    const hashedPassword = await brcypt.hash(password, 10)
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    })
    delete user.password
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}
