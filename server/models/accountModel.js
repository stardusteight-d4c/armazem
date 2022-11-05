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
  connections: {
    type: Array,
    with: String,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  sharedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: {
    type: Array,
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
  },
})

export default mongoose.model('Account', accountSchema)
