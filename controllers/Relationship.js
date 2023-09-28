import Relationship from "../models/Relationship.js";
import User from "../models/User.js";

const getRelationship = async (req, res) => {
  try {
    const follower = req.query.follower;
    const following = req.query.following;

    const followerUser = await User.findOne({ username: follower });
    const followingUser = await User.findOne({ username: following });

    if (!followerUser || !followingUser) {
      // Handle the case where one or both users are not found
      return res.status(404).json({
        success: false,
        message: "User(s) not found",
      });
    }

    // Use Mongoose to find the relationship document based on follower and following IDs
    const relationship = await Relationship.findOne({
      follower: followerUser._id,
      following: followingUser._id,
    });

    return res.status(200).json({
      success: true,
      relationship: relationship,
    });
  } catch (err) {
    console.error(err);
    // Handle other errors with a 500 status code
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};


const follow = async (req, res) => {
  try {
    // /*
    const userIdToFollow = req.query.userIdToFollow;
    const followerId = req.query.followerId;

    if (!userIdToFollow) {
      return res.status(400).json({
        success: false,
        message: "Missing userIdToFollow in the request body",
      });
    }

    // if (followerId.toString() === userIdToFollow.toString()) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You cannot follow yourself",
    //   });
    // }

    const existingRelationship = await Relationship.findOne({
      follower: followerId,
      following: userIdToFollow,
    });

    if (existingRelationship) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    const newRelationship = new Relationship({
      follower: followerId,
      following: userIdToFollow,
    });

    await newRelationship.save();

    res.status(200).json({
      success: true,
      message: "You are now following this user",
      relationship: newRelationship,
    });
  } catch (err) {
    console.error("Error while following:", err);
    res.status(500).json({
      success: false,
      message: "Error while following",
      error: err.message,
    });
  }
};

const unfollow = async (req, res) => {
  try {
    const userIdToUnfollow = req.query.userIdToUnfollow;
    const followerId = req.query.followerId; // Assuming you have user authentication middleware

    if (!userIdToUnfollow) {
      return res.status(400).json({
        success: false,
        message: "Missing userIdToUnfollow in the request body",
      });
    }

    if (followerId.toString() === userIdToUnfollow.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    const deletedRelationship = await Relationship.findOneAndDelete({
      follower: followerId,
      following: userIdToUnfollow,
    });

    if (!deletedRelationship) {
      return res.status(400).json({
        success: false,
        message: "You are not currently following this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "You have unfollowed this user",
      relationship: deletedRelationship,
    });
  } catch (err) {
    console.error("Error while unfollowing:", err);
    res.status(500).json({
      success: false,
      message: "Error while unfollowing",
      error: err.message,
    });
  }
};

export { getRelationship, follow, unfollow };
