const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Đường dẫn đến model user

const protect = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ message: "Không có quyền truy cập" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    console.log(decoded);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Bạn chưa đăng nhập" });
  }
};

module.exports = protect;
