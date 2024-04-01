import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

//api/my-hotels
router.post(
  "/",
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel = req.body;

      //*upload the images to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64"); //convert image to base64 string
        let dataURI = "data:" + image.mimetype + ";base64," + b64; //kind of image to be uploaded like png, jpeg, etc
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url; // returning the URL of the image uploaded to cloudinary
      });

      const imageUrls = await Promise.all(uploadPromises);

      //* if the upload is successful then add the URLs to the new hotel
      

      //*save the new hotel in our database
      //* return a 201 status
    } catch (error) {
      console.log("Error creating hotel", error);
      res.status(500).json({message: "Something went wrong"})
    }
  }
);
