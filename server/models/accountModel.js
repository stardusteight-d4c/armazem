import mongoose, { Schema } from 'mongoose'
import userModel from './userModel'

const accountSchema = new mongoose.Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  connections: {
    type: [userModel.schema],
  },
  posts: {
    type: Array,
  },
  // Referenciar model post
  liked: {
    type: Array,
  },
  // Referenciar model manga
  reading: {
    type: Array,
  },
  completed: {
    type: Array,
  },
  plan_to_read: {
    type: Array,
  },
  favorites: {
    type: Array,
  },
})

export default mongoose.model('Account', accountSchema)
