const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post, validateCreatePost } = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**-----------------------------------------------
 * @desc    Create New Post
 * @route   /api/posts
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
const createPostCtr = asyncHandler(async (req, res) => {
  // Image Validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  // Data Validation
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Upload Photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Save new post in database
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // Send response to the client
  res.status(201).json(post);

  // 6. Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Get All Posts
 * @route   /api/posts
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getAllPostsCtr = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category } = req.query;
  let posts;

  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password", "-email"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password", "-email"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password", "-email"]);
  }
  res.status(200).json(posts);
});

/**-----------------------------------------------
 * @desc    Get Single Post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 const getSinglePostCtr = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", ["-password"]);
  if (!post) {
    return res.status(404).json({ msg: "Post Not Found" })
  }
  res.status(200).json(post);
});

/**-----------------------------------------------
 * @desc    Delete Post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private(only admin or owner of the post)
 ------------------------------------------------*/
const deletePostCtr = asyncHandler(async(req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    return res.status(404).json({ msg: "Post Not Found" })
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id)
    await cloudinaryRemoveImage(post.image.publicId)

    //  @TODO delete all images that belong to this post

    res.status(200).json({
      msg: "post has been deleted successfully",
      postId: post._id
    })
  } else {
    res.status(403).json({ msg: "access denied, forbidden" })
  }
})


module.exports = {
  createPostCtr,
  getAllPostsCtr,
  getSinglePostCtr,
  deletePostCtr
};
