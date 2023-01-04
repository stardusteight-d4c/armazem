import nodemailer from 'nodemailer'

// NODEMAILER CONFIGURATION
export async function sendEmailVerification(email, name, token) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.ethereal.email',
    auth: {
      user: 'stardusteight.d4cc@gmail.com',
      pass: process.env.TWO_STEP_VERIF_PASS, // get in google Two-step verification
    },
  })

  // SEND EMAIL WITH DEFINED TRANSPORT OBJECT
  await transporter.sendMail({
    subject: 'Armazem',
    from: '"Developer at Armazem 👻" <stardusteight.d4cc@gmail.com>',
    to: email,
    text: `Email Confirmation - Hello, ${name}! Thank you for subscribing. Here is your confirmation code: ${token}`,
    html: `
      <div>
      <h2>Email Confirmation</h2>
      <p>Hello, ${name}!</p>
      <p>Thank you for subscribing. Here is your confirmation code:</p>
      <h3 style="color:black;">${token}</h3>
      </div>`,
  })
}

export async function sendChangeEmailVerification(email, name, token) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.ethereal.email',
    auth: {
      user: 'stardusteight.d4cc@gmail.com',
      pass: process.env.TWO_STEP_VERIF_PASS, // get in google Two-step verification
    },
  })

  // SEND EMAIL WITH DEFINED TRANSPORT OBJECT
  await transporter.sendMail({
    subject: 'Armazem',
    from: '"Developer at Armazem 👻" <stardusteight.d4cc@gmail.com>',
    to: email,
    text: `Email change - Hello, ${name}! An email change was requested on your account, here is your token:: ${token}`,
    html: `
      <div>
      <h2>Email Confirmation</h2>
      <p>Hello, ${name}!</p>
      <p>An email change was requested on your account, here is your token:</p>
      <h3 style="color:black;">${token}</h3>
      <p>If it wasn't you, change your Armazem account password immediately.</p>
      </div>`,
  })
}
