const router = require("express").Router();
const { createPostCtr, getAllPostsCtr, getSinglePostCtr, deletePostCtr } = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

// /api/posts
router.post("/", verifyToken, photoUpload.single('image'), createPostCtr);

//  /api/posts
router.get("/", validateObjectId, getAllPostsCtr);

//  /api/posts/:id
router.get('/:id', validateObjectId, getSinglePostCtr)

//  /api/posts/:id
router.delete('/:id', validateObjectId, verifyTokenAndAuthorization, deletePostCtr)

module.exports = router