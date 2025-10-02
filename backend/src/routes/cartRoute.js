import express from 'express';
import { addCart,updateCart,deleteCart,getCart } from '../controller/cartController.js';
import { protectAuth } from '../middleware/authMiddleware.js';

const router = express.Router();



router.post('/',protectAuth,addCart)
router.patch('/',protectAuth,updateCart)
router.delete('/',protectAuth, deleteCart)
router.get('/',protectAuth,getCart)


export default router;