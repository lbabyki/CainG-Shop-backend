const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: String,
    phone: String,
    paymentMethod: String,
    orderDate: { type: Date, default: Date.now },
    deliveryOption: String,
    deliveryAddress: {
      street: String,
      city: String,
      country: String,
      postcode: String,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        imageUrl: String,
      },
    ],
    shipping: Number,
    total: Number,
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
