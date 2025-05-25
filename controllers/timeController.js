exports.GetTime = async (req, res) => {
  try {
    const now = new Date();
    res.json({ time: now.toISOString() });
  } catch (err) {
    res.status(500).json({ message: "Lỗi không lấy được thời gian" });
  }
};
