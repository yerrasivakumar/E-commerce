import express from 'express';
import { signup, loginUser,singleuser } from '../controllers/usercontroller.js';
import { upload } from "../middlewares/upload.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single("profileImage"), signup);
router.post('/login', loginUser);
router.get('/singleuser/:userId',protect, singleuser);

export default router;