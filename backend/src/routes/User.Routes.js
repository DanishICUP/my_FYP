import express from 'express'
import {
    AdminLogin,
    GetUserData,
    LoginUser, LogoutUser, RegisterUser,
    resetPassword,
    SendResetOtp,
    sendverfiyOtp,
    verfiyEmail
} from '../controllers/User.Controllers.js'
import UserMiddleware from '../middleware/User.Auth.Middleware.js'

const userRoutes = express.Router()

userRoutes.post('/login', LoginUser)
userRoutes.post('/register', RegisterUser)
userRoutes.post('/logout', LogoutUser)
userRoutes.post('/admin', AdminLogin)
userRoutes.post('/otp', UserMiddleware, sendverfiyOtp)
userRoutes.post('/verifyotp', UserMiddleware, verfiyEmail)
userRoutes.post('/resetOtpForPassword', SendResetOtp)
userRoutes.post('/resetpassword', resetPassword)
userRoutes.get('/getuserdetails', UserMiddleware, GetUserData)






export default userRoutes