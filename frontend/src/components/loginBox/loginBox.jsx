/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react"
import "./loginBox.css"
import { auth } from "../../../fireBase-config"
import { 
    signInWithEmailAndPassword,
    onAuthStateChanged 
      } from "firebase/auth";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom"



export default function LoginBox() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const[loggedIn, setLoggedIn] = useContext(LoginContext);
  const [error, setError] = useState(null); // State variable for error message
  const navigate = useNavigate();

  const [user, setUser] = useState({});


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const isLoggedIn = !!currentUser;
      setLoggedIn(isLoggedIn);
      localStorage.setItem("loggedIn", isLoggedIn); //saving logged In state to local storage to persist through refreshes and navigation
      console.log("login page setting logged in to " + loggedIn);
      console.log("saving " + localStorage.getItem('loggedIn') + " into local storage");
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [loggedIn, setLoggedIn]); // Empty dependency array means this effect runs only once on mount


const Login = async () => {
  try {
    const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
    );
    console.log(user);
    
    navigate("/");

} catch (error) {
    console.log(error.message);
    setError(error.message);
}
    }


  return (
    <div className="form">
        <h1 className="header">Login</h1>
        <div className="inputs">
          <input className="input" type="text" placeholder="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}></input> 
          <input className="input" type="text" placeholder="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}></input> 
        </div>
        <button className="loginButton" onClick={Login}>Submit</button>
        {error && <p className="error-message">{error}</p>}
      
    </div>
  )
}
