import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCat: [],
    loading: false,
    isPostcreated: false,
    post: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCat(state, action) {
      state.postsCat = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isPostcreated = true;
      state.loading = false;
    },
    clearIsPostCreated(state) {
      state.isPostcreated = false;
    },
    setPost(state, action) {
      state.post = action.payload
    },
    setLike(state, action) {
      state.post.likes = action.payload.likes
    }
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export {postActions, postReducer}