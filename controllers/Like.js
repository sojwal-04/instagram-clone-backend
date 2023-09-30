import Like from "../models/Like.js";
import Post from "../models/Post.js";

const fetchLike = async (req, res) => {
  try {
    const { postId, userId } = req.query;
    const like = await Like.findOne({ post: postId, user: userId });

    return res.status(200).json({ success: true, like: like });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const { postIdToLike, likedBy } = req.query;

    const postExists = await Post.findOne({ _id: postIdToLike });
    if (!postExists) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const like = await Like.findOne({ post: postIdToLike, user: likedBy });

    if (like) {
      return res.status(201).json({
        success: false,
        message: "Post already liked by the user",
      });
    }

    await Like.create({ user: likedBy, post: postIdToLike });

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
    });
  } catch (err) {
    console.error("Error: " + err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

export { fetchLike, likePost, unlikePost };
