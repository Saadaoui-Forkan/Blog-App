const {
  getUsersController,
  getUserProfileCtr,
  validateUpdateUserCtr,
  getUsersCount,
  profilePhotoUploadCtr,
} = require("../controllers/usersController");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyToken,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

// /api/users/profile
router.get("/profile", verifyTokenAndAdmin, getUsersController);

// /api/users/profile/:id
router.get("/profile/:id", validateObjectId, getUserProfileCtr);

// /api/users/profile/:id
router.put(
  "/profile/:id",
  validateObjectId,
  verifyTokenAndOnlyUser,
  validateUpdateUserCtr
);

//  /api/users/count
router.get("/count", verifyTokenAndAdmin, getUsersCount);

//  /api/users/profile/profile-photo-upload
router.post("/profile/profile-photo-upload", verifyToken, profilePhotoUploadCtr)

module.exports = router;
