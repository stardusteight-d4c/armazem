const characters =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token = ''
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)]
}

// NODEMAILER CONFIGURATION
async function SendEmailVerification(email, name) {
  // SEND EMAIL WITH DEFINED TRANSPORT OBJECT
  let info = await transporter.sendMail({
    subject: 'Armazem - Email Verification',
    from: '"Developer from Armazem" <stardusteight.d4cc@gmail.com>',
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
}


