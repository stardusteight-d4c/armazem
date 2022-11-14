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
    type: String,
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
    type: String,
    require: true,
  },
  genres: {
    type:  Array,
    require: true,
  },
  score: [
    {
      accountId: String,
      score: Number,
    },
  ],
  readers: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  insertedBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

export default mongoose.model('Manga', mangaSchema)
