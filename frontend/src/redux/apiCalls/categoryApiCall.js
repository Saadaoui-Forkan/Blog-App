import { toast } from "react-toastify";
import request from "../../utils/request";
import { categoryActions } from "../slices/categorySlice";

// Fetch All Categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
}