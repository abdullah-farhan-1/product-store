import Product from "../models/product.models.js";
import mongoose from "mongoose";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createAProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Field missing",
    });
  }

  if (product.price < 0) {
    return {
      success: false,
      message: "Price can not be negative",
    };
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateAProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (updateAProduct.price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price can not be negative",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteAProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product doesn't exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
      data: deletedProduct,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { getAllProducts, createAProduct, updateAProduct, deleteAProduct };
