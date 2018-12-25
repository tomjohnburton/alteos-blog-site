import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import api from "../../api/auth";

function NavBar(props) {
  return (
    <div className="nav-bar">
      <div className="ui pointing responsive menu">
        <NavLink to="#" className="item logo">
          <img src="/Alteos.png" alt="icon" />
        </NavLink>
        <NavLink exact to="/" className="item">
          Home
        </NavLink>
        {!api.isLoggedIn() && (
          <Fragment>
            <NavLink to="/login" className="item">
              Log In
            </NavLink>
            <NavLink to="/signup" className="item">
              Sign Up
            </NavLink>
          </Fragment>
        )}
        {api.isLoggedIn() && (
          <Fragment>
            <NavLink to="/blog" className="item">
              Bloglist
            </NavLink>
            <NavLink to="/blog/post" className="item">
              Post
            </NavLink>
            <NavLink
              to="#"
              onClick={() => handleLogOutClick(props)}
              className="item"
            >
              Logout
            </NavLink>
          </Fragment>
        )}
        {api.isLoggedIn() && (
          <div className=" menu">
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search..." />
                <i className="search link icon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const handleLogOutClick = props => {
  api.logout().then(() => {
    props.history.push("/login");
  });
};

export default withRouter(NavBar);
