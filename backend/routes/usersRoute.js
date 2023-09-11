const { getUsersController } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const router = require('express').Router()

// /api/users/profile
router.get("/profile", verifyTokenAndAdmin, getUsersController);

module.exports = router;