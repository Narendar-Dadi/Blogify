const { Router } = require("express");
const multer = require("multer");
const { put } = require("@vercel/blob"); // 1. Import Vercel Blob
const router = Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");

// 2. Use memoryStorage to hold the file as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log("Blog", blog);
  console.log("comments", comments);

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

// 3. This route is now completely changed to support Vercel Blob
router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, body } = req.body;

    // Get the file from memory
    const file = req.file;
    if (!file) {
      return res.status(400).render("addBlog", {
        user: req.user,
        error: "Please upload a cover image.",
      });
    }

    // Create a unique filename
    const filename = `${Date.now()}-${file.originalname}`;

    // Upload the file buffer to Vercel Blob
    const { url } = await put(
      filename, // The filename
      file.buffer, // The file data from memory
      {
        access: "public", // Make it publicly accessible
        token: process.env.BLOB_READ_WRITE_TOKEN, // Pass the token from env variables
      }
    );

    // Create the blog with the new Vercel Blob URL
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: url, // 4. Use the new URL from Vercel Blob
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error during blog creation:", error);
    return res.render("addBlog", {
      user: req.user,
      error: "An error occurred while creating the blog.",
    });
  }
});

module.exports = router;
