import './signUpBox.css'
import { NavLink } from "react-router-dom"

const SignUpBox = () => {
    return (
        <div className="signUpBox-container">
            <div className='signUpBox-header-text'>
                <h1>Sign Up</h1>
            </div>
            <div className="inputs-container">
                <div className="username-container">
                    <div className="username-entryarea">
                        <input className='input' type="text" placeholder="Username" required/>
                    </div>
                </div>
                <div className="email-container">
                    <div className="email-entryarea">
                        <input className='input' type="text" placeholder='Email | @vols.utk.edu'/>
                    </div>
                </div>
                <div className="password-container">
                    <div className="password-entryarea">
                        <input className='input' type="text" placeholder="Password"/>
                    </div>
                </div>
                <div className="confirmPassword-container">
                    <div className="confirmPassword-entryarea">
                        <input className='input' type="text" placeholder='Confirm Password'/>
                    </div>
                </div>
                <div className="signUpBox-signup">
                    <h4 className="signUpBox-signup-text">Sign Up</h4>
                </div>
            </div>
            <div className="signUpBox-barrier">
                <div className="signUpBox-barrier-text">
                    <h1>─────OR─────</h1>
                </div>
            </div>
            <div className="signUpBox-pre-existing">
                <div className="signUpBox-pre-existing-text">
                    <h4>Already have an account?</h4>
                </div>
            </div>
            <div className="signUpBox-login">
                <div className="signUpBox-login-text">
                <NavLink to="/Login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <h2>Login</h2>
                </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SignUpBox;