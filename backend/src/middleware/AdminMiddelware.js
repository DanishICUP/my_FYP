import jwt from 'jsonwebtoken'

const AdminMiddleware = (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.status(404).json({ success: false, message: "Token not found" })
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS) {
            return res.status(404).json({ success: false, message: "UnAutorized User" })
        }
        next()
    } catch (error) {
        console.log("error in checking admin auth middleware", error)
        return res.status(404).json({ success: false, message: "UnAutorized User" })
    }
}

export default AdminMiddleware