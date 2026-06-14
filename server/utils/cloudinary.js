import { v2 as cloudinary } from 'cloudinary';

// Uploads a base64 data-URI or remote URL. Returns secure_url or '' on failure.
export const uploadImage = async (file, folder = 'anjali-pg') => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary not configured — skipping upload.');
    return '';
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const res = await cloudinary.uploader.upload(file, { folder });
    return res.secure_url;
  } catch (err) {
    console.error('Cloudinary upload failed:', err.message);
    return '';
  }
};

export default cloudinary;
