import User from '../models/userModel.js'
import Account from '../models/accountModel.js'
import brcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ShortUniqueId from 'short-unique-id'
import { sendEmailVerification } from '../services/nodemailer.js'

export const verifyUsername = async (req, res, next) => {
  try {
    const { username } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck) {
      return res.json({
        msg: 'Username is already in use',
        status: false,
      })
    }
    return res.json({ status: true, msg: 'Username available ', username })
  } catch (error) {
    next(error)
  }
}

export const emailConfirmation = async (req, res, next) => {
  try {
    const { name, email } = req.body
    const uid = new ShortUniqueId({ length: 10 })
    const token = uid()
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({ msg: 'Email is already in use', status: false })
    } else {
      await sendEmailVerification(email, name, token).catch(console.error)
      const encryptedToken = await brcypt.hash(token, 10)
      return res.json({
        msg: `Email sent to ${email}`,
        status: true,
        token: encryptedToken,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const verifyEmailAddress = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.json({
        msg: 'Email is already in use, try sign in',
        status: true,
        user,
      })
    }
    return res.json({ status: false, msg: 'Email not found' })
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body
    const hashedPassword = await brcypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    })
    delete user.password
    const account = await Account.create({
      user: user._id,
    })
    await User.findByIdAndUpdate(user._id, {
      account: account._id,
    })
    const sessionToken = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )
    const id = user._id
    return res.json({ status: true, id, session: sessionToken })
  } catch (error) {
    next(error)
  }
}

export const registerGoogleAccount = async (req, res, next) => {
  try {
    const { name, email, username, image } = req.body
    const usernameCheck = await User.findOne({ username })
    const emailCheck = await User.findOne({ email })
    if (username.length > 3) {
      if (usernameCheck) {
        return res.json({
          msg: 'Username is already in use',
          status: false,
        })
      }
    }
    if (emailCheck) {
      return res.json({
        msg: 'Email is already in use, try sign in',
        status: false,
      })
    }
    const user = await User.create({
      name,
      email,
      username,
      user_img: image,
    })
    const account = await Account.create({
      user: user._id,
    })
    await User.findByIdAndUpdate(user._id, {
      account: account._id,
    })
    const sessionToken = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )
    const id = user._id
    return res.json({ status: true, id, session: sessionToken })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordValid =
      user && (await brcypt.compare(password, user.password))
    if (!user) {
      return res.json({
        msg: 'Incorrect password or username',
        status: false,
      })
    } else if (!isPasswordValid) {
      return res.json({
        msg: 'Incorrect password or username',
        status: false,
      })
    }
    const sessionToken = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )
    const id = user._id
    delete user.password
    return res.status(200).json({ status: true, id, session: sessionToken })
  } catch (error) {
    next(error)
  }
}

export const loginByGoogleProvider = async (req, res, next) => {
  try {
    const { email, id } = req.body
    const user = await User.findById(id)
    const sessionToken = jwt.sign(
      { user_id: user._id, email: email },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )
    return res.status(200).json({ status: true, id, session: sessionToken })
  } catch (error) {
    next(error)
  }
}
