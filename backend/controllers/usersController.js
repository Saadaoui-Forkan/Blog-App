const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')

/**-----------------------------------------------
 * @desc    Get All Users Profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
 const getUsersController = asyncHandler (async(req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "not allowed, only admin" })
    }
    const users = await User.find();
    res.status(200).json(users)
 })

 module.exports = {
    getUsersController,
 }