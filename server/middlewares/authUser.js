// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     if (!token) {
//       return res.json({
//         success: false,
//         message: 'Unauthorized - Please login again',
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Don't assign to req.body — use req.user instead
//     req.user = { userId: decoded.id };

//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default authUser;











// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.json({
//         success: false,
//         message: 'Unauthorized - Please login again',
//       });
//     }

//     const token = authHeader.split(' ')[1]; // Get token after 'Bearer '
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { userId: decoded.id };
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default authUser;
















import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // ✅ Make sure this path is correct

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Please login again',
      });
    }

    const token = authHeader.split(' ')[1]; // Get token after 'Bearer '
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = {
      userId: user._id,
      isAdmin: user.isAdmin, // ✅ Include this for admin checks
    };

    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default authUser;
