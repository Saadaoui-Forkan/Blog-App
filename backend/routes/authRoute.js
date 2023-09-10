const router = require('express').Router()
const {registerUserController} = require('../controllers/authController')

// /api/auth/register
router.post("/register", registerUserController);

module.exports = router;