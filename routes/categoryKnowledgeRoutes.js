const express = require("express");
const router = express.Router();
const CategoryKnowledge = require("../models/CategoryKnowledge");

// Route to add a new category
/**
 * @swagger
 *
 *   post:
 *     tags:
 *       - category-knowledge
 *     description: Add a new category
 *     parameters:
 *       - name: name
 *         description: Category name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Category description
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/category-knowledge", async (req, res) => {
  try {
    const category = new CategoryKnowledge({
      name: req.body.name,
      description: req.body.description,
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all categories
/**
 * @swagger
 * /category-knowledge:
 *   get:
 *     tags:
 *       - category-knowledge
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get("/category-knowledge", async (req, res) => {
  try {
    const categories = await CategoryKnowledge.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
