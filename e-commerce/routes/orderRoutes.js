import express from 'express';
import { placeOrder,getorderHistory} from '../controllers/orderController.js';
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/place',protect, placeOrder);
router.get('/orderhistory/:userId',protect, getorderHistory);

export default router;