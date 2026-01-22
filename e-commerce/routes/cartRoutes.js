import express from 'express';
import {
    addToCart,
    removeItem,
    updateQuantity,
    getCart
} from '../controllers/cartController.js';
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Add item to cart
router.post('/add',protect, addToCart);

// Remove item from cart
router.post('/remove', protect,removeItem);

// Update item quantity in cart
router.post('/update',protect, updateQuantity);

// Get user's cart
router.get('/user/:userId',protect, getCart);

export default router;