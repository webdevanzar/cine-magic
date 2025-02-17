require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handleUpload = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary upload failed."); 
  }
};

module.exports = handleUpload ;
