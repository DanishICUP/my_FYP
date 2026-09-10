import { createContext, useEffect, useState } from 'react'
// import { products } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const navigate = useNavigate()
    const CurrencySymbole = "Rs";
    // const deliveryFee = 0
    const [deliveryFee, setdeliveryFee] = useState(0)
    const backendUrl = "http://localhost:8000"
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [token, setToken] = useState('')
    const [AuthUserData, setAuthUserData] = useState({})

    //get data from backend
    const [products, setProducts] = useState([])


    // for add to cart 
    const [cartItems, setCartItems] = useState({})

    const addToCart = async (itemId, size) => {

        let CartData = structuredClone(cartItems)
        if (CartData[itemId]) {
            if (CartData[itemId][size]) {
                CartData[itemId][size] += 1
            } else {
                CartData[itemId][size] = 1
            }
        } else {
            CartData[itemId] = {}
            CartData[itemId][size] = 1
        }

        console.log(CartData)
        setCartItems(CartData)

        // if (token) {
        try {
            await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
        } catch (error) {
            console.log("Error in add to cart function", error);
            toast.error("Error in adding to cart!");
        }
        // }


    }
    const GetCartCount = () => {
        let TotalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        TotalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log("Error in total cart count function", error)
                }
            }
        }
        return TotalCount;
    }
    const UpdateQuantity = async (itemId, size, quantity) => {
        let CartData = structuredClone(cartItems)
        CartData[itemId][size] = quantity;

        setCartItems(CartData)
        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
                console.log(response)
            } catch (error) {
                console.log("error in update controller")
            }
        }
    }
    const getCartTotalAmount = () => {
        let TotalAmount = 0;
        for (let items in cartItems) {
            let productInfo = products.find((product) => product._id === items)
            for (let item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        TotalAmount += productInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log("Error in total cart Amount function", error.message)
                }
            }
        }
        return TotalAmount
    }



    const GetProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list')
            if (response.data.success) {
                setProducts(response.data.products)
                setdeliveryFee(response.data.products[0].deliveryFee)
                console.log(response.data.products)
            } else {
                toast.error("Error in fetching products !")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in fetching products !")
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('userToken')
        setToken('')
        setCartItems({})
        toast.success("Logout Successfully !")
        setTimeout(() => navigate('/login'), 0)
    }

    const getAllCartData = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log("Error in get all cart data function", error)
        }
    }

    const getAuthUserData = async () => {

        try {
            if (token) {
                const response = await axios.get(backendUrl + '/api/user/getuserdetails', { headers: { token } });
                if (response.data.success) {
                    localStorage.setItem("AuthUserData", JSON.stringify(response.data.userData))
                    if (token) {
                        setAuthUserData(JSON.parse(localStorage.getItem("AuthUserData")))
                    }else{
                        setAuthUserData(null)
                    }
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        GetProductData(0)
        getAuthUserData()
    }, [token])

    useEffect(() => {
        if (!token && localStorage.getItem('userToken')) {
            setToken(localStorage.getItem('userToken'))
            getAllCartData(localStorage.getItem('userToken'))
        }
    }, [])






    const value = {
        products,
        CurrencySymbole,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        backendUrl,
        token, setToken, handleLogout,AuthUserData,

        // add to cart 
        cartItems,
        addToCart,
        GetCartCount,
        UpdateQuantity,
        getCartTotalAmount,
        getAllCartData,
        setCartItems,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )


}

