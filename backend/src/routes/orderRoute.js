import express from 'express';
import { protectAuth } from '../middleware/authMiddleware.js';
import { checkOrderByUserId, confirmOrder, checkAllOrder } from '../controller/orderController.js';

const router = express.Router();


router.post('/order', protectAuth, confirmOrder)

router.get('/order', protectAuth, checkOrderByUserId)

router.get('/orders', protectAuth, checkAllOrder)



export default router;
