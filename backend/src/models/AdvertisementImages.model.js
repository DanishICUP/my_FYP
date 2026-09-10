import mongoose from 'mongoose';

const advertisementImagesSchema = new mongoose.Schema(
    {
        images: {
            type: [String],
            default: [],
            required: true
        },
        text:{
            type: String
        }
    },
    { timestamps: true }
);

const advertisementImagesModel =
  mongoose.models.AdvertisementImage || mongoose.model("AdvertisementImage", advertisementImagesSchema);

export default advertisementImagesModel;
