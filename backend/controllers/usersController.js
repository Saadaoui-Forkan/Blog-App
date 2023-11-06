const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require('bcryptjs')
const path = require('path');
const fs = require('fs')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");

/**-----------------------------------------------
 * @desc    Get All Users Profile
 * @route   /api/users/profile
 * @method  GET 
 * @access  private (only admin)
 ------------------------------------------------*/
const getUsersController = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc    Get User Profile
 * @route   /api/users/profile/:id
 * @method  GET 
 * @access  public
 ------------------------------------------------*/
const getUserProfileCtr = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  // console.log(user)
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
    return res.status(400).json({ message: "No file Provided" })
  }

  // 2.Get The Path To The Image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  // 3.Upload To Cloudinary
  const result = await cloudinaryUploadImage(imagePath)

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
  res
    .status(200)
    .json({
      message: "Photo Uploaded",
      profilePhoto: { url: result.secure_url, publicId: result.public_id },
    });

  // 8.Remove Image From The Server
    fs.unlinkSync(imagePath)
 })

module.exports = {
  getUsersController,
  getUserProfileCtr,
  validateUpdateUserCtr,
  getUsersCount,
  profilePhotoUploadCtr
};
