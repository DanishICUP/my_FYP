import express from 'express'
import { addProducts, CommentOnProduct, deleteComment, getComments, ListProducts, RemoveProducts, singleProducts, updateProducts } from '../controllers/Product.Controllers.js'
import upload from '../middleware/multer.js'
import AdminMiddleware from '../middleware/AdminMiddelware.js'
import UserMiddleware from '../middleware/User.Auth.Middleware.js'

const ProductsRoutes = express.Router()

ProductsRoutes.post('/add', AdminMiddleware, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), addProducts)
ProductsRoutes.get('/list', ListProducts)
ProductsRoutes.post('/remove', AdminMiddleware, RemoveProducts)
ProductsRoutes.post('/single', singleProducts)
ProductsRoutes.post('/update', AdminMiddleware, upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'image3' },
    { name: 'image4' },
]), updateProducts)
ProductsRoutes.post('/comment/:id', UserMiddleware, CommentOnProduct)
ProductsRoutes.get('/getcomment/:id', getComments)
ProductsRoutes.delete('/deletecomment/:productId/:commentId', deleteComment)






export { ProductsRoutes }