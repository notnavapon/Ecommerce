import express from 'express';
import { protectAuth } from '../middleware/authMiddleware.js';
import { addProduct ,updateStockProduct, checkProduct, updateProduct, deleteProduct} from '../controller/productController.js';
import {uploadFile} from '../middleware/uploadMiddleware.js'


const router = express.Router();


router.post('/add',protectAuth,uploadFile("image"), addProduct);
router.patch('/updatestock/:id',protectAuth,updateStockProduct);
router.get('/checkproduct',checkProduct);

router.patch('/updateproduct/:id',protectAuth,updateProduct);
router.delete('/deleteproduct/:id',protectAuth,deleteProduct);
export default router;