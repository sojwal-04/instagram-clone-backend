import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const isLoggedIn = async (req, res, next) => {
  
  const token =
    req.cookies.token || req.header["x-access-token"] || req.query.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Please log in or provide a valid token.",
    });
  }

  try {
  
    const decoded = jwt.verify(token, secretKey);
    req.userId = token.userId;

    next();
  } catch (err) {
    console.log("Error: " + err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
      error: `ERROR : ${err.message}`,
    });
  }
};

export default isLoggedIn;
