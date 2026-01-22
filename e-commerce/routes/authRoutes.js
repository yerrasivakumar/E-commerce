import express from 'express';
import { signup, loginUser,singleuser } from '../controllers/usercontroller.js';
import { upload } from "../middlewares/upload.js";



const router = express.Router();

router.post("/signup", upload.single("profileImage"), signup);
router.post('/login', loginUser);
router.get('/singleuser/:userId', singleuser);

export default router;