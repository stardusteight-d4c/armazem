import mongoose, { Schema } from 'mongoose'
import userModel from './userModel'

const accountSchema = new mongoose.Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  requests: {
    type: Array,
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
  },
  pending_requests: {
    type: Array,
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
  },
})

export default mongoose.model('Account', accountSchema)
