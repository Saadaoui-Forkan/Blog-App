import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "auth",
  initialState: {
    profile: null,
  },
  reducers: {
    setProfile(state, action) {
        state.profile = action.payload
    }
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileActions, profileReducer}