import request from '../../utils/request'
import { toast } from 'react-toastify'
import { profileActions } from '../slices/profileSlice'
import { authActions } from '../slices/authSlice'

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

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post(
              `/api/users/profile/profile-photo-upload`,
              newPhoto,
              {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + getState().auth.user.token
                },
              }
            );
            dispatch(profileActions.setProfilePhoto(data.profilePhoto))
            dispatch(authActions.setUserPhoto(data.profilePhoto))
            toast.success(data.message)

            // Modify The User In LocalStorage With New Photo
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.profilePhoto = data?.profilePhoto
            localStorage.setItem("userInfo", JSON.stringify(user))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Update Profile
export function updateProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(
              `/api/users/profile/${userId}`,
              profile,
              {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                },
              }
            );
            dispatch(profileActions.updateProfile(data))
            dispatch(authActions.setUsername(data.username))

            // Modify The User In LocalStorage With New Photo
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.username = data?.username
            localStorage.setItem("userInfo", JSON.stringify(user))

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}