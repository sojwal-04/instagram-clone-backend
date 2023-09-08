import bcrypt from "bcrypt";
import User from "../models/User.js";

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, name } = req.body;

    const names = name.trim().split(/\s+/);

    const firstName = names[0];
    const lastName = names[1] ?? "";

    if (!username || !email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      profilePic: `https://avatars.dicebear.com/api/gridy/${firstName} ${lastName}.svg`,
    });

    return res.status(200).json({
      success: true,
      message: `User created successfully with username ${username}`,
    });
  } catch (err) {
    console.log("Error while signing up: " + err);
    return res.status(500).json({
      success: false,
      message: "Error while signing up.",
    });
  }
};

export { signUp };
