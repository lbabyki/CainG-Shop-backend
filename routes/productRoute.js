const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Lấy tất cả sản phẩm
router.get("/", productController.getAllProducts);

// Tạo sản phẩm mới (admin)
router.post("/", productController.createProduct);

// Lấy chi tiết sản phẩm theo ID
router.get("/:id", productController.getProductById);

// Cập nhật sản phẩm (admin)
router.put("/:id", productController.updateProduct);

// Xoá sản phẩm (admin)
router.delete("/:id", productController.deleteProduct);

module.exports = router;
