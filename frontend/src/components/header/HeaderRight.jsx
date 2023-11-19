import { span } from "react-router-dom";
import { useState } from "react";
import img from '../../images/home-bg.jpg'

const HeaderRight = () => {

  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="header-right">
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
            >
            username
            </span>
            <img
              src={img}
              alt={img}
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <span
                //   to='/profile'
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </span>
                <div className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
        <>
            <span 
                // to="/login" 
                className="header-right-span"
            >
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </span>
            <span 
                // to="/register" 
                className="header-right-span"
            >
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </span>
        </>
    </div>
  );
};

export default HeaderRight;