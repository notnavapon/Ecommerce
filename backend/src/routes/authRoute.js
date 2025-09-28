import express from 'express';
import {login,logout,register,checkauth} from '../controller/authController.js'

//middleware
import { protectAuth } from '../middleware/authMiddleware.js';
import {uploadFile} from '../middleware/uploadMiddleware.js'

const router = express.Router();

// REGISTER
router.post('/register',uploadFile("profilePic"), register);

// LOGIN
router.post('/login', login);

// LOGOUT
router.post('/logout',logout);


//check auth
router.get('/checkauth', protectAuth, checkauth);

export default router;
