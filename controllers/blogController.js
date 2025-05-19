const Blog = require("../models/blog");
const Category = require("../models/category");

// Lấy tất cả blog
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const filter = {};

    // Lọc theo category nếu có
    if (req.query.category) {
      const categoryDoc = await Category.findOne({ name: req.query.category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        return res.json({
          data: [],
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
        });
      }
    }

    // Tìm kiếm theo từ khóa nếu có
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i"); // "i" là không phân biệt hoa thường
      filter.$or = [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate("category")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter),
    ]);

    res.json({
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách blog:", err);
    res.status(500).json({ error: "Không thể lấy danh sách blog." });
  }
};

// Lấy 1 blog theo ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("category")
      .populate("author.userId", "username");
    if (!blog) return res.status(404).json({ error: "Không tìm thấy blog." });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server." });
  }
};

// Tạo blog mới
exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ error: "Dữ liệu không hợp lệ." });
  }
};

// Cập nhật blog
exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res
        .status(404)
        .json({ error: "Không tìm thấy blog để cập nhật." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Không thể cập nhật blog." });
  }
};

// Xoá blog
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Không tìm thấy blog để xoá." });
    res.json({ message: "Đã xoá blog thành công." });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi xoá blog." });
  }
};
//blog comments
// POST /api/blogs/:id/comments

exports.addCommentToBlog = async (req, res) => {
  const blogId = req.params.id;
  const { name, content } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog không tồn tại" });

    const newComment = {
      name,
      postedAt: new Date(),
      content,
      replies: [],
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json({ message: "Đã thêm bình luận", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm bình luận", error: err.message });
  }
};
// POST /api/blogs/:blogId/comments/:commentIndex/replies
exports.addReplyToComment = async (req, res) => {
  const { blogId, commentIndex } = req.params;
  const { name, content } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog không tồn tại" });

    if (!blog.comments[commentIndex])
      return res.status(404).json({ message: "Không tìm thấy bình luận" });

    const reply = {
      name,
      postedAt: new Date(),
      content,
    };

    blog.comments[commentIndex].replies.push(reply);
    await blog.save();

    res.status(201).json({ message: "Đã thêm phản hồi", blog });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi trả lời", error: err.message });
  }
};
