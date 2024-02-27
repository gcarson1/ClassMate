//import React from 'react'
import "./navBar.css";
import { NavLink, Outlet } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
      <header className="navBar-container">
        <div className="navBar-logo">
          <NavLink to="/">
            <img src="../public/images/favicon.ico" alt="ClassMateLogo" />
          </NavLink>
        </div>
        <div className="navBar-header">
          <h1 className="navBar-header-text">ClassMate</h1>
        </div>
        <div className="navBar-login">
          <NavLink to="/Login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <h4 className="navBar-login-text">Login</h4>
          </NavLink>
          <NavLink to="/SignUp" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <h4 className="navBar-signUp-text">SignUp</h4>
          </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
