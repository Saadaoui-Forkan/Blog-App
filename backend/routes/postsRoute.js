const router = require("express").Router();
const {
  createPostCtr,
  getAllPostsCtr,
  getSinglePostCtr,
  deletePostCtr,
  updatePostCtr,
  updatePostImageCtr,
  toggleLikeCtr,
  getPostCountCtrl,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

// /api/posts
router.post("/", verifyToken, photoUpload.single('image'), createPostCtr);

//  /api/posts
router.get("/", getAllPostsCtr);

//  /api/posts/count
router.get("/count", getPostCountCtrl)

//  /api/posts/:id
router.get('/:id', validateObjectId, getSinglePostCtr)

//  /api/posts/:id
router.delete('/:id', validateObjectId, verifyTokenAndAuthorization, deletePostCtr)

//  /api/posts/:id
router.put('/:id', validateObjectId, verifyToken, updatePostCtr)

//  /api/posts/update-image/:id
router.put('/update-image/:id', validateObjectId, verifyToken, photoUpload.single('image'), updatePostImageCtr)

//  /api/posts/like/:id
router.put('/like/:id', validateObjectId, verifyToken, toggleLikeCtr)

module.exports = router