import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/Products.models.js';



const addProducts = async (req, res) => {
    try {
        const { name, description, price, category, sizes, bestseller, deliveryFee } = req.body;


        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        let ImageUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                    console.log("clodinary uploaded image url: ", result.secure_url)
                    return result.secure_url
                } catch (err) {
                    console.error("Cloudinary upload error:", err)
                    return null
                }
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            bestseller: bestseller === 'true' ? true : false,
            deliveryFee: Number(deliveryFee),
            sizes: JSON.parse(sizes),
            image: ImageUrl,
            date: Date.now()
        }

        console.log(productData)

        const products = new productModel(productData)
        await products.save()

        // console.log(name, description, price, category, subcategory, sizes, bestSeller)
        // console.log(image1, image2, image3, image4)
        // console.log(images)
        // console.log(ImageUrl)

        return res.json({ success: true, message: "prodcuts added" })

    } catch (error) {
        console.log("error in add products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const ListProducts = async (_, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 }).populate({
            path: 'comments.user',
            select: '-password -cartData'
        })
        if (products.length === 0) {
            return res.status(200).json([])
        }
        return res.json({ success: true, products })
    } catch (error) {
        console.log("error in list products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const RemoveProducts = async (req, res) => {
    try {
        const productId = req.body.id
        await productModel.findByIdAndDelete(productId)

        return res.json({ success: true, message: "product removed" })
    } catch (error) {
        console.log("error in remove products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const singleProducts = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        if (!product) {
            return res.json({ success: false, message: "product not found" })
        }
        return res.json({ success: true, product })
    } catch (error) {
        console.log("error in remove products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}

const updateProducts = async (req, res) => {
    try {
        const { id, name, description, price, category, sizes, bestSeller, deliveryFee } = req.body

        const product = await productModel.findById(id)
        if (!product) {
            return res.json({ success: false, message: "product not found" })
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let updatedImageUrl = product.image

        if (images.length > 0) {
            // remove old images from cloudinary
            await Promise.all(
                updatedImageUrl.map(async (item) => {
                    let result = await cloudinary.uploader.destroy(item.split('/').pop().split('.')[0])
                    console.log("product remove", result)
                    return result
                })
            )

            // add new images to cloudinary
            updatedImageUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                    console.log("product add", result)
                    return result.secure_url
                })
            )
        }

        // 3. Update product
        product.name = name;
        product.description = description;
        product.price = Number(price);
        product.category = category;
        // product.subcategory = subcategory;
        product.sizes = JSON.parse(sizes);
        product.bestSeller = bestSeller === 'true';
        product.deliveryFee = Number(deliveryFee);
        product.image = updatedImageUrl;
        product.date = Date.now();


        await product.save()
        return res.json({ success: true, message: "product updated successfully", product })


    } catch (error) {
        console.log("error in update products", error.message)
        return res.json({ success: false, message: "internal server error" })
    }
}


const CommentOnProduct = async (req, res) => {
    try {
        const { text, rating } = req.body
        const  postId  = req.params.id
        const userId = req.user._id

        console.log("User ID: ", userId)
        console.log("Post ID: ", postId)

        if (!text || !rating) {
            return res.status(400).json({ success: false, message: "Both text and rating are required" })
        }

        const product = await productModel.findById(postId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }


        const AlreadyReviewd = product.comments.find(comment => comment.user.toString() === userId.toString())
        if (AlreadyReviewd) {
            return res.status(400).json({ success: false, message: "Thank You for support . dear user You have already reviewed this product" })
        }

        const newComments = {
            user: userId,
            text,
            rating: Number(rating)
        }

        product.comments.push(newComments)

        // calculate the average rating
        const ratings = product.comments.map(c => c.rating);
        const avgRating = ratings.reduce((acc, val) => acc + val, 0) / ratings.length;
        product.rating = parseFloat(avgRating.toFixed(1));

        await product.save()
        return res.status(200).json({ success: true, message: "Review added successfully", product });
    } catch (error) {
        console.log('Error in comment controller: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { productId, commentId } = req.params

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" })
        }

        const commentIndex = product.comments.findIndex(comment => comment._id.toString() === commentId)

        if (commentIndex === -1) {
            return res.status(404).json({ success: false, message: "comment not found" })
        }

        //delete comment from thr products
        product.comments.splice(commentIndex, 1)
        await product.save()

        return res.status(200).json({ success: true, message: "comment deleted successfully" })

    } catch (error) {
        console.log("error in delete comments", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


const getComments = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId).populate('comments.user', 'name');


        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const sortedComments = product.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).json({ success: true, comments: sortedComments });
    } catch (error) {
        console.log("Error in get comments:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export { addProducts, ListProducts, RemoveProducts, singleProducts, updateProducts, CommentOnProduct, getComments, deleteComment }