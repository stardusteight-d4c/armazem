import User from '../models/userModel.js'
import Account from '../models/accountModel.js'
import brcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ShortUniqueId from 'short-unique-id'
import { sendEmailVerification } from '../services/nodemailer.js'

export const verifyUsername = async (req, res) => {
  try {
    const username = req.params.username
    const findUsername = await User.findOne({ username })

    if (findUsername) {
      return res.json({
        status: false,
        msg: 'Username is already in use',
      })
    } else {
      return res
        .status(200)
        .json({ status: true, msg: 'Username available', username })
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const emailConfirmation = async (req, res) => {
  try {
    const { name, email } = req.body
    const uid = new ShortUniqueId({ length: 10 })
    const token = uid()
    const findEmail = await User.findOne({ email })

    if (findEmail) {
      return res
        .status(200)
        .json({ status: false, msg: 'Email is already in use' })
    } else {
      await sendEmailVerification(email, name, token).catch(console.error)
      const encryptedToken = await brcypt.hash(token, 10)
      return res.status(200).json({
        status: true,
        msg: `Email sent to ${email}`,
        token: encryptedToken,
      })
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const verifyEmailAddress = async (req, res) => {
  try {
    const email = req.params.email
    const user = await User.findOne({ email }).select('-password -account')

    if (user) {
      return res.status(200).json({
        status: true,
        msg: 'Email is already in use, try sign in',
        user,
      })
    }
    return res.status(200).json({ status: false, msg: 'Email not found' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body
    const hashedPassword = await brcypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
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

    return res.status(200).json({
      status: true,
      msg: 'The user has been registered',
      id: user._id,
      session: sessionToken,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const registerGoogleAccount = async (req, res) => {
  try {
    const { name, email, username, image } = req.body
    const findUsername = await User.findOne({ username })
    const findEmail = await User.findOne({ email })

    if (findUsername) {
      return res.status(200).json({
        status: false,
        msg: 'Username is already in use',
      })
    } else if (findEmail) {
      return res.status(200).json({
        status: false,
        msg: 'Email is already in use, try sign in',
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

    return res.status(200).json({
      status: true,
      msg: 'The user has been registered with the Google account',
      id: user._id,
      session: sessionToken,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordValid =
      user && (await brcypt.compare(password, user.password))

    if (!user) {
      return res.json({
        status: false,
        msg: 'Incorrect password or username',
      })
    } else if (!isPasswordValid) {
      return res.json({
        status: false,
        msg: 'Incorrect password or username',
      })
    }

    const sessionToken = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    return res
      .status(200)
      .json({ status: true, id: user._id, session: sessionToken })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const loginByGoogleProvider = async (req, res) => {
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
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}
