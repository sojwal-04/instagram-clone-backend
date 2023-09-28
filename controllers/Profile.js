import Post from "../models/Post.js";
import Relationship from "../models/Relationship.js";
import User from "../models/User.js";

const profileDetails = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const postCount = await Post.countDocuments({ user: user._id });

    const followingCount = await Relationship.countDocuments({
      follower: user._id,
    });

    const followersCount = await Relationship.countDocuments({
      following: user._id,
    });

    const profileDetails = {
      _id: user._id,
      username: user.username,
      profilePic: user.profilePic,
      name: user.name,
      postCount,
      followingCount,
      followersCount,
    };

    return res.status(200).json({
      success: true,
      profileDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching profile details",
      error: err.message,
    });
  }
};

export { profileDetails };
