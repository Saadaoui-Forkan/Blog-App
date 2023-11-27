import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./post-details.css";
import { toast } from 'react-toastify'
import AddComment from "../../components/comments/AddComment";
import swal from "sweetalert";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";

function PostDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  //   console.log(post)
  useEffect(() => {
    dispatch(fetchSinglePost(id))
    window.scrollTo(0, 0);
  }, []);

  //   Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id))
    
  };

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id))
        navigate(`/profile/${user?._id}`)
      }else {
        swal("something went wrong")
      }
    });
  };


  return (
    <section className="post-details">
      <div
        className="post-details-image-wrapper"
        onSubmit={updateImageSubmitHandler}
      >
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.user?._id && (
          <form className="update-post-image-form">
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
        reprehenderit, molestiae officia non corrupti iusto, molestias quod
        repellat, distinctio temporibus explicabo? Placeat, dolorum atque fugiat
        vitae suscipit ratione quo? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vero est reprehenderit, molestiae officia non corrupti
        iusto, molestias quod repellat, distinctio temporibus explicabo?
        Placeat, dolorum atque fugiat vitae suscipit ratione quo?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              className="bi bi-pencil-square"
              onClick={() => setUpdatePost(true)}
            ></i>
            <i className="bi bi-trash-fill" onClick={deletePostHandler}></i>
          </div>
        )}
      </div>
      <AddComment postId={post?._id}/>
      {/* {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          to write a comment you should login first
        </p>
      )} */}

      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
}

export default PostDetails