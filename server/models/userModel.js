import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 2,
    max: 30,
  },
  username: {
    type: String,
    require: true,
    min: 3,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    require: false,
    min: 8,
  },
  avatarImage: {
    type: String,
    default: '',
  },
})

export default mongoose.model("User", userSchema) 