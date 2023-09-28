import Like from "../models/Like.js";
import Post from "../models/Post.js";

const likePost = async (req, res) => {
  try {
    const { postIdToLike, likedBy } = req.query;

    const postExists = await Post.findOne({ _id: postIdToLike });
    if (!postExists) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    await Like.create({
      user: likedBy,
      post: postIdToLike,
    });

    return res
      .status(201)
      .json({ success: true, message: "Post liked successfully" });
  } catch (err) {
    console.error("Error: " + err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { postIdToUnlike, unlikedBy } = req.query;

    const postExists = await Post.findOne({ _id: postIdToUnlike });
    if (!postExists) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const result = await Like.findOneAndDelete({
      user: unlikedBy,
      post: postIdToUnlike,
    });

    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Post unliked successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Like not found" });
    }
  } catch (err) {
    console.error("Error: " + err.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { likePost, unlikePost };
