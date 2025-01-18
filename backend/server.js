const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();
app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, uuidv4() + file.originalname),
});

const upload = multer({ storage });

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema and Model
const fileSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  year: { type: String, required: true },
  subject: { type: String, required: true },
  course: { type: String, required: true },
  type: { type: String, required: true },
  folder: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

// Routes

// Upload a file and store in Cloudinary
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { year, type, subject, course, folder } = req.body;

    // Validate input data
    if (!year || !type || !subject || !course || !folder) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder,
    });

    const newFile = new File({
      fileUrl: result.secure_url,
      year,
      type,
      subject,
      course,
      folder,
    });

    await newFile.save();

    // Remove local file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });

    res.json({ msg: "File uploaded", file: newFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all files from MongoDB
app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all files from Cloudinary (with pagination)
app.get("/cloudinary-files", async (req, res) => {
  try {
    let allFiles = [];
    let nextCursor = null;

    do {
      const result = await cloudinary.api.resources({
        resource_type: "raw", // Fetch non-image files
        type: "upload",
        max_results: 100, // Fetch 100 files per request
        next_cursor: nextCursor, // Continue from the last cursor
      });

      allFiles = allFiles.concat(
        result.resources.map((file) => ({
          public_id: file.public_id,
          url: file.secure_url,
          created_at: file.created_at,
          folder: file.folder, // Include folder information
        }))
      );

      nextCursor = result.next_cursor; // Update cursor for next iteration
    } while (nextCursor);

    res.json({ files: allFiles });
  } catch (error) {
    console.error("Error fetching files from Cloudinary:", error);
    res.status(500).json({ error: error.message });
  }
});

// Server Setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
