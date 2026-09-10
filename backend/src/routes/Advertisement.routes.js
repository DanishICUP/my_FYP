import express from 'express'
import { advertisementService, getAdvertisementImages, removeAdvertisementImages, UpdateAdvertisementImages } from '../controllers/Advertisement.controller.js'
import AdminMiddleware from '../middleware/AdminMiddelware.js'
import upload from '../middleware/multer.js'


const advRoutes = express.Router()

advRoutes.post('/add', AdminMiddleware, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), advertisementService)
advRoutes.get('/get', getAdvertisementImages)
advRoutes.post('/remove', AdminMiddleware, removeAdvertisementImages)
advRoutes.post('/update', AdminMiddleware, upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'image3' },
    { name: 'image4' },
]), UpdateAdvertisementImages)


export { advRoutes }