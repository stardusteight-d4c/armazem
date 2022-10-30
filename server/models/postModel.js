import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema({
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
    mainDiscussion: {
      by: { type: Schema.Types.ObjectId, ref: 'User' },
      body: {
        type: String,
      },
      replies: {
        type: Array,
        reply: {
          by: { type: Schema.Types.ObjectId, ref: 'User' },
          to: { type: Schema.Types.ObjectId, ref: 'User' },
          body: {
            type: String,
          },
        },
      },
    },
  },
}, { timestamps: true })

export default mongoose.model('Post', postSchema)
