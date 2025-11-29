import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { createItem, getItems, deleteItem } from "../controllers/itemController.js";

const router = express.Router();

// 🔥 Use ONLY memory storage (Render safe)
const upload = multer({ storage: multer.memoryStorage() });
const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// ⭐ Upload Image Route
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const buffer = req.file.buffer;

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "foodAppImages" },
      (err, result) => {
        if (err)
          return res.status(500).json({ error: err.message });

        res.json({ imageUrl: result.secure_url });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ⭐ Create Item (stores imageUrl from frontend)
router.post("/", upload.none(), createItem);

// ⭐ Get All Items
router.get("/", getItems);

// ⭐ Delete Item
router.delete("/:id", deleteItem);

export default router;
