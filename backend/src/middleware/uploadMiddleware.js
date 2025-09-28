import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

//resize file
import sharp from "sharp";
import { Readable } from "stream";

const upload = multer({ storage: multer.memoryStorage() }); //save file in ram

export const uploadFile = (fileName) => {
  return [
    upload.single(fileName), // get file
    async (req, res, next) => {
      console.log("[middlewareUpload] from multer req.file:", req.file);
      if (!req.file) return next();
      console.log("[middlewareUpload] from multer req.file:", req.file);

      try {
        // Resize + compress
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 70 })
          .toBuffer();

        // Upload to Cloudinary
        const streamUpload = () => {
          return new Promise((resolve, reject) => {
            if (req.file.fieldname === "profilePic") {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "userProfile" },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result);
                }
              );
              Readable.from(buffer).pipe(stream);
            } else {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result);
                }
              );
              Readable.from(buffer).pipe(stream);
            }
          });
        };

        const result = await streamUpload();
        req.file.path = result.secure_url; // use in controller
        next();
      } catch (err) {
        next(err);
      }
    },
  ];
};
