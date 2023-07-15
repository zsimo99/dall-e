import express from "express";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

import Post from "../DB/models/postModel.js";

const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { prompt, photo, name } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);
      const newPost = await Post.create({
        prompt,
        name,
        photo: photoUrl.url,
      });
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  })
  .get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Fetching posts failed, please try again",
      });
    }
  });
export default router;
