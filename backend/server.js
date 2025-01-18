const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

app.get("/", (req, res) => res.json({ message: "Welcome to Notes API" }));

app.post(
  "/api/notes",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const { title, year, subject, course, type, folder } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder,
    });

    const note = await prisma.note.create({
      data: {
        title,
        fileUrl: result.secure_url,
        year,
        subject,
        course,
        type,
        folder,
      },
    });

    fs.unlinkSync(req.file.path);
    res.json(note);
  })
);

app.get(
  "/api/notes",
  asyncHandler(async (req, res) => {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(notes);
  })
);

app.get(
  "/api/notes/:id",
  asyncHandler(async (req, res) => {
    const note = await prisma.note.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    res.json(note);
  })
);

app.put(
  "/api/notes/:id",
  asyncHandler(async (req, res) => {
    const note = await prisma.note.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    res.json(note);
  })
);

app.delete(
  "/api/notes/:id",
  asyncHandler(async (req, res) => {
    const note = await prisma.note.delete({
      where: { id: parseInt(req.params.id) },
    });

    if (!note) {
      throw new AppError("Note not found", 404);
    }

    res.json({ message: "Note deleted successfully" });
  })
);

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
