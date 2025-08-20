// import express from 'express';
// import {
//   adminLogin,
//   getAllUsers,
//   getAllEntries,
//   deleteUser,
//   deleteEntry,
//   promoteToAdmin,
// } from '../controllers/adminController.js';
// import authUser from '../middlewares/authUser.js';
// import adminOnly from '../middlewares/adminMiddleware.js';

// const router = express.Router();

// router.post('/login', adminLogin);
// router.get('/users', authUser, adminOnly, getAllUsers);
// router.get('/entries', authUser, adminOnly, getAllEntries);
// router.delete('/user/:id', authUser, adminOnly, deleteUser);
// router.delete('/entry/:id', authUser, adminOnly, deleteEntry);
// router.put('/promote/:id', authUser, adminOnly, promoteToAdmin); // Optional

// export default router;






// routes/adminRoute.js
import express from "express";
import {
  adminLogin,
  getAllUsers,
  getAllEntries,
  deleteUser,
  deleteEntry,
  promoteToAdmin,
} from "../controllers/adminController.js";
import authUser from "../middlewares/authUser.js";
import adminOnly from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ✅ Admin login (no middleware required)
router.post("/login", adminLogin);

// ✅ Protected admin routes
router.get("/users", authUser, adminOnly, getAllUsers);
router.get("/entries", authUser, adminOnly, getAllEntries);
router.delete("/user/:id", authUser, adminOnly, deleteUser);
router.delete("/entry/:id", authUser, adminOnly, deleteEntry);

// ✅ Optional: Promote normal user → admin
router.put("/promote/:id", authUser, adminOnly, promoteToAdmin);

export default router;
