const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    subdesription: String,
    description: String,
    images: [String],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    additionalInfo: {
      weight: String,
      dimensions: String,
      colours: [String],
      material: String,
    },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
