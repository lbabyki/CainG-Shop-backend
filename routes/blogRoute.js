const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Blog APIs
router.get("/", blogController.getAllBlogs); // Lấy tất cả blog
router.get("/:id", blogController.getBlogById); // Lấy chi tiết blog
router.post("/", blogController.createBlog); // Tạo blog
router.put("/:id", blogController.updateBlog); // Cập nhật blog
router.delete("/:id", blogController.deleteBlog); // Xoá blog

// Comment APIs
router.post("/:id/comments", blogController.addCommentToBlog); // Thêm bình luận
router.post(
  "/:blogId/comments/:commentIndex/replies",
  blogController.addReplyToComment
); // Thêm phản hồi

module.exports = router;
