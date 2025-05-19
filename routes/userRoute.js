const express = require("express");
const router = express.Router();
const userController = require("../controllers/userConstroller");
const protect = require("../middleware/authMiddleware");

// Đăng ký tài khoản
router.post("/register", userController.registerUser);

// Đăng nhập
router.post("/login", userController.loginUser);

// Lấy danh sách user
router.get("/", protect, userController.getAllUsers);

// Lấy thông tin user theo ID
router.get("/:id", protect, userController.getUserById);

// Cập nhật thông tin user
router.put("/:id", protect, userController.updateUser);

// Xoá user
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
