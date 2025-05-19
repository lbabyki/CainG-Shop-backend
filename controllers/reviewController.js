const Review = require("../models/review");

// Lấy tất cả review theo productId
exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy review", error: err });
  }
};

// Tạo mới review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;
    // Kiểm tra đã review chưa
    // const existing = await Review.findOne({ productId, userId });
    // if (existing) {
    //   return res
    //     .status(400)
    //     .json({ message: "Bạn đã đánh giá sản phẩm này rồi" });
    // }

    const review = new Review({ productId, userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi tạo review", error: err.message });
  }
};

// Cập nhật review (chính chủ)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res.status(404).json({ message: "Không tìm thấy review" });

    if (!review.userId.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền chỉnh sửa review này" });
    }

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật review", error: err });
  }
};

// Xoá review (chính chủ hoặc admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res.status(404).json({ message: "Không tìm thấy review" });

    const isOwner = review.userId.equals(req.user._id);
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Không có quyền xoá review" });
    }

    await review.deleteOne();
    res.json({ message: "Xoá review thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá review", error: err });
  }
};
