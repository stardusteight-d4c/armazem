import mongoose, { Schema } from 'mongoose'

const discussionSchema = new mongoose.Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  by: { type: Schema.Types.ObjectId, ref: 'User' },
  body: {
    type: String,
  },
  replies: {
    type: Array,
    reply: { type: Schema.Types.ObjectId, ref: 'Reply' },
  },
}, { timestamps: true })

export default mongoose.model('Discussion', discussionSchema)
