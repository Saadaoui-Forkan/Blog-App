const {
  getUsersController,
  getUserProfileCtr,
  validateUpdateUserCtr,
  getUsersCount,
  profilePhotoUploadCtr,
  deleteUserProfileCtr,
} = require("../controllers/usersController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

// /api/users/profile
router.get("/profile", verifyTokenAndAdmin, getUsersController);

// /api/users/profile/:id
router.get("/profile/:id", validateObjectId, photoUpload.single("image"), getUserProfileCtr);

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
router.post("/profile/profile-photo-upload", verifyToken, photoUpload.single("image"), profilePhotoUploadCtr)

//  /api/users/profile/:id
router.delete("/profile/:id", validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtr)

module.exports = router;
