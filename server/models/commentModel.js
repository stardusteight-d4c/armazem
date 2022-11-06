import mongoose, { Schema } from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    in: { type: Schema.Types.ObjectId, ref: 'Account' },
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
  },
  { timestamps: true }
)

export default mongoose.model('Comment', commentSchema)
