import sharp from 'sharp'
import path from 'path';

const createThumbnail = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }

    try {
        const { dir, name } = path.parse(req.file.path);
        const thumbnailPath = path.join(dir, `${name}_thumb.png`);

        await sharp(req.file.path).resize(160, 160).png().toFile(thumbnailPath);
        next();
    } catch (error) {
        next(error);
    }
};

export { createThumbnail };