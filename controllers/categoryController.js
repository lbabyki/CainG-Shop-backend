const Category = require("../models/category");

// @desc    Lấy tất cả categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách category", error });
  }
};

// @desc    Tạo mới category
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "slug đã tồn tại" });
    }

    const category = new Category({ name, slug, description });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo category", error });
  }
};

// @desc    Lấy chi tiết category theo ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy category" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết category", error });
  }
};

// @desc    Cập nhật category
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!category)
      return res
        .status(404)
        .json({ message: "Không tìm thấy category để cập nhật" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật category", error });
  }
};

// @desc    Xóa category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Không tìm thấy category để xóa" });

    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa category", error });
  }
};
