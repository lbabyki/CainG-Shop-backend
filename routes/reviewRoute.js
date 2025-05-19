const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const protect = require("../middleware/authMiddleware");
// Lấy tất cả review theo sản phẩm
router.get("/:productId", reviewController.getReviewsByProduct);

// Tạo review (yêu cầu đăng nhập)
router.post("/:productId", protect, reviewController.createReview);

// Cập nhật review
router.put("/:id", reviewController.updateReview);

// Xoá review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
