import userModel from "../models/userModel.js";

const isPremium = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user || !user.isPremium) {
      return res.status(403).json({
        success: false,
        message: "You need a premium subscription to access this feature."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default isPremium;
