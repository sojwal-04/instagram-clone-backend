import Relationship from "../models/Relationship.js";

const follow = async (req, res, next) => {
  try {
    const res = 2;
  } catch (err) {
    console.log("Error: " + err);
  }
};

const unfollow = async (req, res, next) => {
  try {
    const res = 2;
  } catch (err) {
    console.log("Error: " + err);
  }
};

export { follow, unfollow };
