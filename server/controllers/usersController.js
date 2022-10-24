import User from '../models/userModel.js'
import brcypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const characters =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token = ''
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)]
}

// NODEMAILER CONFIGURATION
async function SendEmailVerification(email, name, token) {
  console.log(email, name)

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
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailAddress = async (req, res, next) => {
  try {
    const { email } = req.body
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({
        msg: 'Email found',
        status: false,
        emailCheck,
      })
    }
    return res.json({ status: true })
  } catch (error) {
    next(error)
  }
}

export const registerGoogleAccount = async (req, res, next) => {
  try {
    const { name, email, username } = req.body
    console.log(req.body)
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
    })
    return res.json({ status: true, user })
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
        expiresIn: '300s',
      }
    )
    const id = user._id
    delete user.password
    return res.status(200).json({ status: true, id, session: sessionToken })
  } catch (error) {
    next(error)
  }
}
