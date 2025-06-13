import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(process.env.CLOUDINARY_CLOUD_NAME);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
     resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx'],
    public_id: (req, file) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return file.fieldname + '-' + uniqueSuffix
    },
  },
});

const upload = multer({ storage: storage });

export default upload; 