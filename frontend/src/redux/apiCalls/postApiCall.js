import request from '../../utils/request'
import { toast } from 'react-toastify'
import { postActions } from '../slices/postSlice'

// Fetch Posts Based On Page Number
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`)
            dispatch(postActions.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Get Posts Count
export function getPostsCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`)
            dispatch(postActions.setPostsCount(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// Fetch Posts Based On Category
export function fetchPostsBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?category=${category}`)
            dispatch(postActions.setPostsCat(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearLoading());
    }
  };
}

// Fetch Single Post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
      try {
          const { data } = await request.get(`/api/posts/${postId}`)
          dispatch(postActions.setPost(data))
      } catch (error) {
          toast.error(error.response.data.message)
      }
  }
}