import React from "react";
import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";

function CommentsTable() {
  // Delete Comments Handler
  const deleteCommntsHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("category has been deleted", {
          icon: "success",
        });
      } else {
        swal("something went wrong");
      }
    });
  };
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <tr key={item}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={"/images/user-avatar.png"}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">username {item}</span>
                  </div>
                </td>
                <td>comment {item}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommntsHandler()}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CommentsTable;
