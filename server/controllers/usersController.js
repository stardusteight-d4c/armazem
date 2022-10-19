import User from '../models/userModel.js'
import brcypt from 'bcrypt'
import nodemailer from 'nodemailer'

const characters =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token = ''
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)]
}

// NODEMAILER CONFIGURATION
async function SendEmailVerification(email, name) {
  console.log(email, name);
  

  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "stardusteight.d4cc@gmail.com",
        pass: "gtrqgsupsmiogwcv"
    }
});


  // SEND EMAIL WITH DEFINED TRANSPORT OBJECT
  let info = await transporter.sendMail({
    subject: 'ANiStorage - Email Verification',
    from: '"Gabriel Sena 👻" <stardusteight.d4cc@gmail.com>', // sender address
    to: email,
    text: `Email Confirmation - Hello, ${name}! Thank you for subscribing. Here is your confirmation code: ${token}`, // plain text body
    html: `
      <div>
      <h2>Email Confirmation</h2>
      <p>Hello, ${name}!</p>
      <p>Thank you for subscribing. Here is your confirmation code:</p>
      <h3 style="color:black;text-align:center;">${token}</h3>
      </div>`, // html body
  })
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

export const emailConfirmation = async (req, res, next) => {
  try {
    const { name, email } = req.body
    const emailCheck = await User.findOne({ email })

    if (emailCheck) {
      return res.json({ msg: 'Email is already in use', status: false })
    }
    await SendEmailVerification(email, name).catch(console.error)
    return res.json({ msg: `Email sent to ${email}`, status: true })
  } catch (error) {
    next(error)
  }
}

// const usernameCheck = await User.findOne({ username })
// if (usernameCheck) {
//   return res.json({
//     msg: 'Username is already in use',
//     status: false, // Puxar verificação no front
//   })
// }

// export const register = async (req, res, next) => {
//   try {
//     const { name, username, password } = req.body
//     const usernameCheck = await User.findOne({ username })
//     const emailCheck = await User.findOne({ email })
//     if (usernameCheck) {
//       return res.json({
//         msg: 'Username is already in use',
//         status: false,
//       })
//     }
//     if (emailCheck) {
//       return res.json({ msg: 'Email is already in use', status: false })
//     }
//     const hashedPassword = await brcypt.hash(password, 10)
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//     })
//     delete user.password
//     return res.json({ status: true, user })
//   } catch (error) {
//     next(error)
//   }
// }
