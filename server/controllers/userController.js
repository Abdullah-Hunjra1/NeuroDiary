import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto'


//API to register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomInt(100000, 999999).toString();

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false
    });
    await newUser.save();

    await sendEmail(email, "NeuroDiary OTP Verification", `Your OTP code is: ${otp}`);

    res.json({ success: true, message: "OTP sent to your email. Please verify." });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for login user
const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist"
      })
    }

    // Check if verified
    if (!user.isVerified) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({
        success: true,
        token,
      })
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials"
      })
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token });




  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // Mark as verified
    user.isVerified = true;
    user.otp = null; // Clear OTP after verification
    await user.save();

    res.json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//get profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ FIXED
    const userData = await userModel.findById(userId).select('-password');

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Use from token
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address), // 🟢 still needed because address is a JSON string in formData
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export { registerUser, loginUser, getProfile, updateProfile };