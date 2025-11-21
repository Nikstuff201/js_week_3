import sharp from 'sharp';
import multer from 'multer';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);
  const inputPath = req.file.path;
  const outputPath = `${req.file.destination}${req.file.filename}_thumb.png`;

  await sharp(inputPath)
    .resize(160, 160)
    .png()
    .toFile(outputPath);
  next();
};

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // only allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

export {createThumbnail, upload};
