import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    // To check all the fields are present
    if (!email || !userName || !password) {
      return res
        .status(400)
        .json({ Success: false, Message: "All fields are required" });
    }

    // to validate the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    if (!validEmail) {
      return res.status(400).json({ Success: false, Message: "Invalid Email" });
    }

    // to validate the password
    if (password.length < 6) {
      return res.status(400).json({
        Success: false,
        Message: "Password must be atleast 6 characters",
      });
    }

    // to check the existing userEmail
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ Success: false, Message: "Email already exists" });
    }

    // to check the existing userName
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res
        .status(400)
        .json({ Success: false, Message: "Username already exists" });
    }

    // to hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // to select the avatar randomly
    const Profile_Pictures = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image =
      Profile_Pictures[Math.floor(Math.random() * Profile_Pictures.length)];

    // to create the new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      image,
    });

    // to generate the token
    generateTokenAndSetCookie(newUser._id, res);

    // to save the new user
    await newUser.save();

    return res
      .status(201)
      .json({ Success: true, User: { ...newUser._doc, password: "" } });
  } catch (error) {
    console.error(`SignUp error: ${error.message}`);
    return res
      .status(500)
      .json({ Success: false, Message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // to check all the fields are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ Success: false, Message: "All fields are required" });
    }

    // to fetch the User Info from the Database
    const user = await User.findOne({ email: email });

    // to check the email is already registered
    if (!user) {
      return res
        .status(404)
        .json({ Success: false, Message: "Email not found" });
    }

    // to check the password is valid for respective email
    const passwordValidation = await bcryptjs.compare(password, user.password);
    if (!passwordValidation) {
      return res
        .status(400)
        .json({ Success: false, Message: "Password is Invalid" });
    }

    // to generate the token
    generateTokenAndSetCookie(user._id, res);

    return res
      .status(200)
      .json({ Success: true, User: { ...user._doc, password: "" } });
  } catch (error) {
    console.error(`Login failed: ${error.message}`);
    return res
      .status(500)
      .json({ Success: false, Message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    // to clear the cookie
    res.clearCookie("jwt-netflix");

    return res
      .status(200)
      .json({ Success: true, Message: "Logged out Successfully" });
  } catch (error) {
    console.error(`Logout error: ${error.message}`);
    return res
      .status(500)
      .json({ Success: false, Message: "Internal server error" });
  }
};

const authCheck = (req, res) => {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ Success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ Success: false, Message: "Internal server error" });
  }
};

export default { signup, login, logout, authCheck };
