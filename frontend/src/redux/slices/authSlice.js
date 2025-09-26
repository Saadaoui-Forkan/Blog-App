import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
    user: localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null,
    registerMessage: null,
    isEmailVerified: false,
    loading: false,
   },
   reducers: {
      login(state,action) {
        state.user = action.payload;
        state.registerMessage = null;
        state.loading = false;
      },
      logout(state) {
         state.user = null;
      },
      register(state,action) {
         state.registerMessage = action.payload;
         state.loading = false;
      },
      setUserPhoto(state,action) {
         state.user.profilePhoto = action.payload;
         state.loading = false;
      },
      setUsername(state,action) {
         state.user.username = action.payload;
         state.loading = false;
      },
      setIsEmailVerified(state) {
         state.isEmailVerified = true;
         state.registerMessage = null;
      },
      setLoading(state, action) {
         state.loading = action.payload; 
      }
   }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer }