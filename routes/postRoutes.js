const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET all posts or search posts by title and tags
/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - quanlybaiviet
 *     description: Get all posts or search posts by title and tags
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Title of the post
 *         required: false
 *         type: string
 *       - name: tags
 *         in: query
 *         description: Tags of the post
 *         required: false
 *         type: array
 *         items:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/posts", async (req, res) => {
  try {
    const { title, tags } = req.query;
    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    if (tags) {
      query.tags = { $in: tags.split(",") }; // Split tags by comma and search
    }

    const posts = await Post.find(query);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET posts by status
/**
 * @swagger
 * /posts/status/{status}:
 *   get:
 *     tags:
 *       - quanlybaiviet
 *     description: Get posts by status
 *     parameters:
 *       - name: status
 *         description: Post status
 *         in: path
 *         required: true
 *         type: string
 *         enum: [draft, published, archived]
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Posts not found
 */
router.get("/posts/status/:status", async (req, res) => {
  try {
    const posts = await Post.find({ status: req.params.status });
    if (posts.length === 0)
      return res
        .status(404)
        .json({ message: "No posts found with the given status" });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single post
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags:
 *       - quanlybaiviet
 *     description: Get a single post
 *     parameters:
 *       - name: id
 *         description: Post ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Post not found
 */
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new post
/**
 * @swagger
 * /posts:
 *   post:
 *     tags:
 *       - quanlybaiviet
 *     description: Create a new post
 *     parameters:
 *       - name: title
 *         description: Post title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: content
 *         description: Post content
 *         in: formData
 *         required: true
 *         type: string
 *       - name: author
 *         description: Post author
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: Post category
 *         in: formData
 *         required: true
 *         type: string
 *       - name: tags
 *         description: Post tags
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *       - name: status
 *         description: Post status
 *         in: formData
 *         required: true
 *         type: string
 *         enum: [draft, published, archived]
 *       - name: image
 *         description: Post image URL
 *         in: formData
 *         required: true
 *         type: string
 *       - name: scheduledDate
 *         description: Scheduled date for the post
 *         in: formData
 *         required: false
 *         type: string
 *         format: date-time
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/posts", async (req, res) => {
  const scheduledDate = new Date();
  scheduledDate.setMinutes(scheduledDate.getMinutes() + 10); // Set scheduled date to 10 minutes from now

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    tags: req.body.tags,
    status: req.body.status,
    image: req.body.image,
    scheduledDate: req.body.scheduledDate || scheduledDate,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a post
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags:
 *       - quanlybaiviet
 *     description: Update a post
 *     parameters:
 *       - name: id
 *         description: Post ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: Post title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: content
 *         description: Post content
 *         in: formData
 *         required: true
 *         type: string
 *       - name: author
 *         description: Post author
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: Post category
 *         in: formData
 *         required: true
 *         type: string
 *       - name: tags
 *         description: Post tags
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *       - name: status
 *         description: Post status
 *         in: formData
 *         required: true
 *         type: string
 *         enum: [draft, published, archived]
 *       - name: image
 *         description: Post image URL
 *         in: formData
 *         required: true
 *         type: string
 *       - name: scheduledDate
 *         description: Scheduled date for the post
 *         in: formData
 *         required: false
 *         type: string
 *         format: date-time
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Post not found
 */
router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
    post.category = req.body.category;
    post.tags = req.body.tags;
    post.status = req.body.status;
    post.image = req.body.image;
    post.scheduledDate = req.body.scheduledDate;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags:
 *       - quanlybaiviet
 *     description: Delete a post
 *     parameters:
 *       - name: id
 *         description: Post ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Post not found
 */
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
