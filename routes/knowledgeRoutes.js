const express = require("express");
const router = express.Router();
const Knowledge = require("../models/Knowledge");

// Route to add a new knowledge
/**
 * @swagger
 * /knowledge:
 *   post:
 *     tags:
 *       - knowledge
 *     description: Add a new knowledge
 *     parameters:
 *       - name: title
 *         description: Knowledge title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: content
 *         description: Knowledge content
 *         in: formData
 *         required: true
 *         type: string
 *       - name: author
 *         description: Knowledge author
 *         in: formData
 *         required: true
 *         type: string
 *       - name: tags
 *         description: Knowledge tags
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *       - name: category
 *         description: Knowledge category
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/knowledge", async (req, res) => {
  try {
    const knowledge = new Knowledge({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      tags: req.body.tags,
      category: req.body.category,
    });

    const newKnowledge = await knowledge.save();
    res.status(201).json(newKnowledge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all knowledge
/**
 * @swagger
 * /knowledge:
 *   get:
 *     tags:
 *       - knowledge
 *     description: Get all knowledge
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get("/knowledge", async (req, res) => {
  try {
    const knowledge = await Knowledge.find();
    res.json(knowledge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
