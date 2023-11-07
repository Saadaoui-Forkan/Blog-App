const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
} = require("../models/Post");
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
const createPostCtr = asyncHandler(async(req, res)=>{
    // Image Validation
    if (!req.file) {
        return res.status(400).json({ message: "no image provided" })
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
    })

    // Send response to the client
    res.status(201).json(post);

    // 6. Remove image from the server
    fs.unlinkSync(imagePath);
})

module.exports = {
    createPostCtr,
}