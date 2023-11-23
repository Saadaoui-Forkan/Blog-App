import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "auth",
  initialState: {
    profile: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload
    },
    updateProfile(state, action) {
      state.profile = action.payload
    }
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export {profileActions, profileReducer}