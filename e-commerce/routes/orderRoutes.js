import express from 'express';
import { placeOrder,getorderHistory} from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', placeOrder);
router.get('/orderhistory/:userId', getorderHistory);

export default router;