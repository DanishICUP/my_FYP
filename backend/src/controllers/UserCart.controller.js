import userModel from "../models/User.Models.js"


const addtoCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.user._id
        console.log("userId", userId)
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        return res.json({ success: true, message: "add to cart data" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

const UpdateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body
        const userId = req.user._id
        const userData = await userModel.findById(userId)

        let cartData = userData.cartData


        if (quantity === 0) {
            delete cartData[itemId][size]
            if (Object.keys(cartData[itemId][size] === 0)) {
                delete cartData[itemId]
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {}
            }
            cartData[itemId][size] = quantity
        }
        // cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        return res.status(200).json({ success: true, message: "Cart updated" })
    } catch (error) {
        console.log("Error in update controller", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const GetUserCart = async (req, res) => {
    try {
        const userId = req.user._id

        const userData = await userModel.findById(userId)
        const cartData = userData.cartData
        console.log("cartData", cartData)
        return res.status(200).json({ success: true, cartData })
    } catch (error) {
        console.log("Error in get user cart controller", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export { addtoCart, UpdateCart, GetUserCart }