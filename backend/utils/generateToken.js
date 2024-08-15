import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

const { JWT_SECRET,NODE_ENV } = ENV_VARS;

const generateTokenAndSetCookie = (userId, res) => {
  // to create the token
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15d" })
  
  // to send the cookie
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // to prevent XSS attacks
    sameSite: "strict", // to prevent CSRF attacks
    secure: NODE_ENV !== "development"
  });

  return token;
}

export default generateTokenAndSetCookie;