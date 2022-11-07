import nodemailer from 'nodemailer'

// NODEMAILER CONFIGURATION
export async function SendEmailVerification(email, name, token) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.ethereal.email",
    auth: {
      user: 'stardusteight.d4cc@gmail.com',
      pass: 'gtrqgsupsmiogwcv', // get in google Two-step verification
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