const router = require("express").Router();
const { createPostCtr } = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/posts
router.post("/", verifyToken, photoUpload.single('image'), createPostCtr);

module.exports = router