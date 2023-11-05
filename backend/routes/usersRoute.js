const { getUsersController, getUserProfileCtr, validateUpdateUserCtr } = require('../controllers/usersController');
const validateObjectId = require('../middlewares/validateObjectId');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require('../middlewares/verifyToken');
const router = require('express').Router()

// /api/users/profile
router.get("/profile", verifyTokenAndAdmin, getUsersController);

// /api/users/profile/:id
router.get("/profile/:id",validateObjectId ,getUserProfileCtr);

// /api/users/profile/:id
router.put("/profile/:id",validateObjectId, verifyTokenAndOnlyUser ,validateUpdateUserCtr);

module.exports = router;