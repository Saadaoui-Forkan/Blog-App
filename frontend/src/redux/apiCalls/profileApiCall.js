import request from '../../utils/request'
import { toast } from 'react-toastify'
import { profileActions } from '../slices/profileSlice'

// Get User Profile
export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/profile/${userId}`)
            dispatch(profileActions.setProfile(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}