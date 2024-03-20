import { useState, useEffect, useContext} from "react"
import "./signUpBox2.css"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword  } from "firebase/auth"
import { auth } from "../../fireBase-config"
import { LoginContext } from "../App"
import { useNavigate } from "react-router-dom"



export default function SignUpBox2() {

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const[loggedIn, setLoggedIn] = useContext(LoginContext);
  const [error, setError] = useState(null); // State variable for error message

  const [user, setUser] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const isLoggedIn = !!currentUser;
      setLoggedIn(isLoggedIn);
      localStorage.setItem("loggedIn", loggedIn); //saving logged In state to local storage to persist through refreshes and navigation
      console.log("signup page setting loggedIn to " + isLoggedIn);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [setLoggedIn, loggedIn]); // Empty dependency array means this effect runs only once on mount


const signUp = async () => {
    try {
      //creates new user
      const newUser = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
      
      // Automatically sign in the user after successful sign-up
      await signInWithEmailAndPassword(auth, signUpEmail, signUpPassword);

      setUser(newUser); // Update user state with the new user
      console.log(user);
      navigate("/");

    } catch (error) {
        console.log(error.message);
        setError(error.message);
    }
}


  return (
    <div className="form">
        <h1 className="header">SignUp</h1>
        <div className="inputs">
          <input className="input" type="text" placeholder="email"
            onChange={(event) => {
                setSignUpEmail(event.target.value);
            }}></input> 
          <input className="input" type="text" placeholder="password"
          onChange={(event) => {
            setSignUpPassword(event.target.value);
          }}></input> 
        </div>
        <button className="signUpButton" onClick={signUp}>Submit</button>
        {error && <p className="error-message">{error}</p>}
    </div>
  )
}