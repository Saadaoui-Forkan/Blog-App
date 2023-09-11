const { validateRegisterUser, User, validateLoginUser } = require('../models/User')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
const registerUserController = async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();

        res.send({ msg: "success" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
}; 

/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
 const loginUserController = asyncHandler(async(req,res)=> {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate Token
        const token = user.generateAuthToken()

        res.status(200).send({
            _id: user._id,
            isAdmin: user.isAdmin,
            profilePhoto: user.profilePhoto,
            username: user.username,
            token
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }

 })

 module.exports = {
    registerUserController,
    loginUserController,
 }