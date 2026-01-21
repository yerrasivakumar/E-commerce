import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      password,
    } = req.body;

    // Validation
    if (!name || !email || !mobileNumber || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }

    const userExists = await User.findOne({
      $or: [{ email }, { mobileNumber }]
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobileNumber,
      password: hashPassword,
      profileImage: req.file.path // store image path
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login User
export const loginUser = async (req, res) => {
    try{
        const { mobileNumber, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ mobileNumber });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //Genrate JWT Token
const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET,{ expiresIn:"7d" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};