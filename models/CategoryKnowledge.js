const mongoose = require("mongoose");

const CategoryKnowledgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryKnowledge", CategoryKnowledgeSchema);
