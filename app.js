const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cron = require("node-cron");
const Post = require("./models/Post");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes"); // Add this line

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "My API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // Ensure this includes all route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse application/x-www-form-urlencoded

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", postRoutes);
app.use("/auth", authRoutes); // Add this line

// Schedule task to update post status
cron.schedule("0 * * * *", async () => {
  try {
    const posts = await Post.updateMany(
      { status: "draft", scheduledDate: { $lte: new Date() } },
      { $set: { status: "published" } }
    );
    console.log(`Updated ${posts.nModified} posts to published status`);
  } catch (err) {
    console.error("Error updating post status:", err);
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
