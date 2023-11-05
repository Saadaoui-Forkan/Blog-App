const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')

/**-----------------------------------------------
 * @desc    Get All Users Profile
 * @route   /api/users/profile
 * @method  GET 
 * @access  private (only admin)
 ------------------------------------------------*/
 const getUsersController = asyncHandler (async(req, res) => {
   // console.log(req.user)
   const users = await User.find().select('-password');
   res.status(200).json(users)
 })

 /**-----------------------------------------------
 * @desc    Get User Profile
 * @route   /api/users/profile/:id
 * @method  GET 
 * @access  public
 ------------------------------------------------*/
 const getUserProfileCtr = asyncHandler(async(req, res) => {
   const user = await User.findById(req.params.id).select('-password')
   // console.log(user)
   if (!user) {
      return res.status(404).json({ message: "User Not Found" })
   }
   res.status(200).json(user)
 })

 module.exports = {
    getUsersController,
    getUserProfileCtr,
 }