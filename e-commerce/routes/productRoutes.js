import express from 'express';
import {
 createProduct,
 getProducts,
 getOneProduct,
 updateProduct,
 deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Route to create a new product
router.post('/add', createProduct);

// Route to get all products
router.get('/allproducts', getProducts);
// Route to get single product
router.get('/singleProduct/:id', getOneProduct);

// Route to update a product by ID
router.put('/update/:id', updateProduct);

// Route to delete a product by ID
router.delete('/delete/:id', deleteProduct);

export default router;