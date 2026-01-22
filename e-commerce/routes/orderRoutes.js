import express from 'express';
import { placeOrder,getorderHistory,getAllOrders,getOrdersByStatus,updateOrderStatus} from '../controllers/orderController.js';
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/place',protect, placeOrder);
router.get('/orderhistory/:userId',protect, getorderHistory);
router.get("/admin/orders", getAllOrders);
router.get("/admin/orders/:status",protect, getOrdersByStatus);
router.put("/admin/order/:orderId",protect,updateOrderStatus);

export default router;