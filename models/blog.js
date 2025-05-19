const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  postedAt: Date,
  content: String,
  replies: [
    {
      name: String,
      postedAt: Date,
      content: String,
    },
  ],
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
  },
  image: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  publishedAt: { type: Date },
  contentBlocks: [String],
  sumary: String,
  shareLinks: {
    facebook: String,
    twitter: String,
    pinterest: String,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Blog", blogSchema);
