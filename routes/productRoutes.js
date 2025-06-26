const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/rolemiddleware");
const controller = require("../controllers/productController");

router.post("/productData", verifyToken, controller.handleDetails);
router.post("/productAdd", verifyToken, controller.handleAddProduct);
router.post("/updateProduct", verifyToken, controller.handleUpdateProduct);
router.delete(
  "/deleteProduct/:id",
  verifyToken,
  controller.handleDeleteProduct
);

module.exports = router;
