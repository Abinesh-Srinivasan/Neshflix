import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

const { JWT_SECRET } = ENV_VARS;
const protectRoute = async (req, res, next) => {
  try {
    // token creation by using the cookie from the request
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ Success: false, Message: "Unauthorized - No token provided" });
    }

    // verification of the created token with JWT_SECRET in ENV_VARS
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ Success: false, Message: "Unauthorized - Invalid token" });
    }

    // get the user doc from the db excluding password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ Success: false, Message: "User not found" });
    }

    req.user = user; // used in subsequent routes
    next();
  } catch (error) {
    console.log(`Error in protectRoute Middleware: ${error.message}`);
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

export default protectRoute;
