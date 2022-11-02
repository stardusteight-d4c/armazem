import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    likes: {
      type: Array,
      by: String,
    },
    discussions: {
      type: Array,
      discussion: { type: Schema.Types.ObjectId, ref: 'User' },
    }
  },
  { timestamps: true }
)

export default mongoose.model('Post', postSchema)
