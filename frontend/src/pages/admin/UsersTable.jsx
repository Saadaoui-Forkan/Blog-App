import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./admin-table.css";

function UsersTable() {
  // Delete User Handler
  const deleteUserHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("user has been deleted", {
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
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={"/images/user-avatar.png"}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">Mahmoud</span>
                  </div>
                </td>
                <td>mhd@me.com</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/1`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler()}>
                      Delete User
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

export default UsersTable;
