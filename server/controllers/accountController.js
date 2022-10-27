import mongoose from 'mongoose'
import Account from '../models/accountModel.js'

export const sendRequest = async (req, res, next) => {
  const { id, username } = req.body
  console.log(id)
 const objectId = mongoose.Types.ObjectId(id);
  const account = await Account.find({
    account: { from: objectId },
  })
  console.log(account)
  return res.json({ account })
}
