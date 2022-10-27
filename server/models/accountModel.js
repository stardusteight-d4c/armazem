import mongoose, { Schema } from 'mongoose'

const accountSchema = new mongoose.Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  requests: {
    type: Array,
    from: String,
  },
  pending_requests: {
    type: Array,
    to: String,
  },
})

export default mongoose.model('Account', accountSchema)
