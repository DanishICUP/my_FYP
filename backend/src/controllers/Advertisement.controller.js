import { v2 as cloudinary } from 'cloudinary'
import advertisementImagesModel from '../models/AdvertisementImages.model.js'

const advertisementService = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const imagesArray = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // const imagesArray = Object.values(req.files).flat();

        let imageUrls = await Promise.all(
            imagesArray.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image"
                });
                return result.secure_url;
            })
        );

        const advImages = {
            images: imageUrls,
        }
        console.log(advImages)

        const newAdvImages = new advertisementImagesModel(advImages)
        await newAdvImages.save()

        return res.status(201).json({ success: true, message: "Advertisement image saved", data: newAdvImages })
    } catch (error) {
        console.log("error in add advertisement images", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const getAdvertisementImages = async (_, res) => {
    try {
        const advertisementImages = await advertisementImagesModel.find({}).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, data: advertisementImages })
    } catch (error) {
        console.log("error in get advertisement images", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}


// before 

// const removeAdvertisementImages = async (req, res) => {
//     try {
//         const imagesId = req.body.id
//         const advertisementImages = await advertisementImagesModel.findByIdAndDelete(imagesId)
//         return res.status(200).json({ success: true, message: "Advertisement Images deleted successfully", data: advertisementImages })
//     } catch (error) {
//         console.log("error in remove advertisement images", error.message)
//         return res.status(500).json({ success: false, message: "internal server error" })
//     }
// }


// after 

const removeAdvertisementImages = async (req, res) => {
    try {
        const { id, imageurl } = req.body;
        const advertisementImages = await advertisementImagesModel.findById(id)

        if (!advertisementImages) {
            return res.status(404).json({ success: false, message: "Advertisement not found" })
        }

        if (advertisementImages.images.length === 0) {
            return res.status(404).json({ success: false, message: "No images found" })
        }

        advertisementImages.images = advertisementImages.images.filter(img => img !== imageurl)

        await advertisementImages.save()

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully",
            data: advertisementImages
        })

    } catch (error) {
        console.log("error in remove advertisement images", error.message)
        return res.status(500).json({ success: false, message: "internal server error" })
    }
}

const UpdateAdvertisementImages = async (req, res) => {
    try {
        const { id } = req.body
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const advertisement = await advertisementImagesModel.findById(id)
        if (!advertisement) {
            return res.status(404).json({ success: false, message: "Advertisement not found" })
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let oldImages = Array.isArray(advertisement.images) ? advertisement.images : [];

        const newImages = [...oldImages]//start with currect image
        const imagesKeys = ["image1", "image2", "image3", "image4"]

        for (let i = 0; i < imagesKeys.length; i++) {
            const key = imagesKeys[i]
            const file = req.files[key] && req.files[key][0]

            if (file) {
                // Delete old image from Cloudinary if it exists
                if (oldImages[i]) {
                    const publicId = oldImages[i].split('/').pop().split('.')[0]
                    await cloudinary.uploader.destroy(publicId)
                    console.log("Image removed", publicId)
                }
                //upload new imge to cloudinary
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "image"
                })
                newImages[i] = result.secure_url //update the image url in the array
                console.log("Image added", result)
            }
        }

        // if (images.length > 0) {
        //     // Remove old images from Cloudinary
        //     if (updateImageUrl.length > 0) {
        //         await Promise.all(
        //             updateImageUrl.map(async (item) => {
        //                 const publicId = item.split('/').pop().split('.')[0];
        //                 let result = await cloudinary.uploader.destroy(publicId);
        //                 console.log("Image removed", result);
        //                 return result;
        //             })
        //         );
        //     }

        //     // Add new images to Cloudinary
        //     updateImageUrl = await Promise.all(
        //         images.map(async (item) => {
        //             const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        //             console.log("Image added", result);
        //             return result.secure_url;
        //         })
        //     );
        // }

        advertisement.images = newImages;
        await advertisement.save();

        return res.status(200).json({ success: true, message: "Advertisement images updated successfully", data: advertisement });

    } catch (error) {
        console.log("Error in updating advertisement images", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export { advertisementService, getAdvertisementImages, removeAdvertisementImages, UpdateAdvertisementImages }