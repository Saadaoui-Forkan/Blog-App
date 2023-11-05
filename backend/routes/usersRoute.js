const { getUsersController, getUserProfileCtr } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const router = require('express').Router()

// /api/users/profile
router.get("/profile", verifyTokenAndAdmin, getUsersController);

// /api/users/profile/:id
router.get("/profile/:id", getUserProfileCtr);

module.exports = router;