const router = require("express").Router();
const { createPostCtr, getAllPostsCtr, getSinglePostCtr } = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/posts
router.post("/", verifyToken, photoUpload.single('image'), createPostCtr);

//  /api/posts
router.get("/", validateObjectId, getAllPostsCtr);

//  /api/posts/:id
router.get('/:id', validateObjectId, getSinglePostCtr)

module.exports = router