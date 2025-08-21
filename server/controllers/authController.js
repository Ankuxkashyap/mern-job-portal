import mongoose from 'mongoose';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }


    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });



    const token = generateToken(user._id); 

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      role: user.role,
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id); // ✅ Fix here

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days  
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      success: true,
      message :"Login successful"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const roleselction = async(req, res )=>{
  try{
    const {role} = req.body;
    const id =  req.user._id
    const user = await User.findOne(id).select('-password');;
    user.role = role;
    const updateRole = await user.save();
    res.status(201).json({message:" Role update Successfully" ,success: true ,user : user})
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { name, email, oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    if (name) user.name = name;
    if (email) user.email = email;

    
    if (oldPassword || newPassword || confirmPassword) {
      
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New password and confirm password do not match" });
      }

      
      const isSame = await bcrypt.compare(newPassword, user.password);
      if (isSame) {
        return res.status(400).json({ message: "New password must be different from old password" });
      }

      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const guestLogin = async (req, res) => {
  try {
    
    const guestUser = {
      id: "guest_" + Date.now(),   
      name: "Guest User",
      email: "guest@example.com",
      role: "candidate",
    };

    
    const token = jwt.sign(
      { id: guestUser.id, role: guestUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Guest login successful",
      token,
      user: guestUser
    });

  } catch (error) {
    console.error("Guest login error:", error);
    res.status(500).json({ message: "Guest login failed" });
  }
};

export { registerUser, loginUser };
