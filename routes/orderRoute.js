const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Tạo đơn hàng mới
router.post("/", orderController.createOrder);

// Lấy tất cả đơn hàng (cho admin)
router.get("/", orderController.getAllOrders);

// Lấy đơn hàng theo userId
router.get("/user/:userId", orderController.getOrdersByUser);

// Lấy chi tiết đơn hàng theo ID
router.get("/:id", orderController.getOrderById);

// Cập nhật trạng thái đơn hàng
router.put("/:id/status", orderController.updateOrderStatus);

// Xóa đơn hàng
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
