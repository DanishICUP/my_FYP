import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import Connectdb from './src/config/Connectdb.js'
import connectCloudinary from './src/config/ConnectCloudinary.js'
import userRoutes from './src/routes/User.Routes.js'
import { ProductsRoutes } from './src/routes/Products.Routes.js'
import { advRoutes } from './src/routes/Advertisement.routes.js'
import userCart from './src/routes/UserCart.routes.js'
import OrderRoutes from './src/routes/Order.Routes.js'
import { createServer } from 'http'
import { Server } from 'socket.io'



//app configuration
const app = express()
const PORT = process.env.PORT || 5000

//sosket io configuration
const server = createServer(app)
const io = new Server(server, {
    //this for chat system allowing the frontend to access the backend with credentials like cookies and headers
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true
    }
})

//some connections
connectCloudinary()
Connectdb()


//app middlewares
app.use(express.json())

// this for order data allowing the frontend to access the backend with credentials like cookies and headers
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


io.on('connection', (socket) => {
    console.log(`user connected to server: ${socket.id}`)
})


//api endPoints
app.get('/', (_, res) => {
    res.send("OK server is running")
})

app.use('/api/user', userRoutes)
app.use('/api/products', ProductsRoutes)
app.use('/api/adv', advRoutes)
app.use('/api/cart', userCart)
app.use('/api/order', OrderRoutes)



//app listening
server.listen(PORT, () => {
    console.log(`server is running on port https://localhost:${PORT}`)
})