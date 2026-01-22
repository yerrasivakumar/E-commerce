import express from 'express';
import {saveAddress,getAddresses,deleteAddress} from '../controllers/addressController.js';
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/add', protect,saveAddress);
router.get('/useraddress/:userId', protect,getAddresses);
router.delete('/deleteaddress/:id', protect,deleteAddress);

export default router;