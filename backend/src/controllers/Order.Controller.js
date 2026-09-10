import OrderModel from "../models/Order.Model.js"
import userModel from "../models/User.Models.js"
import transporter from "../config/NodeMailer.js";
import Stripe from 'stripe'




const stripe = new Stripe(process.env.STRIPE_SECRETkEY)


const placeOrderCOD = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const userId = req.user._id

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'cod',
            payments: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        return res.status(200).json({ success: true, message: "order Placed" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.user._id
        const { items, amount, address } = req.body

        const origin = req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";

        const currency = "pkr"
        const deliveryFee = 400

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payments: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'deliveryFee'
                },
                unit_amount: deliveryFee * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        return res.json({ success: true, session_url: session.url })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error " })
    }
}

// const placeOrderEasyPaisa = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }

const AllOrders = async (_, res) => {
    try {
        const orders = await OrderModel.find({})
        return res.status(200).json({ success: true, orders })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error " })
    }
}

const UserOrders = async (req, res) => {
    try {
        const userId = req.user._id
        const order = await OrderModel.find({ userId })
        return res.status(200).json({ success: true, order })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const removeOrderData = async (req, res) => {
    try {
        const { id } = req.body
        await OrderModel.findByIdAndDelete(id)
        return res.json({ success: true, message: "order deleted" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const UpdateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await OrderModel.findByIdAndUpdate(orderId, { status })
        return res.json({ success: true, message: "status updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const UserUpdateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        const userId = req.user._id

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const currectTime = new Date()
        const orderCreatedTime = new Date(order.createdAt)
        const timeDiffrence = (currectTime - orderCreatedTime) / (1000 * 60)

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { name, email } = user

        if (status === "Cancelled" && timeDiffrence > 5) {
            const MailOption = {
                from: 'danishicp99@gmail.com',
                to: email,
                subject: `Dear user, ${name}!`,
                text: `Dear ${name}, you cannot cancel the product now. Thank you..`,
            };
            await transporter.sendMail(MailOption)
            console.log(`email sent to ${name}`)
            return res.status(400).json({ success: false, message: "Time's up, you didn't cancel the order in time" });
        }

        await OrderModel.findByIdAndUpdate(orderId, { status })

        return res.json({ success: true, message: "status updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


export { placeOrderCOD, AllOrders, UserOrders, UpdateOrderStatus, UserUpdateOrderStatus, removeOrderData, placeOrderStripe }
