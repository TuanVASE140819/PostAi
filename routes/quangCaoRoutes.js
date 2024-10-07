const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");

// Route to add a new ad
/**
 * @swagger
 * /ads:
 *   post:
 *     tags:
 *       - ads
 *     description: Add a new ad
 *     parameters:
 *       - name: title
 *         description: Ad title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Ad description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: imageUrl
 *         description: Ad image URL
 *         in: formData
 *         required: true
 *         type: string
 *       - name: link
 *         description: Ad link
 *         in: formData
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Ad start date
 *         in: formData
 *         required: true
 *         type: string
 *         format: date
 *       - name: endDate
 *         description: Ad end date
 *         in: formData
 *         required: true
 *         type: string
 *         format: date
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/ads", async (req, res) => {
  try {
    const ad = new Ad({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      link: req.body.link,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    const newAd = await ad.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all ads
/**
 * @swagger
 * /ads:
 *   get:
 *     tags:
 *       - ads
 *     description: Get all ads
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
