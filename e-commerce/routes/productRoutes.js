import express from 'express';
import {
 createProduct,
 getProducts,
 getOneProduct,
 updateProduct,
 deleteProduct
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Route to create a new product
router.post('/add',protect, createProduct);

// Route to get all products
router.get('/allproducts', protect,getProducts);
// Route to get single product
router.get('/singleProduct/:id',protect, getOneProduct);

// Route to update a product by ID
router.put('/update/:id',protect, updateProduct);

// Route to delete a product by ID
router.delete('/delete/:id',protect, deleteProduct);

export default router;