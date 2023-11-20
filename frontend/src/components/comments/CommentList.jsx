import "./comment-list.css";
import { useState } from "react";
import swal from "sweetalert";

function CommentList() {
  // Delete Comment Handler
  const deleteCommentHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('comment has been deleted', {
          icon: "success"
        })
      }else {
        swal("something went wrong")
      }
    });
  };
  return (
    <div className="comment-list">
      <h4 className="comment-list-count">2 Comments</h4>
      {[1, 2].map((comment) => (
        <div key={comment} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">Mahmoud</div>
            <div className="comment-item-time">
              2 min ago
            </div>
          </div>
          <p className="comment-item-text">amazing post</p>
            <div className="comment-item-icon-wrapper">
              <i
                // onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler()}
                className="bi bi-trash-fill"
              ></i>
            </div>
        </div>
      ))}
      {/* {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )} */}
    </div>
  )
}

export default CommentList