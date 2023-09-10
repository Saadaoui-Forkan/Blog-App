const { validateRegisterUser, User } = require('../models/User')
const bcrypt = require('bcryptjs')

/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
 const registerUserController = async(req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({message: 'User Already Exist'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    user = new User({
        username,
        email,
        password: hashedPassword
    })
    await user.save()

    res.send({msg: "success"}) 
 }

 module.exports = {
    registerUserController
 }