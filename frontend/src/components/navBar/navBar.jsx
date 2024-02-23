//import React from 'react'
import "./navBar.css"

const NavBar = () => {
    return (
        <div className="navBar-container">
            <div className="navBar-logo">
             <img src="../public/images/favicon.ico" alt="ClassMateLogo"/>   
            </div>
            <div className="navBar-header">
               <h1 className="navBar-header-text" >ClassMate</h1> 
            </div>
            <div className="navBar-login">
               <h4 className="navBar-login-text">Login</h4> 
               <h4 className="navBar-signUp-text">SignUp</h4>
            </div>
        </div>
    )
}

export default NavBar;