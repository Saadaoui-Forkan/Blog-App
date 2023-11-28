import { toast } from "react-toastify";
import request from "../../utils/request";
import { postActions } from "../slices/postSlice";

// Create Comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newComment, {
        headers: {
            Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.addCommentToPost(data));
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
}

// Update Comment
export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/comments/${commentId}`, comment, {
        headers: {
            Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.updateCommentPost(data));
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
}

// Delete Comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`, {
        headers: {
            Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.deleteCommentFromPost(commentId));
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
}
