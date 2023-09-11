const router = require('express').Router()
const {registerUserController, loginUserController} = require('../controllers/authController')

// /api/auth/register
router.post("/register", registerUserController);

// /api/auth/login
router.post("/login", loginUserController);

module.exports = router;