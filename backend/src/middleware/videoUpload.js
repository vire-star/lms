import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../helpers/cloudinary.js'; // Make sure path is correct

// Cloudinary storage engine setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'courseModule',
    resource_type: 'video', // Bahut Important! Cloudinary ko batata hai ki yeh video hai
    allowed_formats: ['mp4', 'mov', 'avi'], // Optional: allowed formats
  },
});

// Multer upload instance
export const videoUplaod = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 500 // Optional: 500MB limit
  }
});
