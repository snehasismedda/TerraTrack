const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wanderlust_DEV",
        allowed_formats: ['png', 'jpg', 'jpeg'],
        public_id: (req, file) => {
        const username = req.body.listings.title || 'anonymous';  // safer way
        const timestamp = Date.now();
        return `${username}_${timestamp}`;
        },
    },
});


module.exports={
    cloudinary,storage
}