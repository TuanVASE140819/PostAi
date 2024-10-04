const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "published", "archived"],
  },
  image: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Post", PostSchema);
