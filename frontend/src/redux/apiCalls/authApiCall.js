import { toast } from "react-toastify";
import request from "../../utils/request";
import { authActions } from "../slices/authSlice";
import axios from 'axios'

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        "/api/auth/login",
        user
      );
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  };
}

// Logout User
export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
    
};