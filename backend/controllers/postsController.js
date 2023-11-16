const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post, validateCreatePost, validateUpdatePost } = require("../models/Post");
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

/**-----------------------------------------------
 * @desc    Update Post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private(only the owner of the post)
 ------------------------------------------------*/
 const updatePostCtr = asyncHandler(async(req,res) => {
  // 1.validation
  const { error } = validateUpdatePost(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  // 2.Get the post from DB
  const post = await Post.findById(req.params.id)
  if (!post) {
    return res.status(404).json({ message: "post not found" })
  }

  // 3.Check if post belong to logged user
  if (req.user.id != post.user.toString()) {
    return res.status(403).json({ message: 'access denied' })
  }

  // 4. Update Post
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    }
  }, { new: true }).populate("user", ["-password"])

  // 5. Send Response To The Client
  res.status(200).json(updatedPost)
 })

/**-----------------------------------------------
 * @desc    Update Post Imge
 * @route   /api/posts/update-image/:id
 * @method  PUT
 * @access  private(only the owner of the post)
 ------------------------------------------------*/
 const updatePostImageCtr = asyncHandler(async(req,res) => {
  // 1.validation
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" })
  }

  // 2.Get the post from DB
  const post = await Post.findById(req.params.id)
  if (!post) {
    return res.status(404).json({ message: "post not found" })
  }

  // 3.Check if post belong to logged user
  if (req.user.id != post.user.toString()) {
    return res.status(403).json({ message: 'access denied' })
  }

  // 4. Delete The Old Image
  await cloudinaryRemoveImage(post.image.publicId)

  // 5.upload nw photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
  const result = await cloudinaryUploadImage(imagePath)

  // 6. update the image field in the db
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      image: {
        url: result.secure_url,
        publicId: result.public_id
      }
    }
  }, { new: true }).populate("user", ["-password"])

  // 7. Send Response To The Client
  res.status(200).json(updatedPost)

  // 8. Remove Image From Server
  fs.unlinkSync(imagePath)
 })


module.exports = {
  createPostCtr,
  getAllPostsCtr,
  getSinglePostCtr,
  deletePostCtr,
  updatePostCtr,
  updatePostImageCtr
};
