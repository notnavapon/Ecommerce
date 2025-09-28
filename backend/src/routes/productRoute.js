import express from 'express';
import { protectAuth } from '../middleware/authMiddleware.js';
import { addProduct ,updateStockProduct, checkProduct} from '../controller/productController.js';
import {uploadFile} from '../middleware/uploadMiddleware.js'


const router = express.Router();


router.post('/add',uploadFile("image"), addProduct);
router.patch('/updatestock',protectAuth,updateStockProduct);
router.get('/checkproduct',checkProduct);


export default router;