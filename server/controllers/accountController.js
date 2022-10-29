import Account from '../models/accountModel.js'
import User from '../models/userModel.js'

export const accountDataByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id
    const userAccountRef = await User.findById(userId).select('account')
    const account = await Account.findById(userAccountRef.account)
    return res.status(200).json({ account, status: true, msg: 'Account found' })
  } catch (error) {
    next(error)
  }
}

export const sendRequest = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    const requestAlreadyReceived = await Account.findById(
      toAccountRef.account,
      { requestsReceived: { from } }
    )

    if (requestAlreadyReceived.requestsReceived.length === 0) {
      await Account.findByIdAndUpdate(
        fromAccountRef.account,
        { $push: { requestsSent: { to } } },
        { safe: true, upsert: true }
      )
      await Account.findByIdAndUpdate(
        toAccountRef.account,
        { $push: { requestsReceived: { from } } },
        { safe: true, upsert: true }
      )
      return res
        .status(200)
        .json({ status: true, msg: 'Request sent successfully' })
    } else {
      return res
        .status(200)
        .json({ status: false, msg: 'Request has already been sent' })
    }
  } catch (error) {
    next(error)
  }
  return res.json({ status: true })
}

export const addConnection = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    // Link connection
    await Account.findByIdAndUpdate(toAccountRef.account, {
      connections: { with: from },
    })
    await Account.findByIdAndUpdate(fromAccountRef.account, {
      connections: { with: to },
    })

    // Delete request
    await Account.findByIdAndUpdate(
      fromAccountRef.account,
      {
        $pull: { requestsReceived: { from: to } },
      },
      { safe: true, multi: false }
    )
    await Account.findByIdAndUpdate(
      toAccountRef.account,
      {
        $pull: { requestsSent: { to: from } },
      },
      { safe: true, multi: false }
    )
    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    next(error)
  }
}

export const rejectConnection = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    // Delete request
    await Account.findByIdAndUpdate(
      fromAccountRef.account,
      {
        $pull: { requestsReceived: { from: to } },
      },
      { safe: true, multi: false }
    )
    await Account.findByIdAndUpdate(
      toAccountRef.account,
      {
        $pull: { requestsSent: { to: from } },
      },
      { safe: true, multi: false }
    )
    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    next(error)
  }
}

export const removeConnection = async (req, res, next) => {
  const { to, from } = req.body
  try {
    const toAccountRef = await User.findById(to).select('account')
    const fromAccountRef = await User.findById(from).select('account')

    // Delete connection
    await Account.findByIdAndUpdate(
      fromAccountRef.account,
      {
        $pull: { connections: { with: to } },
      },
      { safe: true, multi: false }
    )
    await Account.findByIdAndUpdate(
      toAccountRef.account,
      {
        $pull: { connections: { with: from } },
      },
      { safe: true, multi: false }
    )
    return res
      .status(200)
      .json({ status: true, msg: 'Operation performed successfully' })
  } catch (error) {
    next(error)
  }
}

// export const userConnections = async (req, res, next) => {
//   const { id } = req.params.id
//   try {
//     const userAccountRef = await User.findById(id).select('account')
//     const connections = await Account.findById(userAccountRef.account).select('connections')

//     console.log('connections', connections)

//     return res
//       .status(200)
//       .json({ status: true, msg: 'Operation performed successfully' })
//   } catch (error) {
//     next(error)
//   }
// }
