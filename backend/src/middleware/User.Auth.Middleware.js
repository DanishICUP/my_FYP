import jwt from 'jsonwebtoken'
import userModel from '../models/User.Models.js'

const UserMiddleware = async (req, res, next) => {
    try {
        // const token = req.cookies.token
        const token = req.headers.token

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized user" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }
        const user = await userModel.findById(decoded.userId).select('-password')
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        req.user = user
        next()
    } catch (error) {
        console.log('Error in UserMiddleware: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export default UserMiddleware