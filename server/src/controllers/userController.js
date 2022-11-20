import User from '../models/userModel.js'
import brcypt from 'bcrypt'
import ShortUniqueId from 'short-unique-id'
import { sendChangeEmailVerification } from '../services/nodemailer.js'

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
  try {
    const username = req.params.username
    const user = await User.findOne({ username })
    return res.json({ user })
  } catch (error) {
    next(error)
  }
}

export const searchUsersByQuery = async (req, res, next) => {
  try {
    const query = req.body.query
    const users = await User.findOne({
      username: { $regex: new RegExp(query, 'i') },
    })
      .select('username')
      .limit(5)
    return res.json({ users })
  } catch (error) {
    next(error)
  }
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

export const changeUserPassword = async (req, res, next) => {
  try {
    const { userId, currentPassword, newPassword } = req.body

    const user = await User.findById(userId)
    const isPasswordValid =
      user && (await brcypt.compare(currentPassword, user.password))

    if (!isPasswordValid) {
      return res
        .status(200)
        .json({ status: false, msg: 'Invalid current password' })
    } else {
      const hashedPassword = await brcypt.hash(newPassword, 10)
      await User.findByIdAndUpdate(userId, {
        $set: {
          password: hashedPassword,
        },
      })
    }
    return res.status(200).json({ status: true, msg: 'Password changed' })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error',
    })
  }
}

export const changeUserEmail = async (req, res, next) => {
  try {
    const { userId, newEmail } = req.body

    await User.findByIdAndUpdate(userId, {
      $set: {
        email: newEmail,
      },
    })

    return res.status(200).json({ status: true, msg: 'Email changed' })
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error',
    })
  }
}

export const sendTokenChangeEmailVerification = async (req, res, next) => {
  try {
    const { userId, email } = req.body

    const user = await User.findById(userId)

    const uid = new ShortUniqueId({ length: 10 })
    const token = uid()

    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({ msg: 'Email is already in use', status: false })
    } else {
      await sendChangeEmailVerification(email, user.name, token).catch(
        console.error
      )
      const encryptedToken = await brcypt.hash(token, 10)
      return res.json({
        msg: `Email sent to ${email}`,
        status: true,
        token: encryptedToken,
        email,
      })
    }
  } catch (error) {
    next(error)
    return res.status(500).json({
      status: false,
      msg: 'Error',
    })
  }
}

export const changeUserUsername = async (req, res, next) => {
  try {
    const { username, userId } = req.body

    const usernameAlreadyExist = await User.findOne({ username: username })
    const user = await User.findById(userId).select('lastModifiedPassword')
    const currentDate = new Date(Date.now())
    const aMonthAgo = new Date(Date.now()) - 1 * 28 * 24 * 60 * 60

    if (user.lastModifiedPassword) {
      const thereIsAChangeInTheLastMonth =
        aMonthAgo < user.lastModifiedPassword.getTime()
      if (thereIsAChangeInTheLastMonth) {
        return res.json({
          msg: 'The last change was made in less than 1 month',
          status: false,
        })
      }
    }

    if (usernameAlreadyExist) {
      return res.json({ msg: 'Username is already in use', status: false })
    } else {
      await User.findByIdAndUpdate(userId, {
        $set: {
          username: username,
          lastModifiedPassword: currentDate,
        },
      })
    }

    return res.status(200).json({ status: true, msg: 'Username changed' })
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: 'Error',
    })
  }
}
