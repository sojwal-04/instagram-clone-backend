import User from "../models/User";

const searchUser = async (req, res) => {
  try {
    const { query } = req.query;

    // Find exact matches
    const exactMatches = await User.find({ username: query });

    // Find partial matches (case-insensitive)
    const partialMatches = await User.find({
      username: { $regex: query, $options: "i" },
    });

    // Concatenate the results, placing exact matches first
    const results = exactMatches.concat(
      partialMatches.filter(
        (user) => !exactMatches.some((e) => e._id.equals(user._id))
      )
    );

    return res.status(200).json({
      success: true,
      results: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { searchUser };
