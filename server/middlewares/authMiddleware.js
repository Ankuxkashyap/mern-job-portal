import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Get token from cookies

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    // console.log("working")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.  user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const isEmployer = (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    // console.log("working")
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an employer' });
  }
};

const isCandidate = (req, res, next) => {
  if (req.user && req.user.role === 'candidate') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a candidate' });
  }
};

export { protect, isEmployer, isCandidate };
