//import React from 'react'
import "./navBar.css";
import { NavLink, Outlet } from "react-router-dom"
import { useContext, useEffect } from "react";
import  { LoginContext } from "../App"
import { signOut } from "firebase/auth";
import { auth } from '../../fireBase-config'

const NavBar = () => {

  //const loggedIn = useContext(LoginContext);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  useEffect(() => {
    console.log(loggedIn);
  })

  const logout = async () => {
    await signOut(auth);
    setLoggedIn(false);
  }

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
        <div className="navBar-buttons">
          {loggedIn ? (
            <button className="navBar-logout-text" onClick={logout}>Log Out</button>
          ) : (
            <>
            <NavLink to="/Login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <button className="navBar-login-text">Login</button>
          </NavLink>
          <NavLink to="/SignUp" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <button className="navBar-signUp-text">SignUp</button>
          </NavLink>
          </>
          )}
          
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
