import sharp from 'sharp';

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

export {createThumbnail};
export default createThumbnail;
