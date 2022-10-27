import mongoose, { Schema } from 'mongoose'

const accountSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  requestsReceived: {
    type: Array,
    from: String,
  },
  requestsSent: {
    type: Array,
    to: String,
  },
})

export default mongoose.model('Account', accountSchema)
