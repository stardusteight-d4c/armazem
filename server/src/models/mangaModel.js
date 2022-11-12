import mongoose, { Schema } from 'mongoose'

export const mangaSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  synopsis: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  chapters: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  serialization: {
    type: String,
    require: true,
  },
  published: {
    type: Number,
    require: true,
  },
  score: [
    {
      userId: String,
      score: Number,
    },
  ],
  readers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
})

export default mongoose.model('Manga', mangaSchema)
