const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Cấu hình nơi lưu trữ ảnh
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route POST để upload ảnh
router.post("/", upload.single("image"), (req, res) => {
  res.json({ image: `/uploads/${req.file.filename}` });
});

module.exports = router;
