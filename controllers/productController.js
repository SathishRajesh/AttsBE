const Product = require("../models/product");
const mongoose = require("mongoose");

const handleAddProduct = async (req, res) => {
  try {
    const { metal, purity, amount, status ,date} = req?.body;
    if (!metal || !purity || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product?.create({ metal, purity, amount, status,date });

    res.status(201).json({ data: product });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const handleDetails = async (req, res) => {
  try {
    let { page, limit } = req.body;
    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));

    const skip = (page - 1) * limit;
    const [productDetails, totalCount] = await Promise.all([
      Product.aggregate([
        { $match: { status: "Active" } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      Product.countDocuments({ status: "Active" }),
    ]);

    res.status(200).json({
      data: productDetails,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / parseInt(limit)),
    });
  } catch (error) {
    console.error("Error fetching Product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const handleUpdateProduct = async (req, res) => {
  try {
    const { _id, metal, purity, amount ,parentId,status,date} = req.body;
    const parentIdValue=parentId?parentId:_id
  const existingProduct = await Product.findOne({
      metal,
      purity,
      amount,
      date: new Date(date),
      status: "Active", 
    });
    if (existingProduct) {
      return res.status(200).json({ data: existingProduct});
    }

    const updatedProduct = await Product?.create(
      { metal, purity, amount,parentIdValue,status,date},
    );
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const { id } = req?.params;
    const deletedProduct = await Product.updateOne(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      {
        $set: { status: "Inactive" },
      }
    );
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting Product:", error);
  }
};

module.exports = {
  handleAddProduct,
  handleDetails,
  handleDeleteProduct,
  handleUpdateProduct,
};
