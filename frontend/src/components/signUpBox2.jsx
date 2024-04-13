import { useState, useEffect, useContext} from "react"
import "./signUpBox2.css"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword  } from "firebase/auth"
import { auth } from "../../fireBase-config"
import { LoginContext } from "../App"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

 // eslint-disable-next-line no-unused-vars

export default function SignUpBox2() {

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const[loggedIn, setLoggedIn] = useContext(LoginContext);
  const [error, setError] = useState(null); // State variable for error message
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // const [userID, setUserID] = useState("");

  const addUser = async (email, uniID) => {
    try {
      const response = await axios.post('http://localhost:7071/adduser', { email, uniID });
      console.log("added user to the database");
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error adding user:', error);
      throw error; // Rethrow the error to be handled by the caller if needed
    }
  };

  const fetchUserID = async (email) => {
    try {
      const response = await axios.get(`http://localhost:7071/email/${email}/userID`);
      console.log(response.data[0].UserID);
      localStorage.setItem("userID", response.data[0].UserID);
      console.log("saved " + localStorage.get("userID") + "into local storage");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const isLoggedIn = !!currentUser;
      console.log("isLoggedIn:", isLoggedIn); // Debug log to check isLoggedIn value
      

        // Save email to local storage if user is logged in
    if (isLoggedIn) {
      try{
        localStorage.setItem("loggedIn", true);
      const userEmail = currentUser.email;
      console.log("User's email:", userEmail);

      //adds user to database and saves their new ID to local storage
      await addUser(currentUser.email, 1);
      await fetchUserID(currentUser.email);
      console.log("saved " + localStorage.getItem("userID") + " to local storage");
      setLoggedIn(isLoggedIn);
      console.log("signup page setting loggedIn to " + isLoggedIn);
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userEmail"); // Remove user's email if not logged in
    }
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
          <input className="input" type="password" placeholder="password"
          onChange={(event) => {
            setSignUpPassword(event.target.value);
          }}></input> 
        </div>
        <button className="signUpButton" onClick={signUp}>Submit</button>
        {error && <p className="error-message">{error}</p>}
    </div>
  )
}