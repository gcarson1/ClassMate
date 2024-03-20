import "./Login.css"
import LoginBox from "../components/loginBox/loginBox"
import { NavLink } from "react-router-dom"

export default function Login() {

  return (
    <div className="container">
        <LoginBox />
        <p>or SignUp <NavLink to="/SignUp">Here</NavLink></p>
    </div>
  )
}
