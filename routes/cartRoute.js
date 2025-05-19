const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// GET - Lấy giỏ hàng theo userId
router.get("/:userId", cartController.getCartByUser);

// POST - Thêm sản phẩm vào giỏ
router.post("/add", cartController.addToCart);

// PUT - Cập nhật số lượng sản phẩm trong giỏ
router.put("/update", cartController.updateItemQuantity);

// DELETE - Xóa một sản phẩm khỏi giỏ
router.delete("/remove", cartController.removeItemFromCart);

// DELETE - Xóa toàn bộ giỏ hàng
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
