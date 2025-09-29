import express from 'express';
import { addCart,updateCart,deleteCart,getCart } from '../controller/cartController.js';
import { protectAuth } from '../middleware/authMiddleware.js';

const router = express.Router();



router.post('/addcart',protectAuth,addCart)
router.patch('/updatecart',protectAuth,updateCart)
router.delete('/deletecart',protectAuth, deleteCart)
router.get('/getcart',protectAuth,getCart)


export default router;