import express from 'express';
import { protectAuth } from '../middleware/authMiddleware.js';
import { addProduct ,updateStockProduct, checkProduct, updateProduct, deleteProduct} from '../controller/productController.js';
import {uploadFile} from '../middleware/uploadMiddleware.js'


const router = express.Router();


router.post('/',protectAuth,uploadFile("image"), addProduct);
router.patch('/:id/stock',protectAuth,updateStockProduct);
router.get('/',checkProduct);

router.patch('/:id/stock',protectAuth,updateProduct);
router.delete('/:id',protectAuth,deleteProduct);
export default router;