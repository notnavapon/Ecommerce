import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient.js';


export const protectAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role:true, profilePic: true }
    });
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; //id , name ,email,role, profilepic
    // console.log("auth middleware:",user)
    next();  
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}