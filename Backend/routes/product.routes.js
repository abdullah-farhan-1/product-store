import express from "express";
import {
  getAllProducts,
  createAProduct,
  updateAProduct,
  deleteAProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createAProduct);

router.put("/:id", updateAProduct);

router.delete("/:id", deleteAProduct);

export default router;
