import jwt from 'jsonwebtoken'

export const checkSession = async (req, res, next) => {
  try {
    const sessionToken = req.headers.authorization
    const decode = jwt.verify(sessionToken, process.env.JWT_SECRET)
    return res.status(200).json({ status: true, session: decode })
  } catch (error) {
    return res.json({ status: false, msg: 'Expired or invalid token' })
  }
}
