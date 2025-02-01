import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
const app = express();

app.use(express.json()); // Handles JSON payloads
app.use(express.urlencoded({ extended: true })); // Handles x-www-form-urlencoded payloads
app.use(cors());

const __dirname = path.resolve();

//Product routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log(`Server started at PORT: ${process.env.PORT}`);
});
