import express from 'express'
import { AllOrders, placeOrderCOD, removeOrderData, UpdateOrderStatus, UserOrders, UserUpdateOrderStatus,placeOrderStripe } from '../controllers/Order.Controller.js'
import UserMiddleware from '../middleware/User.Auth.Middleware.js'
import AdminMiddleware from '../middleware/AdminMiddelware.js'

const OrderRoutes = express.Router()


OrderRoutes.post('/cod', UserMiddleware, placeOrderCOD)
OrderRoutes.post('/stripe', UserMiddleware, placeOrderStripe)
OrderRoutes.post('/userOrder', UserMiddleware, UserOrders)

OrderRoutes.post('/list', AdminMiddleware, AllOrders)
OrderRoutes.post('/orderStatus', AdminMiddleware, UpdateOrderStatus)
OrderRoutes.post('/userOrderStatus', UserMiddleware, UserUpdateOrderStatus)
OrderRoutes.post('/deleteorder', AdminMiddleware, removeOrderData)





export default OrderRoutes

