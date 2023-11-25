import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCat: []
  },
  reducers: {
    setPosts(state, action) {
        state.posts = action.payload
    },
    setPostsCount(state, action) {
        state.postsCount = action.payload
    },
    setPostsCat(state, action) {
        state.postsCat = action.payload
    }
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export {postActions, postReducer}