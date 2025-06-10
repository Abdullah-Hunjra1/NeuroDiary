// import jwt from 'jsonwebtoken';

// //user authentication middleware
// const authUser = async(req,res,next) => {
//     try{
//         const {token} = req.headers;
//         if(!token){
//             return res.json({
//                 success: false,
//                 message: "No Authorized login again",
//             });
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id; 

//         next();

//     } catch(error){
//         console.log(error);
//         res.json({
//             success: false,
//             message: error.message,
//         });
//     }
// }

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: 'Unauthorized - Please login again',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Don't assign to req.body — use req.user instead
    req.user = { userId: decoded.id };

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
