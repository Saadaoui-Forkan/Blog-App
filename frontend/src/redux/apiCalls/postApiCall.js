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