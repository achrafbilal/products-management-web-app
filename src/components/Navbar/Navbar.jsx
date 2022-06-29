import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Navbar = ({ auth }) => {
  const dispatch = useDispatch();
  const linksUnauth = [
    {
      id: 1,
      text: "Login",
      url: "/login",
    },
    {
      id: 2,
      text: "Register",
      url: "/register",
    },
  ];
  const linksAdmin = [
    {
      id: 1,
      text: "Products",
      url: "/",
    },
    {
      id: 2,
      text: "Add Product",
      url: "/product/add",
    },
  ];
  const linksClient = [
    {
      id: 1,
      text: "Shop",
      url: "/",
    },
    {
      id: 2,
      text: "Cart",
      url: "/cart",
    },
  ];
  const getLinks = (roleId) => {
    switch (roleId) {
      case 1:
        return linksAdmin;
      case 2:
        return linksClient;
      default:
        return linksUnauth;
    }
  };
  const logoutClickHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <nav
      className="navbar navbar-expand-lg custom_navbar_nav border"
      style={{ height: "60px" }}
    >
      <div className="container  ">
        <a className="navbar-brand" href="/">
          Products Managment
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Open Menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse custom_navbar_collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav d-flex container">
            {getLinks(auth.isLoggedIn === true ? auth.user.roleId : 0).map(
              (link) => (
                <li className="nav-item" key={link.id}>
                  <Link className="nav-link" to={link.url}>
                    {link.text}
                  </Link>
                </li>
              )
            )}
          </ul>
          {auth.isLoggedIn && (
            <div className="nav-item d-flex">
              <button className="btn btn-dark" onClick={logoutClickHandler}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
