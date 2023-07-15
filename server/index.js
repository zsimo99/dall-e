import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDB from "./DB/connect.js";
import postRoute from "./routes/postRoute.js";
import dalleRoute from "./routes/dalleRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoute);
app.use("/api/v1/dalle", dalleRoute);

app.get("/", (req, res) => {
  res.send("hello from DALL-E!");
});
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(8080, () =>
      console.log(`server is running in port http://localhost:8080`)
    );
  } catch (error) {}
};

startServer();
