import express from 'express';
import UserMiddleware from '../middleware/User.Auth.Middleware.js';
import { addtoCart, GetUserCart, UpdateCart } from '../controllers/UserCart.controller.js';

const userCart = express.Router();

userCart.post('/add',UserMiddleware,addtoCart)
userCart.post('/get',UserMiddleware,GetUserCart)
userCart.post('/update',UserMiddleware,UpdateCart)

export default userCart;
