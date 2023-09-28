import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, name } = req.body;

    const names = name.trim().split(/\s+/);

    const firstName = names[0];
    const lastName = names[1] ?? "";

    if (!username || !email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password don't match",
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

    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      success: true,
      message: `User created successfully with username ${username}`,
      userId: user._id,
      username: user.username,
      token, // Include the token in the response
    });
  } catch (err) {
    console.error("Error while signing up: " + err);
    return res.status(500).json({
      success: false,
      message: "Error while signing up.",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // console.log("You are logging in ");

    if (
      !identifier ||
      identifier.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Both username/email and password are required.",
      });
    }

    let user;

    if (validator.isEmail(identifier)) {
      user = await User.findOne({ email: identifier?.trim() });
    } else {
      user = await User.findOne({ username: identifier?.trim() });
    }

    if (!user) {
      // console.log("User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "2h",
    });

    // console.log("Above token");
    user.token = token;
    // console.log("user.token = " + user.token);
    user.password = undefined;

    const options = {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, // Added secure flag for HTTPS
      sameSite: "none", // Set sameSite to 'none' for cross-origin cookies
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
      token: token,
    });
  } catch (err) {
    console.error("Error while login", err);
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while login",
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        message: "User logged out successfully",
      });
  } catch (err) {
    console.error("Error while logging out: " + err.message);
    return res.status(500).json({
      success: false,
      message: "Error while logging out",
      error: `Error while logging out: ${err}`,
    });
  }
};

export { login, logout, signUp };
