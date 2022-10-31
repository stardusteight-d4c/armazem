import mongoose, { Schema } from 'mongoose'

const replySchema = new mongoose.Schema(
  {
    discussion:  { type: Schema.Types.ObjectId, ref: 'Discussion' },
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    body: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Reply', replySchema)
