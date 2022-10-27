import User from '../models/userModel.js'
import Account from '../models/accountModel.js'
import brcypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const characters =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token = ''
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)]
}

// NODEMAILER CONFIGURATION
async function SendEmailVerification(email, name, token) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'stardusteight.d4cc@gmail.com',
      pass: 'gtrqgsupsmiogwcv',
    },
  })

  // SEND EMAIL WITH DEFINED TRANSPORT OBJECT
  let info = await transporter.sendMail({
    subject: 'Armazem',
    from: '"Developer at Armazem 👻" <stardusteight.d4cc@gmail.com>', // sender address
    to: email,
    text: `Email Confirmation - Hello, ${name}! Thank you for subscribing. Here is your confirmation code: ${token}`, // plain text body
    html: `
      <div>
      <h2>Email Confirmation</h2>
      <p>Hello, ${name}!</p>
      <p>Thank you for subscribing. Here is your confirmation code:</p>
      <h3 style="color:black;">${token}</h3>
      </div>`, // html body
  })
}

export const emailConfirmation = async (req, res, next) => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let token = ''
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)]
  }
  try {
    const { name, email } = req.body
    const emailCheck = await User.findOne({ email })

    if (emailCheck) {
      return res.json({ msg: 'Email is already in use', status: false })
    } else {
      await SendEmailVerification(email, name, token).catch(console.error)
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

export const validateSignUp = async (req, res, next) => {
  try {
    const { username } = req.body
    const usernameCheck = await User.findOne({ username })
    if (username.length > 3) {
      if (usernameCheck) {
        return res.json({
          msg: 'Username is already in use',
          status: false,
        })
      }
      return res.json({ status: true, msg: 'Username available ', username })
    }
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
    // const account = await Account.create({
    //   from: user._id
    // })
    // const userCreated = await User.findByIdAndUpdate(user._id, {
    //   account: account._id
    // })
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
    // const objectId = mongoose.Types.ObjectId(user._id);
    // console.log('objectId', objectId);
    console.log('user._id.toString()', user._id.toString());
   
    const account = await Account.create({
      user: user._id.toString()
    })
    // aparentemente find by id não está funcionando, e tenta atualizar sempre o primerio documento
    const userCreated = await User.findByIdAndUpdate(user._id.toString(), {
      account: account._id.toString()
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
