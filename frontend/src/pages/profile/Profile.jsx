import React, { useState, useEffect } from 'react'
import './profile.css'
import { posts } from '../../dummyData'
import PostItem from '../../components/posts/PostItem'
import { toast } from 'react-toastify'
import swal from "sweetalert";
import UpdateProfileModal from './UpdateProfileModal'

function Profile() {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("ther is no file!");

    const formData = new FormData();
    formData.append("image", file);
    console.log("img uploaded");
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
          swal('Account has been deleted', {
            icon: "success"
          })
        }else {
          swal("something went wrong")
        }
    });
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : "/images/user-avatar.png"}
            alt="user-avatar"
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="upload-profile-photo-btn" type="submit">
              upload
            </button>
          </form>
        </div>
        <h1 className="profile-username">{"username"}</h1>
        <p className="profile-bio">{"bio"}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          {/* <span>{new Date(profile?.createdAt).toDateString()}</span> */}
          <span>{new Date(Date.now()).toDateString()}</span>
        </div>

        <button
          onClick={() => setUpdateProfile(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{"username"} Posts</h2>
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
      <button className="delete-account-btn" onClick={deleteAccountHandler}>
        Delete Your Account
      </button>
      {updateProfile && (
        <UpdateProfileModal
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
}

export default Profile