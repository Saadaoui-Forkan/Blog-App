const {
  createCommentCtr,
  getAllCommentsCtr,
  deleteCommentCtr,
  updateCommentCtr,
} = require("../controllers/commentsController");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

// /api/comments
router.post("/", verifyToken, createCommentCtr);

// /api/comments
router.get("/", verifyTokenAndAdmin, getAllCommentsCtr);

// /api/comments/:id
router.delete("/:id", validateObjectId, verifyToken, deleteCommentCtr);

// /api/comments/:id
router.put("/:id", validateObjectId, verifyToken, updateCommentCtr);

module.exports = router;
