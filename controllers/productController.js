const Product = require("../models/product");

// @desc   Tạo sản phẩm mới
// @route  POST /api/products
// @access Admin
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log("📦 Dữ liệu nhận từ client:", req.body);
    const created = await product.save();
    console.log("✅ Dữ liệu đã lưu:", created);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Lấy tất cả sản phẩm
// @route  GET /api/products
// @access Public
exports.getAllProducts = async (req, res) => {
  try {
    const {
      categories, // comma-separated category names (e.g. "Nhẫn,Dây chuyền")
      minPrice, // e.g. 80
      onSale, // "true" or "false"
      inStock, // "true" or "false"
      sortBy, // "priceAsc", "priceDesc", "newest"
    } = req.query;

    let filter = {};

    // Filter theo category (loại sản phẩm)
    if (categories) {
      const categoryList = categories.split(",");
      filter.category.name = { $in: categoryList };
    }

    // Filter theo giá
    if (minPrice) {
      filter.price = { $gte: parseFloat(minPrice) };
    }

    // Filter On Sale
    if (onSale === "true") {
      filter.sale = true;
    }

    // Filter In Stock
    if (inStock === "true") {
      filter.stock = { $gt: 0 };
    }

    let query = Product.find(filter).populate("category");

    // Sort
    if (sortBy === "priceAsc") {
      query = query.sort({ price: 1 });
    } else if (sortBy === "priceDesc") {
      query = query.sort({ price: -1 });
    } else if (sortBy === "newest") {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query.exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Lấy sản phẩm theo ID
// @route  GET /api/products/:id
// @access Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug"
    );
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    let similarProducts = await Product.find({
      category: { $in: product.category },
      _id: { $ne: product._id },
    }).limit(3);

    if (similarProducts.length < 3) {
      const exCludeIds = [product._id, ...similarProducts.map((p) => p._id)];
      const additionalProducts = await Product.find({
        _id: { $nin: exCludeIds },
      })
        .sort({ stock: -1 })
        .limit(3 - similarProducts.length);

      similarProducts = [...similarProducts, ...additionalProducts]; // nhớ spread thêm ở đây
    }

    console.log(similarProducts);
    res.json({
      product,
      similarProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Cập nhật sản phẩm
// @route  PUT /api/products/:id
// @access Admin
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Xoá sản phẩm
// @route  DELETE /api/products/:id
// @access Admin
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json({ message: "Đã xoá sản phẩm" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
