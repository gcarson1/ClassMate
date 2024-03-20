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
  const navigate = useNavigate();

  const [user, setUser] = useState({});


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoggedIn(!!currentUser);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [setLoggedIn]); // Empty dependency array means this effect runs only once on mount


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
        {/* Display user email if user is logged in */}
      <p>User Logged in: {loggedIn ? user.email : "Not logged in"}</p>
    </div>
  )
}
