const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Lấy tất cả
router.get("/", categoryController.getAllCategories);

// Lấy theo ID
router.get("/:id", categoryController.getCategoryById);

// Tạo mới (chỉ admin)
router.post("/", categoryController.createCategory);

// Cập nhật (chỉ admin)
router.put("/:id", categoryController.updateCategory);

// Xóa (chỉ admin)
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
