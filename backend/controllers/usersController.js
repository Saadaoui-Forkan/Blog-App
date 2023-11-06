const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require('bcryptjs')

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
  res.status(200).json({ message: "Photo Uploaded" })
 })

module.exports = {
  getUsersController,
  getUserProfileCtr,
  validateUpdateUserCtr,
  getUsersCount,
  profilePhotoUploadCtr
};
