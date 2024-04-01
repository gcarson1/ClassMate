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
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn !== null) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, [setLoggedIn]);

  const logout = async () => {
    await signOut(auth);
    const isLoggedIn = false;
      setLoggedIn(isLoggedIn);
      localStorage.setItem("loggedIn", isLoggedIn);
    console.log("navBar setting logged in to " + loggedIn);
    console.log("saved " + localStorage.getItem('loggedIn') + " into local storage")
  }

  return (
    <div>
      <header className="navBar-container">
        <div className="navBar-logo">
          <NavLink to="/">
            <img className="logo" src="/public/images/favicon.ico" alt="ClassMateLogo" />
          </NavLink>
        </div>
          {loggedIn ? (
            <h1 className="navBar-header-text">Hello User!</h1>
          ) : (
            <h1 className="navBar-header-text">ClassMate</h1>
          )}
          
        <div className="navBar-buttons">
          {loggedIn ? (
            <button className="navBar-logout-text" onClick={logout}>Log Out</button>
          ) : (
            <>
            <NavLink to="/Login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <p className="navBar-login-button">Login</p>
          </NavLink>
          <NavLink to="/SignUp" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <p className="navBar-signUp-button">SignUp</p>
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
