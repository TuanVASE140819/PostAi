const mongoose = require("mongoose");

const KnowledgeSchema = new mongoose.Schema(
  {
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
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryKnowledge",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published", "archived"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Knowledge", KnowledgeSchema);
