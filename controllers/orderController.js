const Order = require("../models/order");

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo đơn hàng", error: err.message });
  }
};

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Không lấy được danh sách đơn hàng",
      error: err.message,
    });
  }
};

// Lấy đơn hàng theo userId
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Không lấy được đơn hàng của người dùng",
      error: err.message,
    });
  }
};

// Lấy chi tiết đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy đơn hàng", error: err.message });
  }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Không cập nhật được trạng thái đơn",
      error: err.message,
    });
  }
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa đơn hàng thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Không xóa được đơn hàng", error: err.message });
  }
};
