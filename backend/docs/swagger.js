const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API Documentation",
      version: "1.0.0",
      description: "API documentation for Notes Upload System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./docs/*.yml"],
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - year
 *         - subject
 *         - course
 *         - type
 *         - folder
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the note
 *         title:
 *           type: string
 *           description: Title of the note
 *         fileUrl:
 *           type: string
 *           description: URL of the uploaded file
 *         year:
 *           type: string
 *           description: Academic year
 *         subject:
 *           type: string
 *           description: Subject name
 *         course:
 *           type: string
 *           description: Course name
 *         type:
 *           type: string
 *           description: Type of note
 *         folder:
 *           type: string
 *           description: Folder path in Cloudinary
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
