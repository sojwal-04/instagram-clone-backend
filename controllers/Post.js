import User from "../models/User";
import Post from "../models/Post";

const createPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
  } catch (err) {
    console.log("Error creating post : " + err.message);
    return res.status(500).json({
      success: false,
      message: "Error while creating post : " + err,
    });
  }
  s;
};

const fetchPosts = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
  } catch (err) {
    console.log("Error creating post : " + err.message);
    return res.status(500).json({
      success: false,
      message: "Error while deleting post : " + err,
    });
  }
};

export { createPost, deletePost, fetchPosts };