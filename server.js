require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const cartRoutes = require("./routes/cartRoute");
const blogRoutes = require("./routes/blogRoute");
const categoryRoutes = require("./routes/categoryRoute");
const reviewRoutes = require("./routes/reviewRoute");
//upload ảnh.
const uploadRoutes = require("./routes/uploadImgRoute");
const PORT = process.env.PORT;
const cors = require("cors");
const morgan = require("morgan");
//connect to DB
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

//Route
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
