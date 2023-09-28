import Relationship from "../models/Relationship.js";

const follow = async (req, res) => {
  try {
    const userIdToFollow = req.query.userIdToFollow;
    const followerId = req.query.followerId; // Assuming you have user authentication middleware

    if (!userIdToFollow) {
      return res.status(400).json({
        success: false,
        message: "Missing userIdToFollow in the request body",
      });
    }

    if (followerId.toString() === userIdToFollow.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

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
    const { userIdToUnfollow } = req.query.userIdToFollow;
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

export { follow, unfollow };
