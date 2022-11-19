import mongoose, { Schema } from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    type: String,
    message: String,
    infos: Array,
    expireAt: { type: Date, expires: 604800 },
  },
  { timestamps: true }
)

/** 
 * Modifying your Mongoose schema won't modify an existing index, 
 * so you need to manually drop the TTL index and restart your app to 
 * re-create the index using the current definition. (drop collection)
 **/
export default mongoose.model('Notification', notificationSchema)
