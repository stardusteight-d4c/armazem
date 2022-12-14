import Message from '../models/messageModel.js'

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body
    const data = await Message.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    })

    if (data) return res.json({ msg: 'Message added successfully.' })
    return res.json({ msg: 'Failed to add message to the database' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const allMessages = async (req, res) => {
  try {
    const { from, to } = req.query
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 })
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    })
    return res.json(projectMessages)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}

export const lastMessage = async (req, res) => {
  try {
    const { from, to } = req.query
    const messagesOfSender = await Message.find({
      users: {
        $all: [from, to],
      },
      sender: to,
    })
    const lastMessagReceived = messagesOfSender.slice(-1)
    return res.json(lastMessagReceived)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      status: false,
      msg: error.message,
    })
  }
}
