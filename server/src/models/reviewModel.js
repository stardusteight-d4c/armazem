import mongoose, { Schema } from 'mongoose'

export const reviewSchema = new mongoose.Schema(
  {
    from: String,
    by: { type: Schema.Types.ObjectId, ref: 'Account' },
    authorImage: String,
    authorUsername: String,
    review: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)
