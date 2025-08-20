// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const authUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized - Please login again',
//       });
//     }

//     const token = authHeader.split(' ')[1]; // Get token after 'Bearer '
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'User not found' });
//     }

//     req.user = {
//       userId: user._id,
//       isAdmin: user.isAdmin, // ✅ Include this for admin checks
//     };

//     next();
//   } catch (error) {
//     console.error('Auth Error:', error.message);
//     res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token',
//     });
//   }
// };

// export default authUser;





























// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized - Please login again',
//       });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Hardcoded admin bypass
//     if (decoded.isAdmin && decoded.email === "hafizabd804@gmail.com") {
//       req.user = { userId: null, isAdmin: true, email: decoded.email };
//       return next();
//     }

//     // ❌ If you don't want DB users at all, just block others:
//     return res.status(403).json({
//       success: false,
//       message: "Access denied - Admin only",
//     });

//   } catch (error) {
//     console.error("Auth Error:", error.message);
//     res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default authUser;











// --------------------



import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login again",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Hardcoded Admin Bypass
    if (decoded.isAdmin && decoded.email === "hafizabd804@gmail.com") {
      req.user = { _id: "admin", email: decoded.email, isAdmin: true };
      return next();
    }

    // ✅ Normal User Flow
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;
