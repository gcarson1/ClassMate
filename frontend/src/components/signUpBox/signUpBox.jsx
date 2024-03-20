import './signUpBox.css'
import { NavLink } from "react-router-dom"


//ended up not using this one because it had more fields than we needed
const SignUpBox = () => {
    return (
        <div className="signUpBox-container">
            <div className='signUpBox-header-text'>
                <h1>Sign Up</h1>
            </div>
            <div className="entryarea-container">
                <div className="username-entryarea">
                    <input className='input' type="text" placeholder="Username" required/>
                </div>
                <div className="email-entryarea">
                    <input className='input' type="text" placeholder='Email | @vols.utk.edu'/>
                </div>
                <div className="password-entryarea">
                    <input className='input' type="text" placeholder="Password"/>
                </div>
                <div className="confirmPassword-entryarea">
                    <input className='input' type="text" placeholder='Confirm Password'/>
                </div>
                <div className="signUpBox-signup">
                <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <h4 className="signUpBox-signup-text">Sign Up</h4>
                </NavLink>
                </div>
            </div>
            <div className="signUpBox-barrier-text">
                <h1>─────OR─────</h1>
            </div>
            <div className="signUpBox-pre-existing-text">
                <h4>Already have an account?</h4>
            </div>
            <div className="signUpBox-login-text">
            <NavLink to="/Login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <h2>Login</h2>
            </NavLink>
            </div>
        </div>
    )
}

export default SignUpBox;