import express from 'express';
import { signup, loginUser } from '../controllers/usercontroller.js';
import { upload } from "../middlewares/upload.js";



const router = express.Router();

router.post("/adminsignup", upload.single("profileImage"), signup);
router.post('/adminlogin', loginUser);

export default router;