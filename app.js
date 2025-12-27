require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middleware/authentication");
const PORT = process.env.PORT || 8000;

const Blog = require("./models/blog");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication("token"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`MongoDB Connected`)) // Changed log message for clarity
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRoute);

// !! REMOVED app.listen() FOR VERCEL !!
app.listen(PORT, () => console.log(`PORT Started at ${PORT}`));

// !! ADDED module.exports FOR VERCEL !!
module.exports = app;
