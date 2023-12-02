const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const bcrypt = require('bcryptjs')
const path = require('path');
const fs = require('fs')
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImages,
} = require("../utils/cloudinary");

/**-----------------------------------------------
 * @desc    Get All Users Profile
 * @route   /api/users/profile
 * @method  GET 
 * @access  private (only admin)
 ------------------------------------------------*/
const getUsersController = asyncHandler(async (req, res) => {
  
  const users = await User.find()
    .select("-password")
    // Populate Posts That Belong To This UserWhen Getting Profile
    .populate("posts");
  res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc    Get User Profile
 * @route   /api/users/profile/:id
 * @method  GET 
 * @access  public
 ------------------------------------------------*/
const getUserProfileCtr = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    // Populate Posts That Belong To This UserWhen Getting Profile
    .populate("posts")
  
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc    Update User Profile
 * @route   /api/users/profile/:id
 * @method  PUT 
 * @access  private (only user)
 ------------------------------------------------*/
const validateUpdateUserCtr = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updated = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updated);
});

/**-----------------------------------------------
 * @desc    Get The Number of All Users
 * @route   /api/users/count
 * @method  GET 
 * @access  private (only admin)
 ------------------------------------------------*/
 const getUsersCount = asyncHandler(async (req, res) => {
   // console.log(req.user)
   const usersCount = await User.count()
   res.status(200).json(usersCount);
 });

 /**-----------------------------------------------
 * @desc    Post Upload Profile Photo
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST 
 * @access  private (only logged user)
 ------------------------------------------------*/
 const profilePhotoUploadCtr = asyncHandler(async(req, res) => {
  // 1.Validation
  if (!req.file) {
    return res.status(400).json({ message: "No Photo Provided" })
  }

  // 2.Get The Path To The Image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  // 3.Upload To Cloudinary
  const result = await cloudinaryUploadImage(imagePath)
  // console.log(result)

  // 4.Get The User From DB
  const user = await User.findById(req.user.id)

  // 5. Delete The Old Profile Photo If Exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
  }

  // 6.Change profilePhoto field in db
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id
  }
  await user.save()

  // 7.Send Response To Client
  res.status(200).json({
    message: "Photo Uploaded",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });

  // 8.Remove Image From The Server
    fs.unlinkSync(imagePath)
 })

  /**-----------------------------------------------
 * @desc    Delete User Profile
 * @route   /api/users/profile/:id
 * @method  DELETE 
 * @access  private (only admin or user himself)
 ------------------------------------------------*/
 const deleteUserProfileCtr = asyncHandler(async(req, res) => {
  // 1.Get User From DB
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.status(404).json({ message: "user not founded" })
  }

  // 2.Get All Posts From Db
  const posts = await Post.find({ user: user._id })

  // 3.Get Public ids from posts
  const publicIds = posts?.map((post) => post.image.publicId)

  // 4.delete all posts image from cloudinary that belong to this user
  if (publicIds?.length > 0) {
    await cloudinaryRemoveMultipleImages(publicIds)
  }

  // 5.delete the profile picture from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
  }

  // 6.delete user posts & comments
  await Post.deleteMany({ user: user._id })
  await Comment.deleteMany({ user: user._id })

  // 7.delete the user himself
  await User.findByIdAndDelete(req.params.id)

  // 8.send response to the client
  res.status(200).json({ message: "your profile has been deleted" })
 })

module.exports = {
  getUsersController,
  getUserProfileCtr,
  validateUpdateUserCtr,
  getUsersCount,
  profilePhotoUploadCtr,
  deleteUserProfileCtr
};
