import User from '../models/userModel.js'

export const activeUser = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const now = new Date()

    await User.findByIdAndUpdate(
      userId,
      {
        $set: { lastActivity: now },
      },
    )

    return res
      .status(200)
      .json({ status: true })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}