import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import "./post-details.css";
import { posts } from "../../dummyData";

function PostDetails() {
  const { id } = useParams();
  const post = posts.find((p) => p._id === +id);
  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img src={post?.image} alt="" className="post-details-image" />
        <form
          className="update-post-image-form"
        >
          <label htmlFor="file" className="update-post-label">
            <i className="bi bi-image-fill"></i>
            Select new image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
          />
          <button type="submit">upload</button>
        </form>
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user.image}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/1`}>{post?.user.username}</Link>
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
          <i className="bi bi-hand-thumbs-up"></i>

          <small>{post?.likes.length} likes</small>
        </div>

        <div>
          <i className="bi bi-pencil-square"></i>
          <i className="bi bi-trash-fill"></i>
        </div>
      </div>
      {/* {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          to write a comment you should login first
        </p>
      )}

      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )} */}
    </section>
  );
}

export default PostDetails