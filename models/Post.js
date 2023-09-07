import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.index({ user: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
