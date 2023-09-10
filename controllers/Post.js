import User from "../models/User.js";
import Post from "../models/Post.js";

// Helper functions for fetching posts
const getPostsForMyProfile = async (userId) => {
  return await Post.find({ user: userId }).sort({ createdAt: -1 });
};

const getPostsForOtherProfile = async (userId) => {
  return await Post.find({ user: userId }).sort({ createdAt: -1 });
};

const getPostsForHome = async (userId) => {
  const following = await Relationship.find({ follower: userId }).select(
    "following"
  );
  const followingIds = following.map((rel) => rel.following);
  return await Post.find({ user: { $in: followingIds } }).sort({
    createdAt: -1,
  });
};

//============= Main functions =================

const createPost = async (req, res, next) => {
  try {
    // Extract the necessary data from the request body
    const { userId, imageUrl, caption } = req.body;

    // Create a new post using the Post model
    const post = new Post({
      user: userId,
      imageUrl,
      caption,
    });

    // Save the post to the database
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: post,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({
      success: false,
      message: "Error while creating post",
      error: err.message,
    });
  }
};

const fetchPosts = async (req, res, next) => {
  try {
    // Validation: Check if at least one valid query parameter is provided.
    const { userId } = req.params;
    const { myProfile, otherProfile, home } = req.query;

    if (!(myProfile || (otherProfile && userId) || home)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request parameters",
      });
    }

    let posts;

    if (myProfile) {
      posts = await getPostsForMyProfile(req.user._id);
    } else if (otherProfile && userId) {
      posts = await getPostsForOtherProfile(userId);
    } else if (home) {
      posts = await getPostsForHome(req.user._id);
    }

    res.json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error fetching posts" });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      user: userId,
    });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message:
          "Post not found or you don't have permission to delete this post.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully." });
  } catch (err) {
    console.log("Error creating post : " + err.message);
    return res.status(500).json({
      success: false,
      message: "Error while deleting post : " + err,
    });
  }
};

export { createPost, deletePost, fetchPosts };
