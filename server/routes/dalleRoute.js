import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENIA_API_key,
});
const openai = new OpenAIApi(configuration);

router
  .route("/")
  .get((req, res) => {
    res.send("hello from DALL-E!");
  })
  .post(async (req, res) => {
    try {
      const { prompt } = req.body;
      const aiRes = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });
      const image = aiRes.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.log(error);
      res.status(500).send(error?.response.data.error.message);
    }
  });
export default router;
