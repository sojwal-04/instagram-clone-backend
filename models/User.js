import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.index({ username: 1, name: 1 });

const User = mongoose.model("User", userSchema);

export default User;
