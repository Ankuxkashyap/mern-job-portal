import multer from 'multer';

const upload = multer({
  dest: 'uploads/resumes/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;